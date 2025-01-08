import React from 'react';
import ProductsTable from '../../../components/brand/dashboard/products/ProductsTable';

export default function Products() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Products</h1>
      <ProductsTable />
    </div>
  );
}