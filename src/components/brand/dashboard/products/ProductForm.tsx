import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2, ChevronRight, ChevronLeft, Edit2, Lock } from 'lucide-react';
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
import { useAuthContext } from '../../../../contexts/AuthContext';

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

const SIZE_SYSTEMS = {
  clothing: {
    name: 'Clothing Sizes',
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  shoes: {
    name: 'Shoe Sizes',
    sizes: ['34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49']
  },
  oneSize: {
    name: 'One Size',
    sizes: ['ONE SIZE']
  }
};

const isFormValid = (data: ProductFormData): boolean => {
  return Boolean(
    data.title && // Title is required
    data.category && // Category is required
    data.size.length > 0 && // At least one size must be selected
    data.price > 0 && // Price must be positive
    data.stock >= 0 && // Stock must be non-negative
    data.images.length > 0 // At least one image is required
  );
};

export default function ProductForm({ initialData, onSubmit, onClose, isLoading = false }: ProductFormProps) {
  const { user } = useAuthContext();
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
    stock: initialData?.stock || 0
  });
  const [partnerWebsite, setPartnerWebsite] = useState<string>('');
  const [isUrlEditable, setIsUrlEditable] = useState(false);
  const [customUrl, setCustomUrl] = useState('');

  // Fetch partner's website URL
  useEffect(() => {
    const fetchPartnerWebsite = async () => {
      if (!user?.id) return;
      
      const { data: partner } = await supabase
        .from('partners')
        .select('website_url')
        .eq('id', user.id)
        .single();
      
      if (partner?.website_url) {
        setPartnerWebsite(partner.website_url.replace(/\/$/, '')); // Remove trailing slash
      }
    };

    fetchPartnerWebsite();
  }, [user]);

  // Generate URL-safe title
  const generateUrlSafeTitle = (title: string) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Get the current product URL preview
  const getProductUrlPreview = () => {
    if (!partnerWebsite) return '';
    if (isUrlEditable && customUrl) return `${partnerWebsite}/${customUrl}`;
    return formData.title ? `${partnerWebsite}/${generateUrlSafeTitle(formData.title)}` : '';
  };

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
    
    // Get the final URL
    const productUrl = isUrlEditable && customUrl 
      ? `${partnerWebsite}/${customUrl}`
      : `${partnerWebsite}/${generateUrlSafeTitle(formData.title)}`;

    // Only use the tags that were explicitly added by the user
    onSubmit({
      ...formData,
      tags: formData.tags,
      metadata: {
        ...formData.metadata,
        product_url: productUrl // Store the custom URL in metadata
      }
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

  const [selectedSizeSystem, setSelectedSizeSystem] = useState<'clothing' | 'shoes' | 'oneSize'>(
    initialData?.size?.includes('ONE SIZE') ? 'oneSize' :
    initialData?.size?.some(s => s.match(/^\d+$/)) ? 'shoes' : 'clothing'
  );

  const renderSizeSelection = () => (
    <div>
      <label className="block text-sm font-medium mb-2">Size System *</label>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {(Object.keys(SIZE_SYSTEMS) as Array<keyof typeof SIZE_SYSTEMS>).map((system) => (
          <button
            key={system}
            type="button"
            onClick={() => {
              setSelectedSizeSystem(system);
              setFormData(prev => ({ ...prev, size: [] }));
            }}
            className={`text-left p-4 rounded-lg transition-colors ${
              selectedSizeSystem === system
                ? 'bg-neon-yellow/10 border-2 border-neon-yellow'
                : 'bg-black/20 hover:bg-black/30'
            }`}
          >
            <h4 className="font-medium">{SIZE_SYSTEMS[system].name}</h4>
          </button>
        ))}
      </div>

      {selectedSizeSystem !== 'oneSize' && (
        <div>
          <label className="block text-sm font-medium mb-2">Sizes *</label>
          <div className="flex flex-wrap gap-2">
            {SIZE_SYSTEMS[selectedSizeSystem].sizes.map(size => (
              <label key={size} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.size.includes(size)}
                  onChange={e => {
                    setFormData(prev => ({
                      ...prev,
                      size: e.target.checked
                        ? [...prev.size, size]
                        : prev.size.filter(s => s !== size)
                    }));
                  }}
                  className="hidden"
                />
                <span className={`px-3 py-1 rounded-lg border-2 transition-colors ${
                  formData.size.includes(size)
                    ? 'border-neon-yellow bg-neon-yellow/10 text-neon-yellow'
                    : 'border-dark-grey text-text-grey'
                }`}>
                  {size}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {selectedSizeSystem === 'oneSize' && (
        <div className="mt-2">
          <p className="text-sm text-text-grey">This product will be marked as "One Size"</p>
          {formData.size[0] !== 'ONE SIZE' && (
            <>{setFormData(prev => ({ ...prev, size: ['ONE SIZE'] }))}</>
          )}
        </div>
      )}
    </div>
  );

  const renderCategorySelection = () => {
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
          {/* URL Preview */}
          {partnerWebsite && (
            <div className="bg-black/20 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-grey">Product URL Preview</label>
                <button
                  type="button"
                  onClick={() => setIsUrlEditable(!isUrlEditable)}
                  className="p-2 hover:bg-black/20 rounded-lg transition-colors text-text-grey"
                  title={isUrlEditable ? "Lock URL" : "Edit URL"}
                >
                  {isUrlEditable ? <Lock className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                </button>
              </div>
              {isUrlEditable ? (
                <div className="flex items-center gap-2">
                  <span className="text-text-grey">{partnerWebsite}/</span>
                  <input
                    type="text"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="flex-1 bg-black/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-yellow"
                    placeholder="custom-url"
                  />
                </div>
              ) : (
                <div className="text-neon-yellow break-all">
                  {getProductUrlPreview() || 'URL will be generated from the product title'}
                </div>
              )}
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => {
                  setFormData(prev => ({ ...prev, title: e.target.value }));
                  if (!isUrlEditable) {
                    setCustomUrl('');
                  }
                }}
                className="w-full bg-black/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-yellow"
                required
              />
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              {renderCategorySelection()}
            </div>

            {/* Size Selection */}
            {renderSizeSelection()}

            {/* Description */}
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