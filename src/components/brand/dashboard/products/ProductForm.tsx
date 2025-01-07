import React, { useState } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import Button from '../../../ui/Button';

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
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY'];

export default function ProductForm({ initialData, onSubmit, onClose }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    title: initialData?.title || '',
    category: initialData?.category || '',
    description: initialData?.description || '',
    size: initialData?.size || [],
    images: initialData?.images || [],
    price: initialData?.price || 0,
    currency: initialData?.currency || 'USD',
    metadata: initialData?.metadata || {},
    tags: initialData?.tags || [],
    stock: initialData?.stock || 0
  });

  const [newTag, setNewTag] = useState('');
  const [newMetadataKey, setNewMetadataKey] = useState('');
  const [newMetadataValue, setNewMetadataValue] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && formData.images.length + files.length <= 5) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full bg-black/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-yellow"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full bg-black/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-yellow"
                required
              />
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

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium mb-2">Sizes</label>
            <div className="flex flex-wrap gap-2">
              {SIZES.map(size => (
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

          {/* Images */}
          <div>
            <label className="block text-sm font-medium mb-2">Images (Max 5)</label>
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
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index)
                      }));
                    }}
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
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={handlePriceChange}
                className="w-full bg-black/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-yellow"
                min="0"
                step="0.01"
                required
              />
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
              <input
                type="number"
                value={formData.stock}
                onChange={handleStockChange}
                className="w-full bg-black/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-yellow"
                min="0"
                required
              />
            </div>
          </div>

          {/* Tags */}
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}