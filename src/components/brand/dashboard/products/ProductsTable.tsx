import React, { useState, useEffect } from 'react';
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
import { getProducts, createProduct } from '../../../../services/productService';

const currencies = [
  { symbol: <DollarSign className="w-4 h-4" />, code: 'USD' },
  { symbol: <CircleDollarSign className="w-4 h-4" />, code: 'EUR' },
  { symbol: <PoundSterling className="w-4 h-4" />, code: 'GBP' },
  { symbol: <Coins className="w-4 h-4" />, code: 'JPY' }
];

export default function ProductsTable() {
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleSubmit = async (data: any) => {
    try {
      await createProduct(data);
      await loadProducts();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving product:', error);
      // TODO: Show error message to user
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <select className="bg-dark-grey/50 rounded-lg px-4 py-2">
            {currencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={handleAddProduct}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

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
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {product.product_images?.[0]?.image_url ? (
                  <img 
                    src={product.product_images[0].image_url} 
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-16 h-16 bg-dark-grey rounded-lg" />
                )}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category || '-'}</TableCell>
              <TableCell>{product.description || '-'}</TableCell>
              <TableCell>{product.size?.join(', ') || '-'}</TableCell>
              <TableCell>{product.price} {product.currency}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="p-2 hover:bg-dark-grey rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {/* TODO: Implement delete */}}
                    className="p-2 hover:bg-dark-grey rounded-lg transition-colors text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showForm && (
        <ProductForm
          initialData={selectedProduct}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}