import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2, ChevronRight, ChevronLeft } from 'lucide-react';
import Button from '../../../ui/Button';
import { supabase } from '../../../../lib/supabase';
import { ProductCategory, PRODUCT_CATEGORIES } from '../../../../types/product-categories';
import {
  findCategory,
  getCategoryPath,
  getCategoryBreadcrumb,
  getAvailableSizes,
  formatSize,
  getSizeMeasurements
} from '../../../../utils/product-categories';

interface ProductFormData {
  title: string;
  category: string;
  description: string;
  size: string[];
  images: string[];
  price: number;
  currency: string;
  metadata: Record<string, string>;
  tags: string[];
  stock: number;
  gender?: 'male' | 'female' | 'unisex';
}

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  onClose: () => void;
  isLoading?: boolean;
}

const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY'];
const QUICK_PRICES = [19.99, 29.99, 39.99, 49.99, 59.99, 79.99, 99.99];
const QUICK_STOCKS = [5, 10, 20, 50, 100];

const isFormValid = (data: ProductFormData): boolean => {
  return Boolean(
    data.title && // Title is required
    data.category && // Category is required
    data.gender && // Gender is required
    data.size.length > 0 && // At least one size must be selected
    data.price > 0 && // Price must be positive
    data.stock >= 0 && // Stock must be non-negative
    data.images.length > 0 // At least one image is required
  );
};

const generateSuggestedTags = (title: string, description: string, category: string): string[] => {
  const tags = new Set<string>();
  
  // Add category-based tags (only once)
  const categoryPath = category.split('-');
  // Only add the last part of the category path
  if (categoryPath.length > 0) {
    tags.add(categoryPath[categoryPath.length - 1].toLowerCase());
  }

  // Extract words from title and description
  const text = `${title} ${description}`.toLowerCase();
  
  // Common descriptive words to look for
  const descriptors = {
    materials: ['cotton', 'leather', 'denim', 'silk', 'wool', 'polyester', 'linen'],
    styles: ['casual', 'formal', 'sport', 'classic', 'modern', 'vintage', 'elegant', 'basic'],
    patterns: ['striped', 'plain', 'floral', 'checked', 'solid', 'printed'],
    seasons: ['summer', 'winter', 'spring', 'fall', 'autumn'],
    occasions: ['party', 'work', 'business', 'beach', 'gym', 'outdoor', 'office'],
    colors: ['black', 'white', 'red', 'blue', 'green', 'yellow', 'pink', 'purple', 'brown', 'grey', 'navy']
  };

  // Check for each type of descriptor
  Object.values(descriptors).flat().forEach(word => {
    if (text.includes(word)) {
      tags.add(word);
    }
  });

  // Add category-specific tags
  if (category.includes('shoes')) {
    const shoeTypes = ['sneakers', 'boots', 'sandals', 'running', 'walking', 'athletic'];
    shoeTypes.forEach(type => {
      if (text.includes(type)) tags.add(type);
    });
  }

  if (category.includes('t-shirts') || category.includes('shirts')) {
    const shirtTypes = ['short-sleeve', 'long-sleeve', 'polo', 'v-neck', 'crew-neck'];
    shirtTypes.forEach(type => {
      if (text.includes(type.replace('-', ' '))) tags.add(type);
    });
  }

  return Array.from(tags);
};

