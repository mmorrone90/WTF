import React, { useState } from 'react';
import ProductsTable from '../../../components/brand/dashboard/products/ProductsTable';
import ImportModal from '../../../components/brand/dashboard/products/ImportModal';
import { importProducts } from '../../../services/productImportService';
import { useSession } from '../../../hooks/useSession';

export default function Products() {
  const { session } = useSession();
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const handleImport = async (file: File) => {
    if (!session?.user?.id) return;
    await importProducts(file, session.user.id);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
      </div>
      
      <ImportModal 
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImport}
      />
      
      <ProductsTable onImportClick={() => setIsImportModalOpen(true)} />
    </div>
  );
}