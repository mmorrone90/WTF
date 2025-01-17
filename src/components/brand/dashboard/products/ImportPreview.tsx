import React, { useState } from 'react';
import Button from '../../../ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/Table';
import { NormalizedProduct } from '../../../../services/productImportService';
import { AlertCircle, ChevronDown, ChevronUp, Edit2, Image as ImageIcon, Trash2 } from 'lucide-react';
import ProductForm, { isFormValid } from './ProductForm';
import type { ProductFormData } from './ProductForm';

interface ImportPreviewProps {
  products: NormalizedProduct[];
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

interface EditingProduct {
  index: number;
  product: NormalizedProduct;
}

interface ValidationError {
  field: string;
  message: string;
}

export default function ImportPreview({ products, onConfirm, onCancel, isLoading }: ImportPreviewProps) {
  const [showIncomplete, setShowIncomplete] = useState(true);
  const [editingProduct, setEditingProduct] = useState<EditingProduct | null>(null);
  const [editedProducts, setEditedProducts] = useState<NormalizedProduct[]>(() => [...products]);

  // Split products into valid and invalid but maintain original indices
  const productsWithValidity = editedProducts.map((product, index) => ({
    product,
    index,
    isValid: !product.validationErrors || product.validationErrors.length === 0
  }));
  
  const validProducts = productsWithValidity.filter(p => p.isValid).map(p => p.product);
  const invalidProducts = productsWithValidity.filter(p => !p.isValid).map(p => p.product);

  const hasIncompleteProducts = invalidProducts.length > 0;

  const handleEditProduct = (index: number, product: NormalizedProduct) => {
    setEditingProduct({ index, product: { ...product } });
  };

  const handleSaveEdit = (updatedProduct: NormalizedProduct) => {
    if (!editingProduct) return;

    setEditedProducts(prevProducts => {
      const newProducts = [...prevProducts];
      newProducts[editingProduct.index] = updatedProduct;
      return newProducts;
    });
    setEditingProduct(null);
  };

  const handleDeleteProduct = (index: number) => {
    const newProducts = [...editedProducts];
    newProducts.splice(index, 1);
    setEditedProducts(newProducts);
  };

  const getProductUrl = (product: NormalizedProduct) => {
    const urlSafeTitle = product.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return urlSafeTitle;
  };

  const renderProductRow = (product: NormalizedProduct, index: number, isInvalid: boolean = false) => (
    <TableRow key={index} className={isInvalid ? 'bg-red-500/10' : ''}>
      <TableCell className="font-medium">
        <div className="flex items-center gap-3">
          {product.images && product.images.length > 0 ? (
            <div className="relative w-10 h-10 rounded overflow-hidden bg-dark-grey/20 flex-shrink-0">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '';
                  e.currentTarget.classList.add('hidden');
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="absolute inset-0 hidden flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-text-grey" />
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded bg-dark-grey/20 flex items-center justify-center flex-shrink-0">
              <ImageIcon className="w-5 h-5 text-text-grey" />
            </div>
          )}
          <div className="line-clamp-2">{product.title || '-'}</div>
        </div>
      </TableCell>
      <TableCell>
        <div className="line-clamp-2">{product.description || '-'}</div>
      </TableCell>
      <TableCell>
        {typeof product.price === 'number' ? `${product.price.toFixed(2)} ${product.currency}` : '-'}
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {Array.isArray(product.tags) && product.tags.length > 0 ? (
            <>
              {product.tags.slice(0, 2).map((tag: string, i: number) => (
                <span 
                  key={i}
                  className="px-2 py-0.5 bg-dark-grey/50 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
              {product.tags.length > 2 && (
                <span className="text-text-grey text-xs">
                  +{product.tags.length - 2}
                </span>
              )}
            </>
          ) : '-'}
        </div>
      </TableCell>
      <TableCell>{typeof product.stock === 'number' ? product.stock : '-'}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {Array.isArray(product.size) && product.size.length > 0 ? (
            product.size.map((size: string, i: number) => (
              <span 
                key={i}
                className="px-2 py-0.5 bg-dark-grey/50 rounded text-xs"
              >
                {size}
              </span>
            ))
          ) : '-'}
        </div>
      </TableCell>
      <TableCell>
        <div className="text-xs text-text-grey line-clamp-1 font-mono">
          {getProductUrl(product)}
        </div>
      </TableCell>
      <TableCell>
        {product.validationErrors && product.validationErrors.length > 0 ? (
          <span className="text-red-500 text-xs">
            {product.validationErrors.map(err => err.field).join(', ')} required
          </span>
        ) : (
          <span className="text-green-500 text-xs">Valid</span>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditProduct(index, product)}
            className="p-1 hover:bg-dark-grey/30 rounded"
            title="Edit product"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteProduct(index)}
            className="p-1 hover:bg-dark-grey/30 rounded text-red-500"
            title="Delete product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );

  const handleFormSubmit = (formData: ProductFormData) => {
    if (!editingProduct) return;

    // Check if the product is valid using the same validation as ProductForm
    const isValid = isFormValid({
      title: formData.title,
      category: formData.category,
      size: formData.size,
      images: formData.images,
      price: formData.price
    });

    const updatedProduct: NormalizedProduct = {
      ...editingProduct.product,
      title: formData.title,
      description: formData.description || '',
      price: formData.price,
      currency: formData.currency || 'USD',
      stock: formData.stock || 0,
      size: formData.size,
      tags: formData.tags || [],
      images: formData.images,
      category: formData.category,
      metadata: editingProduct.product.metadata, // Keep the original metadata structure
      validationErrors: isValid ? [] : [
        ...(!formData.title ? [{ field: 'title', message: 'Title is required' }] : []),
        ...(!formData.category ? [{ field: 'category', message: 'Category is required' }] : []),
        ...(formData.size.length === 0 ? [{ field: 'size', message: 'At least one size is required' }] : []),
        ...(formData.price <= 0 ? [{ field: 'price', message: 'Price must be positive' }] : []),
        ...(formData.images.length === 0 ? [{ field: 'images', message: 'At least one image is required' }] : [])
      ]
    };

    handleSaveEdit(updatedProduct);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Preview Import</h3>
          <p className="text-text-grey text-sm mt-1">
            {validProducts.length} valid {validProducts.length === 1 ? 'product' : 'products'} found
            {hasIncompleteProducts && ` • ${invalidProducts.length} incomplete`}
          </p>
        </div>
      </div>

      <div className="bg-dark-grey/20 rounded-xl overflow-hidden">
        <div className="max-h-[70vh] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-48">Name</TableHead>
                <TableHead className="w-48">Description</TableHead>
                <TableHead className="w-24">Price</TableHead>
                <TableHead className="w-32">Tags</TableHead>
                <TableHead className="w-20">Stock</TableHead>
                <TableHead className="w-32">Size</TableHead>
                <TableHead className="w-48">URL</TableHead>
                <TableHead className="w-24">Status</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Render all products in their original order */}
              {editedProducts.map((product, index) => {
                const isInvalid = product.validationErrors && product.validationErrors.length > 0;
                if (isInvalid && !showIncomplete) return null;
                if (isInvalid && hasIncompleteProducts) {
                  return renderProductRow(product, index, true);
                }
                return renderProductRow(product, index, false);
              })}

              {/* Incomplete Products Header */}
              {hasIncompleteProducts && (
                <TableRow className="bg-dark-grey/30">
                  <TableCell colSpan={9} className="p-0">
                    <button
                      onClick={() => setShowIncomplete(!showIncomplete)}
                      className="w-full flex items-center justify-between py-2 px-4 hover:bg-dark-grey/40"
                    >
                      <div className="flex items-center gap-2 text-red-500">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {invalidProducts.length} Incomplete Products
                        </span>
                      </div>
                      {showIncomplete ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-text-grey">
          {hasIncompleteProducts && (
            <p className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              Incomplete products will not be imported unless fixed
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            onClick={() => onConfirm()} 
            disabled={isLoading || validProducts.length === 0}
            className="relative"
          >
            {isLoading ? (
              <>
                <span className="opacity-0">Import Products</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                </div>
              </>
            ) : (
              `Import ${validProducts.length} ${validProducts.length === 1 ? 'Product' : 'Products'}`
            )}
          </Button>
        </div>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <ProductForm
          initialData={editingProduct.product}
          onSubmit={handleFormSubmit}
          onClose={() => setEditingProduct(null)}
          isLoading={false}
        />
      )}
    </div>
  );
} 