import { CSVRow } from '../productImportService';
import { NormalizedProduct } from '../productImportService';
import { supabase } from '../../lib/supabase';
import { ProductCategory, PRODUCT_CATEGORIES } from '../../types/product-categories';
import { findCategory } from '../../utils/product-categories';
import { getAvailableSizes, validateSize } from '../../utils/product-categories';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export interface FieldMapping {
  title: string[];
  description: string[];
  price: string[];
  currency: string[];
  stock: string[];
  size: string[];
  tags: string[];
  images: string[];
  category: string[];
  metadata: string[];
}

// Helper function to get first non-empty value from multiple possible fields
function getFirstValue(row: CSVRow, fields: string[]): string {
  for (const field of fields) {
    const value = row[field];
    if (value && value.toString().trim()) {
      return value.toString().trim();
    }
  }
  return '';
}

// Helper function to determine category from product data
async function determineCategory(name: string, description: string, tags: string[]): Promise<string> {
  try {
    const prompt = `Determine the most appropriate category for this product:
Product name: ${name}
Description: ${description}
Tags: ${tags.join(', ')}

Available categories:
${Object.values(PRODUCT_CATEGORIES).map(cat => `- ${cat.label}`).join('\n')}

Return only the category ID from this list: ${Object.values(PRODUCT_CATEGORIES).map(cat => cat.id).join(', ')}`;

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1
      })
    });

    if (!response.ok) {
      throw new Error('Failed to determine category');
    }

    const result = await response.json();
    const categoryId = result.choices[0].message.content.trim();

    // Validate the category exists
    const category = findCategory(categoryId);
    if (category) {
      return categoryId;
    }

    // Fallback to 'accessories' if no valid category found
    return 'accessories';
  } catch (error) {
    console.error('Error determining category:', error);
    return 'accessories';
  }
}

export async function analyzeAndMapFields(data: CSVRow[]): Promise<FieldMapping> {
  let columnHeaders: string[] = [];

  try {
    if (!data || data.length === 0) {
      throw new Error('No data provided for analysis');
    }

    columnHeaders = Object.keys(data[0]);
    const sampleData = data.slice(0, 3); // Use first 3 rows for analysis

    const prompt = `Analyze these CSV headers and sample data to map them to product fields:
Headers: ${JSON.stringify(columnHeaders)}
Sample data: ${JSON.stringify(sampleData)}

Map these to the following product fields:
- title (product name)
- description
- price (numeric)
- currency (ISO code)
- stock (numeric)
- size (array)
- tags (array)
- images (array of image URLs)
- category (product category)
- metadata (any other relevant fields)

Return a JSON object with arrays of field names for each product field. Do not include backticks or json keyword. Example:
{
  "title": ["product_name", "title"],
  "description": ["desc", "details"],
  ...
}`;

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1
      })
    });

    if (!response.ok) {
      console.error('Deepseek API error:', await response.text());
      return getFallbackMapping(columnHeaders);
    }

    const result = await response.json();
    const content = result.choices[0].message.content;
    
    // Clean up the response content by removing any markdown code block syntax
    const cleanedContent = content.replace(/^```json\n|\n```$/g, '').trim();
    
    try {
      const mapping = JSON.parse(cleanedContent);
      return validateMapping(mapping, columnHeaders);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.log('Raw AI response:', content);
      return getFallbackMapping(columnHeaders);
    }
  } catch (error) {
    console.error('Error in field mapping:', error);
    return getFallbackMapping(columnHeaders);
  }
}

function getFallbackMapping(headers: string[]): FieldMapping {
  return {
    title: headers.filter(h => /name|title|product/i.test(h)),
    description: headers.filter(h => /desc|detail|about/i.test(h)),
    price: headers.filter(h => /price|cost|amount/i.test(h)),
    currency: headers.filter(h => /currency|cur|money/i.test(h)),
    stock: headers.filter(h => /stock|quantity|qty|inventory/i.test(h)),
    size: headers.filter(h => /size|dimension|measurement/i.test(h)),
    tags: headers.filter(h => /tag|category|type|label/i.test(h)),
    images: headers.filter(h => /image|picture|photo|url|link/i.test(h)),
    category: headers.filter(h => /category|department|section/i.test(h)),
    metadata: headers.filter(h => 
      !/name|title|product|desc|detail|about|price|cost|amount|currency|cur|money|stock|quantity|qty|inventory|size|dimension|measurement|tag|category|type|label|image|picture|photo|url|link|department|section/i.test(h)
    )
  };
}

