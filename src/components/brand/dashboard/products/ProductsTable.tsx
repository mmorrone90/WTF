import React, { useState } from 'react';
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

const currencies = [
  { symbol: <DollarSign className="w-4 h-4" />, code: 'USD' },
  { symbol: <CircleDollarSign className="w-4 h-4" />, code: 'EUR' },
  { symbol: <PoundSterling className="w-4 h-4" />, code: 'GBP' },
  { symbol: <Coins className="w-4 h-4" />, code: 'JPY' }
];

export default function ProductsTable() {
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

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
            <TableHead>Images</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Table content will be added here */}
        </TableBody>
      </Table>

      {showForm && (
        <ProductForm
          initialData={selectedProduct}
          onSubmit={(data) => {
            console.log('Form submitted:', data);
            setShowForm(false);
          }}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}