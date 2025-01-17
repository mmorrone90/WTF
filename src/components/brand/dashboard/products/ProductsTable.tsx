import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  Coins,
  ArrowDown,
  ArrowUp
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
  gender?: 'male' | 'female' | 'unisex';
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
  const lastRefreshTimeRef = useRef<number>(Date.now());
  const currentPageRef = useRef(Number(searchParams.get('page')) || 1);
  const mountedRef = useRef(false);
  const PRODUCTS_PER_PAGE = 10;
  const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes
  const SESSION_CHECK_INTERVAL = 60 * 1000; // 1 minute

  const fetchDataRef = useRef(async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        if (sessionError.message === 'Invalid refresh token' || 
            sessionError.message?.includes('JWT expired')) {
          navigate('/brand/login');
          return;
        }
        throw sessionError;
      }

      if (!session) {
        navigate('/brand/login');
        return;
      }

      setIsLoading(true);
      const { products: brandProducts, total } = await getProducts({ 
        partnerId: session.user.id,
        page: currentPageRef.current,
        limit: PRODUCTS_PER_PAGE
      });
      
      setProducts(brandProducts);
      setTotalProducts(total);
      lastRefreshTimeRef.current = Date.now();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  });

  // Combined effect for data fetching
  useEffect(() => {
    // Update page number when searchParams change
    currentPageRef.current = Number(searchParams.get('page')) || 1;

    // Only fetch if it's not the initial mount or if it's the first time
    if (!mountedRef.current) {
      mountedRef.current = true;
      fetchDataRef.current();
    } else if (searchParams.get('page')) {
      fetchDataRef.current();
    }

    // Set up periodic refresh
    const intervalId = setInterval(() => {
      const now = Date.now();
      if (now - lastRefreshTimeRef.current >= REFRESH_INTERVAL) {
        fetchDataRef.current();
      }
    }, SESSION_CHECK_INTERVAL);

    return () => clearInterval(intervalId);
  }, [navigate, searchParams]);

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
        page: currentPageRef.current,
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
      if (currentPageRef.current > 1 && products.length === 1) {
        setSearchParams({ page: (currentPageRef.current - 1).toString() });
      } else {
        // Reload current page
        const { products: brandProducts, total } = await getProducts({ 
          partnerId: session.user.id,
          page: currentPageRef.current,
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

  const exportToCsv = () => {
    const csvRows = [];
    const headers = ['Product', 'Title', 'Category', 'Description', 'Size', 'Price', 'Stock', 'Product URL'];
    csvRows.push(headers.join(','));

    products.forEach(product => {
      const categories = Array.isArray(product.tags) ? product.tags.join(', ') : product.tags || '-';
      const row = [
        product.product_images?.[0]?.image_url || 'No Image',
        product.name,
        categories,
        product.description || '-',
        product.size || '-',
        `$${product.price.toFixed(2)} ${product.currency}`,
        product.stock,
        product.product_url || '-'
      ];
      csvRows.push(row.join(','));
    });

    const csvData = csvRows.join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = async (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (event) => {
        const csvText = event.target?.result as string;
        try {
          await processCsvData(csvText);
        } catch (err) {
          console.error('Error processing CSV data:', err);
          setError('Failed to process CSV data');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const processCsvData = async (csvText: string) => {
    const rows = csvText.split('\n').filter(row => row.trim() !== '');
    if (rows.length <= 1) {
      alert('No data found in CSV file');
      return;
    }

    const headers = rows[0].split(',').map(header => header.trim());
    const dataRows = rows.slice(1);

    const newProducts = dataRows.map(row => {
      const values = row.split(',').map(value => value.trim());
      const product: Partial<Product> = {};

      headers.forEach((header, index) => {
        if (header === 'Title') product.name = values[index];
        if (header === 'Category') product.tags = values[index].split(',').map(tag => tag.trim());
        if (header === 'Description') product.description = values[index];
        if (header === 'Size') product.size = values[index].split(',').map(size => size.trim());
        if (header === 'Price') product.price = parseFloat(values[index].replace('$', '').trim());
        if (header === 'Stock') product.stock = parseInt(values[index]);
        if (header === 'Product URL') product.product_url = values[index];
      });
      return product as Product;
    });

    // Confirm with user before importing
    if (window.confirm(`Import ${newProducts.length} products?`)) {
      try {
        setIsOperationLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/brand/login');
          return;
        }

        // Create new products
        for (const product of newProducts) {
          await createProduct({
            title: product.name || '',
            category: product.tags?.[0] || '',
            description: product.description || '',
            size: product.size || [],
            price: product.price || 0,
            currency: product.currency || 'USD',
            stock: product.stock || 0,
            metadata: { product_url: product.product_url || '' },
            tags: product.tags || []
          });
        }

        // Reload current page
        const { products: brandProducts, total } = await getProducts({ 
          partnerId: session.user.id,
          page: currentPageRef.current,
          limit: PRODUCTS_PER_PAGE
        });
        
        setProducts(brandProducts);
        setTotalProducts(total);
        setError(null);
      } catch (err) {
        console.error('Error importing products:', err);
        setError('Failed to import products');
      } finally {
        setIsOperationLoading(false);
      }
    }
  };

  const renderSizes = (sizes: string[] | string | undefined | null) => {
    if (!sizes) return '-';
    
    const sizeArray = Array.isArray(sizes) ? sizes : sizes.split(',').map(s => s.trim());
    
    return (
      <div className="flex flex-wrap gap-1">
        {sizeArray.map((size, index) => (
          <span 
            key={index}
            className="px-2 py-0.5 bg-dark-grey/50 rounded text-sm"
          >
            {size}
          </span>
        ))}
      </div>
    );
  };

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
          onClick={() => fetchDataRef.current()}
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
    // Extract category and gender from tags
    const tags = Array.isArray(product.tags) ? product.tags : [];
    const gender = product.gender || 'unisex';
    
    // Find the first tag that's not the gender as the category
    const category = tags.find(tag => tag !== gender) || '';

    const formData: Partial<ProductFormData> & { id: string } = {
      id: product.id,
      title: product.name,
      category: category,
      description: product.description || '',
      size: product.size || [],
      images: product.product_images?.map(img => img.image_url) || [],
      price: product.price,
      currency: product.currency,
      metadata: product.metadata || {},
      tags: tags.filter(tag => tag !== gender && tag !== category),
      stock: product.stock,
      gender: gender
    };
    
    setSelectedProduct(formData);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex justify-between items-center mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-2">
          <button 
            onClick={exportToCsv}
            className="bg-dark-grey/50 rounded-lg px-3 py-2 text-text-grey hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ArrowUp className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={handleImportClick}
            className="bg-dark-grey/50 rounded-lg px-3 py-2 text-text-grey hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ArrowDown className="w-4 h-4" />
            Import
          </button>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          Add Product
        </Button>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg animate-in fade-in duration-300">
          {error}
        </div>
      )}

      <div className="bg-dark-grey/20 rounded-xl overflow-hidden relative animate-in fade-in slide-in-from-bottom-12 duration-1000">
        {isOperationLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-yellow"></div>
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Product</TableHead>
              <TableHead className="w-48">Title</TableHead>
              <TableHead className="w-32">Category</TableHead>
              <TableHead className="w-64">Description</TableHead>
              <TableHead className="w-40">Sizes</TableHead>
              <TableHead className="w-24">Price</TableHead>
              <TableHead className="w-20">Stock</TableHead>
              <TableHead className="w-48">Product URL</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const currencySymbol = currencies.find(c => c.code === product.currency)?.symbol;
              const categories = Array.isArray(product.tags) ? product.tags : [];
              
              return (
                <TableRow key={product.id}>
                  <TableCell className="w-24">
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
                  <TableCell className="w-48 font-medium">
                    <div className="line-clamp-2">{product.name}</div>
                  </TableCell>
                  <TableCell className="w-32">
                    <div className="line-clamp-2">{categories.join(', ') || '-'}</div>
                  </TableCell>
                  <TableCell className="w-64">
                    <div className="line-clamp-2">{product.description || '-'}</div>
                  </TableCell>
                  <TableCell className="w-40">{renderSizes(product.size)}</TableCell>
                  <TableCell className="w-24">
                    <div className="flex items-center gap-1">
                      {currencySymbol}
                      {product.price.toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell className="w-20">{product.stock}</TableCell>
                  <TableCell className="w-48">
                    {product.product_url ? (
                      <a 
                        href={product.product_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-neon-yellow hover:underline line-clamp-1"
                      >
                        {product.product_url}
                      </a>
                    ) : '-'}
                  </TableCell>
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
                Page {currentPageRef.current} of {totalPages}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => handlePageChange(currentPageRef.current - 1)}
                disabled={currentPageRef.current === 1 || isLoading}
                variant="outline"
              >
                Previous
              </Button>
              <Button
                onClick={() => handlePageChange(currentPageRef.current + 1)}
                disabled={currentPageRef.current === totalPages || isLoading}
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
