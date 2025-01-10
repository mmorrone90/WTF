import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../../ui/Table';
import { 
  Edit, 
  Trash2, 
  Plus, 
  DollarSign,
  CircleDollarSign,
  PoundSterling,
  Coins
} from 'lucide-react';
import Button from '../../../ui/Button';
import ProductForm from './ProductForm';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../../../services/productService';
import type { ProductData } from '../../../../services/productService';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { Product } from '../../../../types/product';
import { supabase } from '../../../../lib/supabase';

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

const currencies = [
  { symbol: <DollarSign className="w-4 h-4" />, code: 'USD' },
  { symbol: <CircleDollarSign className="w-4 h-4" />, code: 'EUR' },
  { symbol: <PoundSterling className="w-4 h-4" />, code: 'GBP' },
  { symbol: <Coins className="w-4 h-4" />, code: 'JPY' }
];

export default function ProductsTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOperationLoading, setIsOperationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<(Partial<ProductFormData> & { id?: string }) | undefined>(undefined);
  const [totalProducts, setTotalProducts] = useState(0);
  const PRODUCTS_PER_PAGE = 10;

  // Get current page from URL or default to 1
  const currentPage = Number(searchParams.get('page')) || 1;

  // Function to load data
  const loadData = async (signal?: AbortSignal) => {
    try {
      setIsLoading(true);
      
      if (signal?.aborted) return;

      // Check session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;
      if (!session) {
        navigate('/brand/login');
        return;
      }
      
      if (signal?.aborted) return;

      // Load products
      const { products: brandProducts, total } = await getProducts({ 
        partnerId: session.user.id,
        page: currentPage,
        limit: PRODUCTS_PER_PAGE
      });
      
      if (signal?.aborted) return;

      setProducts(brandProducts);
      setTotalProducts(total);
      setError(null);
    } catch (err) {
      if (signal?.aborted) return;
      console.error('Error loading products:', err);
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  };

  // Single effect to handle data loading
  useEffect(() => {
    const abortController = new AbortController();
    loadData(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [currentPage, navigate]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const handleSubmit = async (formData: ProductFormData) => {
    try {
      setIsOperationLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/brand/login');
        return;
      }

      // Convert ProductFormData to ProductData
      const productData: ProductData = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        size: formData.size,
        price: formData.price,
        currency: formData.currency,
        metadata: formData.metadata,
        tags: formData.tags,
        stock: formData.stock,
        images: formData.images
      };

      if (selectedProduct?.id) {
        await updateProduct(selectedProduct.id, productData);
      } else {
        await createProduct(productData);
        setSearchParams({ page: '1' });
      }

      // Reload current page
      const { products: brandProducts, total } = await getProducts({ 
        partnerId: session.user.id,
        page: currentPage,
        limit: PRODUCTS_PER_PAGE
      });
      
      setProducts(brandProducts);
      setTotalProducts(total);
      setIsFormOpen(false);
      setSelectedProduct(undefined);
    } catch (err) {
      console.error('Error saving product:', err);
      setError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setIsOperationLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setIsOperationLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/brand/login');
        return;
      }

      await deleteProduct(productId);
      
      // If we're on a page higher than 1 and this is the last item on the page,
      // go to the previous page
      if (currentPage > 1 && products.length === 1) {
        setSearchParams({ page: (currentPage - 1).toString() });
      } else {
        // Reload current page
        const { products: brandProducts, total } = await getProducts({ 
          partnerId: session.user.id,
          page: currentPage,
          limit: PRODUCTS_PER_PAGE
        });
        
        setProducts(brandProducts);
        setTotalProducts(total);
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    } finally {
      setIsOperationLoading(false);
    }
  };

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-dark-grey/20 rounded w-1/4" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-dark-grey/20 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-red-500">{error}</div>
        <button
          onClick={() => loadData()}
          className="px-4 py-2 bg-dark-grey/20 rounded-lg hover:bg-dark-grey/40 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
        <div className="text-center py-12 bg-dark-grey/20 rounded-xl">
          <p className="text-text-grey mb-4">No products found</p>
          <Button onClick={() => setIsFormOpen(true)}>
            Add Your First Product
          </Button>
        </div>
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto">
            <div className="min-h-screen flex items-center justify-center p-4">
              <ProductForm
                initialData={selectedProduct}
                onSubmit={handleSubmit}
                onClose={() => {
                  setIsFormOpen(false);
                  setSelectedProduct(undefined);
                }}
                isLoading={isOperationLoading}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  const handleEditProduct = (product: Product) => {
    const formData: Partial<ProductFormData> & { id: string } = {
      id: product.id,
      title: product.name,
      category: product.tags || '',
      description: product.description || '',
      size: product.size ? [product.size] : [],
      images: product.product_images?.map(img => img.image_url) || [],
      price: product.price,
      currency: product.currency,
      metadata: product.metadata || {},
      tags: product.tags?.split(',').filter(Boolean) || [],
      stock: product.stock
    };
    
    setSelectedProduct(formData);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-dark-grey/20 rounded-xl overflow-hidden relative">
        {isOperationLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-yellow"></div>
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const currencySymbol = currencies.find(c => c.code === product.currency)?.symbol;
              const categories = product.tags?.split(',').filter(Boolean) || [];
              
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.product_images?.[0]?.image_url ? (
                      <img 
                        src={product.product_images[0].image_url} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-dark-grey rounded-lg flex items-center justify-center text-text-grey">
                        No Image
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{categories.join(', ') || '-'}</TableCell>
                  <TableCell className="max-w-xs truncate">{product.description || '-'}</TableCell>
                  <TableCell>{product.size || '-'}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {currencySymbol}
                      {product.price.toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-2 hover:bg-dark-grey/50 rounded-lg transition-colors"
                        title="Edit product"
                        disabled={isOperationLoading}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 hover:bg-dark-grey/50 rounded-lg transition-colors text-red-500"
                        title="Delete product"
                        disabled={isOperationLoading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-dark-grey">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-grey">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                variant="outline"
              >
                Previous
              </Button>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                variant="outline"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <ProductForm
              initialData={selectedProduct}
              onSubmit={handleSubmit}
              onClose={() => {
                setIsFormOpen(false);
                setSelectedProduct(undefined);
              }}
              isLoading={isOperationLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
}