function validateMapping(mapping: any, headers: string[]): FieldMapping {
  const validMapping: FieldMapping = {
    title: [],
    description: [],
    price: [],
    currency: [],
    stock: [],
    size: [],
    tags: [],
    images: [],
    category: [],
    metadata: []
  };

  // Ensure all mapped fields exist in headers
  Object.entries(mapping).forEach(([key, value]) => {
    if (key in validMapping) {
      const fields = Array.isArray(value) ? value : [value];
      validMapping[key as keyof FieldMapping] = fields.filter(f => headers.includes(f));
    }
  });

  return validMapping;
}

export async function normalizeProductWithValidation(
  row: CSVRow,
  fieldMapping: FieldMapping,
  partnerId: string
): Promise<NormalizedProduct> {
  const validationErrors: Array<{ field: string; message: string }> = [];
  const normalizedProduct: Partial<NormalizedProduct> = {
    metadata: {}
  };

  // Helper function to add validation error
  const addError = (field: string, message: string) => {
    validationErrors.push({ field, message });
  };

  // Validate and normalize title
  const title = getFirstValue(row, fieldMapping.title);
  if (!title) {
    addError('title', 'Title is required');
  }
  normalizedProduct.title = title;

  // Get category first since we need it for size validation
  const category = getFirstValue(row, fieldMapping.category);
  if (!category) {
    addError('category', 'Category is required');
  }
  normalizedProduct.category = category;

  // Validate and normalize size
  const sizeStr = getFirstValue(row, fieldMapping.size);
  let sizes: string[] = [];
  
  if (category === 'accessories') {
    // For accessories, always use 'os' (one size)
    sizes = ['os'];
  } else if (sizeStr) {
    // Split sizes and validate each one
    const rawSizes = sizeStr.split(/[,|;]/).map(s => s.trim().toLowerCase()).filter(Boolean);
    
    if (category) {
      // Get available sizes for this category
      const availableSizes = getAvailableSizes(category);
      const validSizes = rawSizes.filter(size => {
        // Check if this size value exists in the available sizes
        return availableSizes.some(s => s.value === size);
      });
      
      if (validSizes.length === 0) {
        addError('size', `Invalid sizes. Available sizes for ${category}: ${availableSizes.map(s => s.label).join(', ')}`);
      }
      sizes = validSizes;
    }
  }
  
  if (sizes.length === 0 && category !== 'accessories') {
    addError('size', 'At least one valid size is required');
  }
  normalizedProduct.size = sizes;

  // Validate and normalize price
  const priceStr = getFirstValue(row, fieldMapping.price);
  const price = parseFloat(priceStr);
  if (isNaN(price) || price <= 0) {
    addError('price', 'Price must be a positive number');
  }
  normalizedProduct.price = price;

  // Validate and normalize images
  const imageUrl = getFirstValue(row, fieldMapping.images);
  if (!imageUrl) {
    addError('images', 'At least one image URL is required');
  }
  normalizedProduct.images = imageUrl ? [imageUrl] : [];

  // Optional fields
  normalizedProduct.description = getFirstValue(row, fieldMapping.description);
  normalizedProduct.currency = getFirstValue(row, fieldMapping.currency) || 'USD';
  normalizedProduct.stock = parseInt(getFirstValue(row, fieldMapping.stock)) || 0;
  
  const tagsStr = getFirstValue(row, fieldMapping.tags);
  normalizedProduct.tags = tagsStr ? tagsStr.split(/[,|;]/).map(t => t.trim()).filter(Boolean) : [];

  // Get partner's website URL for product URL generation
  const { data: partner } = await supabase
    .from('partners')
    .select('website_url')
    .eq('id', partnerId)
    .single();

  if (partner?.website_url) {
    // Generate URL-safe title
    const urlSafeTitle = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Store the product URL in metadata
    normalizedProduct.metadata = {
      ...normalizedProduct.metadata,
      product_url: `${partner.website_url.replace(/\/$/, '')}/${urlSafeTitle}`
    };
  }

  // Return the normalized product with any validation errors
  return {
    ...normalizedProduct,
    validationErrors
  } as NormalizedProduct;
} 