import Papa, { ParseResult } from 'papaparse';
import { analyzeAndMapFields, normalizeProductWithValidation } from './ai/deepseekService';
import { supabase } from '../lib/supabase';
import { createProduct } from './productService';
import type { ProductData } from './productService';

export interface NormalizedProduct {
  title: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  size: string[];
  tags: string[];
  images: string[];
  category: string;
  metadata: Record<string, string>;
  validationErrors?: Array<{ field: string; message: string }>;
}

export interface ImportResult {
  products: NormalizedProduct[];
  hasErrors: boolean;
  errorCount: number;
}

export interface CSVRow {
  [key: string]: string;
}

export async function normalizeImportedFile(file: File, partnerId: string): Promise<ImportResult> {
  if (!partnerId) {
    throw new Error('Partner ID is required');
  }

  return new Promise((resolve, reject) => {
    Papa.parse<CSVRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results: ParseResult<CSVRow>) => {
        try {
          // Skip empty rows and rows with all empty values
          const validRows = results.data.filter((row: CSVRow) => 
            Object.values(row).some(value => value && value.toString().trim())
          );

          if (validRows.length === 0) {
            reject(new Error('No valid data found in the CSV file'));
            return;
          }

          // Analyze and map fields
          const fieldMapping = await analyzeAndMapFields(validRows);

          // Normalize each product with validation
          const normalizedProductPromises = validRows.map((row: CSVRow) => 
            normalizeProductWithValidation(row, fieldMapping, partnerId)
          );

          // Wait for all products to be normalized
          const normalizedProducts = await Promise.all(normalizedProductPromises);

          // Count products with validation errors
          const productsWithErrors = normalizedProducts.filter(
            (product: NormalizedProduct) => product.validationErrors && product.validationErrors.length > 0
          );

          resolve({
            products: normalizedProducts,
            hasErrors: productsWithErrors.length > 0,
            errorCount: productsWithErrors.length
          });
        } catch (error: unknown) {
          reject(error instanceof Error ? error : new Error('Unknown error during import'));
        }
      },
      error: (error: Error) => reject(error)
    });
  });
}

export async function saveNormalizedProducts(products: NormalizedProduct[]): Promise<void> {
  // Filter out products with validation errors
  const validProducts = products.filter((product: NormalizedProduct) => {
    return !product.validationErrors || product.validationErrors.length === 0;
  });

  if (validProducts.length === 0) {
    throw new Error('No valid products to save');
  }

  // Save each product using the same service as the main form
  const savePromises = validProducts.map(async (product) => {
    const productData: ProductData = {
      title: product.title,
      category: product.category,
      description: product.description,
      size: product.size,
      price: product.price,
      currency: product.currency,
      metadata: product.metadata,
      tags: product.tags,
      stock: product.stock,
      images: product.images
    };

    return createProduct(productData);
  });

  await Promise.all(savePromises);

  // Trigger a refresh event
  localStorage.setItem('import_complete', Date.now().toString());
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'import_complete',
    newValue: Date.now().toString()
  }));
}

export async function importProducts(file: File, partnerId: string): Promise<ImportResult> {
  if (!partnerId) {
    throw new Error('Partner ID is required');
  }

  const result = await normalizeImportedFile(file, partnerId);
  
  if (!result.hasErrors) {
    await saveNormalizedProducts(result.products);
  }
  
  return result;
} 