export default function ProductForm({ initialData, onSubmit, onClose, isLoading = false }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    title: initialData?.title || '',
    category: initialData?.category || '',
    description: initialData?.description || '',
    size: Array.isArray(initialData?.size) ? initialData.size : initialData?.size ? [initialData.size] : [],
    images: initialData?.images || [],
    price: initialData?.price || 0,
    currency: initialData?.currency || 'USD',
    metadata: initialData?.metadata || {},
    tags: initialData?.tags || [],
    stock: initialData?.stock || 0,
    gender: initialData?.gender
  });

  const [newTag, setNewTag] = useState('');
  const [newMetadataKey, setNewMetadataKey] = useState('');
  const [newMetadataValue, setNewMetadataValue] = useState('');
  const [categoryPath, setCategoryPath] = useState<ProductCategory[]>([]);
  const [currentCategories, setCurrentCategories] = useState<ProductCategory[]>(PRODUCT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(() => {
    if (initialData?.category) {
      const category = findCategory(initialData.category);
      return category || null;
    }
    return null;
  });

  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  useEffect(() => {
    if (formData.title || formData.description || formData.category) {
      const newSuggestions = generateSuggestedTags(
        formData.title,
        formData.description,
        formData.category
      );
      setSuggestedTags(newSuggestions);
    }
  }, [formData.title, formData.description, formData.category]);

  useEffect(() => {
    if (initialData?.category) {
      const path = getCategoryPath(initialData.category);
      setCategoryPath(path);
      setCurrentCategories(
        path.length > 0 
          ? path[path.length - 1].subcategories || []
          : PRODUCT_CATEGORIES
      );
      const category = findCategory(initialData.category);
      if (category) {
        setSelectedCategory(category);
      }
    }
  }, [initialData?.category]);

  const handleCategorySelect = (category: ProductCategory) => {
    if (category.subcategories) {
      // If category has subcategories, navigate into it
      setCategoryPath([...categoryPath, category]);
      setCurrentCategories(category.subcategories);
    } else {
      // Set selected category
      setSelectedCategory(category);
      setFormData(prev => ({
        ...prev,
        category: category.id,
        size: [] // Reset size when category changes
      }));
    }
  };

  const handleGenderSelect = (gender: 'male' | 'female' | 'unisex') => {
    setFormData(prev => ({
      ...prev,
      gender: gender
    }));
  };

  const handleCategoryBack = () => {
    if (categoryPath.length > 0) {
      const newPath = categoryPath.slice(0, -1);
      setCategoryPath(newPath);
      setCurrentCategories(
        newPath.length > 0 
          ? newPath[newPath.length - 1].subcategories || []
          : PRODUCT_CATEGORIES
      );
    }
  };

  const renderGenderSelection = () => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Gender *</label>
      <div className="grid grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => handleGenderSelect('male')}
          className={`text-left p-4 rounded-lg transition-colors ${
            formData.gender === 'male'
              ? 'bg-neon-yellow/10 border-2 border-neon-yellow'
              : 'bg-black/20 hover:bg-black/30'
          }`}
        >
          <h4 className="font-medium">Male</h4>
        </button>
        <button
          type="button"
          onClick={() => handleGenderSelect('female')}
          className={`text-left p-4 rounded-lg transition-colors ${
            formData.gender === 'female'
              ? 'bg-neon-yellow/10 border-2 border-neon-yellow'
              : 'bg-black/20 hover:bg-black/30'
          }`}
        >
          <h4 className="font-medium">Female</h4>
        </button>
        <button
          type="button"
          onClick={() => handleGenderSelect('unisex')}
          className={`text-left p-4 rounded-lg transition-colors ${
            formData.gender === 'unisex'
              ? 'bg-neon-yellow/10 border-2 border-neon-yellow'
              : 'bg-black/20 hover:bg-black/30'
          }`}
        >
          <h4 className="font-medium">Unisex</h4>
        </button>
      </div>
    </div>
  );

  const renderMeasurements = (measurements: Record<string, string | Record<string, string>>) => {
    return Object.entries(measurements).map(([key, value]) => (
      <li key={key} className="flex justify-between">
        <span className="capitalize">{key}</span>
        <span>{typeof value === 'object' ? JSON.stringify(value) : value}</span>
      </li>
    ));
  };

  const renderPriceAndStock = () => (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Price *</label>
        <div className="space-y-2">
          <input
            type="number"
            value={formData.price}
            onChange={handlePriceChange}
            className="w-full bg-black/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-yellow"
            min="0"
            step="0.01"
            required
          />
          <div className="flex flex-wrap gap-2">
            {QUICK_PRICES.map(price => (
              <button
                key={price}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, price }))}
                className="px-2 py-1 text-sm bg-black/20 rounded hover:bg-black/30 transition-colors"
              >
                {formData.currency} {price}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Currency</label>
        <select
          value={formData.currency}
          onChange={e => setFormData(prev => ({ ...prev, currency: e.target.value }))}
          className="w-full bg-black/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-yellow"
        >
          {CURRENCIES.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Stock</label>
        <div className="space-y-2">
          <input
            type="number"
            value={formData.stock}
            onChange={handleStockChange}
            className="w-full bg-black/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-yellow"
            min="0"
            required
          />
          <div className="flex flex-wrap gap-2">
            {QUICK_STOCKS.map(stock => (
              <button
                key={stock}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, stock }))}
                className="px-2 py-1 text-sm bg-black/20 rounded hover:bg-black/30 transition-colors"
              >
                {stock}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCategorySelection = () => {
    if (!formData.gender) {
      return (
        <div className="text-center p-4 bg-black/20 rounded-lg">
          Please select a gender first
        </div>
      );
    }

    // Treat unisex as male for sizes
    const genderForSizes = formData.gender === 'unisex' ? 'male' : formData.gender;

    const availableSizes = selectedCategory 
      ? getAvailableSizes(selectedCategory.id, genderForSizes).filter(size => 
          size.gender === genderForSizes || size.gender === 'unisex'
        )
      : [];

    if (selectedCategory) {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory(null);
                setFormData(prev => ({ ...prev, category: '', size: [] }));
              }}
              className="p-2 hover:bg-black/20 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-text-grey">
              {getCategoryBreadcrumb(selectedCategory.id)}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sizes *</label>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map(size => (
                <label key={size.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.size.includes(size.value)}
                    onChange={e => {
                      setFormData(prev => ({
                        ...prev,
                        size: e.target.checked
                          ? [...prev.size, size.value]
                          : prev.size.filter(s => s !== size.value)
                      }));
                    }}
                    className="hidden"
                  />
                  <span className={`px-3 py-1 rounded-lg border-2 transition-colors ${
                    formData.size.includes(size.value)
                      ? 'border-neon-yellow bg-neon-yellow/10 text-neon-yellow'
                      : 'border-dark-grey text-text-grey'
                  }`}>
                    {size.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {categoryPath.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCategoryBack}
              className="p-2 hover:bg-black/20 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-text-grey">
              {categoryPath.map(cat => cat.name).join(' > ')}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentCategories.map(category => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategorySelect(category)}
              className="text-left p-4 rounded-lg bg-black/20 hover:bg-black/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{category.name}</h4>
                {category.subcategories && <ChevronRight className="w-4 h-4 text-text-grey" />}
              </div>
              {category.subcategories && (
                <p className="text-sm text-text-grey mt-1">
                  {category.subcategories.length} subcategories
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const compressImage = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }

          // Calculate new dimensions while maintaining aspect ratio
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 2048; // Increased from 1200 to 2048 for higher resolution

          if (width > height && width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }

          // Set canvas dimensions
          canvas.width = width;
          canvas.height = height;

          // Draw image with smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to blob with optimal quality
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to compress image'));
              }
            },
            'image/jpeg', // Changed from WebP to JPEG for better quality
            0.95 // Increased from 0.85 to 0.95 for higher quality
          );
        };
        img.onerror = () => reject(new Error('Failed to load image'));
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    if (formData.images.length + files.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Compress image before upload
        const compressedBlob = await compressImage(file);
        const compressedFile = new File([compressedBlob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
          type: 'image/jpeg'
        });

        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.jpg`;

        const { error: uploadError, data } = await supabase.storage
          .from('product_images')
          .upload(fileName, compressedFile, {
            cacheControl: '3600',
            contentType: 'image/jpeg',
            upsert: true
          });

        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          throw uploadError;
        }

        if (!data?.path) {
          throw new Error('No path returned from upload');
        }

        const { data: { publicUrl } } = supabase.storage
          .from('product_images')
          .getPublicUrl(data.path);

        return publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    }
  };

  const handleImageDelete = async (imageUrl: string, index: number) => {
    try {
      // Extract the file name from the URL
      const fileName = imageUrl.split('/').pop();
      if (!fileName) return;

      // Delete from storage if it's a Supabase URL
      if (imageUrl.includes('supabase')) {
        const { error: deleteError } = await supabase.storage
          .from('product_images')
          .remove([fileName]);

        if (deleteError) throw deleteError;
      }

      // Update form state
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    // Ensure we have a valid category
    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }
    
    // Only use the tags that were explicitly added by the user
    onSubmit({
      ...formData,
      tags: formData.tags
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      price: value === '' ? 0 : Math.max(0, parseFloat(value))
    }));
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      stock: value === '' ? 0 : Math.max(0, parseInt(value))
    }));
  };

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag('');
    }
  };

  const addMetadata = () => {
    if (newMetadataKey && newMetadataValue) {
      setFormData(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          [newMetadataKey]: newMetadataValue
        }
      }));
      setNewMetadataKey('');
      setNewMetadataValue('');
    }
  };

  const renderTags = () => (
    <div>
      <label className="block text-sm font-medium mb-2">Tags</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {formData.tags.map(tag => (
          <span
            key={tag}
            className="px-3 py-1 bg-dark-grey rounded-lg text-sm flex items-center gap-2"
          >
            {tag}
            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  tags: prev.tags.filter(t => t !== tag)
                }));
              }}
              className="hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>
      
      {suggestedTags.length > 0 && (
        <div className="mb-2">
          <label className="block text-sm font-medium mb-2">Suggested Tags</label>
          <div className="flex flex-wrap gap-2">
            {suggestedTags
              .filter(tag => !formData.tags.includes(tag))
              .map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      tags: [...prev.tags, tag]
                    }));
                  }}
                  className="px-3 py-1 bg-black/20 rounded-lg text-sm hover:bg-black/30 transition-colors"
                >
                  + {tag}
                </button>
              ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={newTag}
          onChange={e => setNewTag(e.target.value)}
          placeholder="Add a tag"
          className="flex-1 bg-black/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-yellow"
        />
        <Button type="button" onClick={addTag}>Add</Button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-dark-grey/90 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            {initialData ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full bg-black/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-yellow"
                required
              />
            </div>

            {/* Gender Selection - Always visible */}
            {renderGenderSelection()}

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              {renderCategorySelection()}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-black/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-yellow h-24"
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium mb-2">Images (Max 5) *</label>
            <div className="grid grid-cols-5 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageDelete(image, index)}
                    className="absolute top-1 right-1 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {formData.images.length < 5 && (
                <label className="aspect-square border-2 border-dashed border-dark-grey rounded-lg flex items-center justify-center cursor-pointer hover:border-neon-yellow transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    multiple={formData.images.length + 1 < 5}
                  />
                  <Upload className="w-6 h-6 text-text-grey" />
                </label>
              )}
            </div>
          </div>

          {/* Price and Stock */}
          {renderPriceAndStock()}

          {/* Tags */}
          {renderTags()}

          {/* Metadata */}
          <div>
            <label className="block text-sm font-medium mb-2">Metadata</label>
            <div className="space-y-2 mb-2">
              {Object.entries(formData.metadata).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-dark-grey rounded-lg text-sm flex-1">
                    <span className="font-bold">{key}:</span> {value}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => {
                        const newMetadata = { ...prev.metadata };
                        delete newMetadata[key];
                        return { ...prev, metadata: newMetadata };
                      });
                    }}
                    className="p-1 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMetadataKey}
                onChange={e => setNewMetadataKey(e.target.value)}
                placeholder="Key"
                className="flex-1 bg-black/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-yellow"
              />
              <input
                type="text"
                value={newMetadataValue}
                onChange={e => setNewMetadataValue(e.target.value)}
                placeholder="Value"
                className="flex-1 bg-black/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-yellow"
              />
              <Button type="button" onClick={addMetadata}>Add</Button>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !isFormValid(formData)}
              className={!isFormValid(formData) ? 'opacity-50 cursor-not-allowed' : ''}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {initialData ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                initialData ? 'Update Product' : 'Add Product'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}