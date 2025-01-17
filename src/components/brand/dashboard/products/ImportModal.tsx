import React from 'react';
import Button from '../../../ui/Button';
import ImportProducts from './ImportProducts';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => Promise<void>;
}

export default function ImportModal({ isOpen, onClose, onImport }: ImportModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50"
        onClick={handleBackdropClick}
      />
      
      {/* Modal */}
      <div 
        className="fixed inset-0 z-50 overflow-y-auto"
        onClick={handleBackdropClick}
      >
        <div className="min-h-screen flex items-center justify-center p-4">
          <div 
            className="relative bg-dark-grey/20 rounded-xl w-full max-w-3xl p-6 shadow-xl animate-in fade-in slide-in-from-bottom-8 duration-700"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Import Products</h2>
              <button
                onClick={onClose}
                className="text-text-grey hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <ImportProducts onImport={async (file) => {
              try {
                await onImport(file);
                onClose();
              } catch (error) {
                console.error('Import failed:', error);
              }
            }} />

            <div className="mt-6 flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 