import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowDown, FileText, Server, Database } from 'lucide-react';
import { normalizeImportedFile, saveNormalizedProducts, NormalizedProduct, ImportResult } from '../../../../services/productImportService';
import ImportPreview from './ImportPreview';
import { useAuthContext } from '../../../../contexts/AuthContext';

interface ImportProductsProps {
  onImport: (file: File) => Promise<void>;
}

type ImportStage = 'reading' | 'normalizing' | 'importing' | null;

export default function ImportProducts({ onImport }: ImportProductsProps) {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [importStage, setImportStage] = useState<ImportStage>(null);
  const [error, setError] = useState<string | null>(null);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);

  const handleConfirmImport = async () => {
    if (!importResult || !user?.id) return;
    
    try {
      setIsLoading(true);
      setError(null);
      setImportStage('importing');

      // Save the products with actual partner ID
      await saveNormalizedProducts(importResult.products.map(product => ({
        ...product,
        partner_id: user.id
      })));
      
      // Show importing animation for a moment
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Trigger parent's onImport for cleanup and refresh
      await onImport(new File([], 'dummy'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save products');
      setImportStage(null);
      setIsLoading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0 || !user?.id) return;
    
    const file = acceptedFiles[0];
    setIsLoading(true);
    setError(null);
    
    try {
      // Reading file
      setImportStage('reading');
      await new Promise(resolve => setTimeout(resolve, 800)); // Show animation

      // Normalizing data with actual partner ID
      setImportStage('normalizing');
      const result = await normalizeImportedFile(file, user.id);
      await new Promise(resolve => setTimeout(resolve, 800)); // Show animation
      
      if (result.hasErrors) {
        setError(`Found ${result.errorCount} products with validation errors`);
      }
      
      setImportResult(result);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import products');
      setImportResult(null);
    } finally {
      setIsLoading(false);
      setImportStage(null);
    }
  }, [user?.id]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false,
    disabled: isLoading || !!importResult
  });

  // Show error if no user
  if (!user?.id) {
    return (
      <div className="text-center text-red-500">
        Error: Unable to import products. Please try logging in again.
      </div>
    );
  }

  // Show preview if we have normalized products
  if (importResult) {
    return (
      <ImportPreview 
        products={importResult.products}
        onConfirm={handleConfirmImport}
        onCancel={() => setImportResult(null)}
        isLoading={importStage === 'importing'}
      />
    );
  }

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          relative p-8 border-2 border-dashed rounded-lg cursor-pointer
          transition-all duration-300 bg-dark-grey/20
          ${isDragActive ? 'border-neon-yellow bg-neon-yellow/5' : 'border-dark-grey hover:border-neon-yellow'}
          ${error ? 'border-red-500' : ''}
          ${isLoading ? 'pointer-events-none' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="text-center space-y-4">
          {!isLoading && (
            <>
              <div className="text-lg">
                {isDragActive ? (
                  <p className="text-neon-yellow">Drop your file here</p>
                ) : (
                  <div className="space-y-2">
                    <ArrowDown className="w-6 h-6 mx-auto text-text-grey" />
                    <p className="text-text-grey">
                      Drag and drop your CSV file here, or click to select
                    </p>
                  </div>
                )}
              </div>
              <p className="text-sm text-text-grey">
                Supported format: CSV
              </p>
            </>
          )}

          {isLoading && (
            <div className="space-y-6 py-4">
              <div className="flex items-center justify-center space-x-8">
                <div className={`flex flex-col items-center transition-opacity duration-300 ${importStage === 'reading' ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="relative">
                    <FileText className={`w-8 h-8 ${importStage === 'reading' ? 'text-neon-yellow animate-bounce' : 'text-text-grey'}`} />
                    {importStage === 'reading' && (
                      <div className="absolute inset-0 -m-2 rounded-full border-2 border-neon-yellow animate-ping" />
                    )}
                  </div>
                  <p className="mt-2 text-sm">Reading</p>
                </div>

                <div className="w-8 h-px bg-dark-grey" />

                <div className={`flex flex-col items-center transition-opacity duration-300 ${importStage === 'normalizing' ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="relative">
                    <Server className={`w-8 h-8 ${importStage === 'normalizing' ? 'text-neon-yellow animate-bounce' : 'text-text-grey'}`} />
                    {importStage === 'normalizing' && (
                      <div className="absolute inset-0 -m-2 rounded-full border-2 border-neon-yellow animate-ping" />
                    )}
                  </div>
                  <p className="mt-2 text-sm">Normalizing</p>
                </div>

                <div className="w-8 h-px bg-dark-grey" />

                <div className={`flex flex-col items-center transition-opacity duration-300 ${importStage === 'importing' ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="relative">
                    <Database className={`w-8 h-8 ${importStage === 'importing' ? 'text-neon-yellow animate-bounce' : 'text-text-grey'}`} />
                    {importStage === 'importing' && (
                      <div className="absolute inset-0 -m-2 rounded-full border-2 border-neon-yellow animate-ping" />
                    )}
                  </div>
                  <p className="mt-2 text-sm">Importing</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
} 