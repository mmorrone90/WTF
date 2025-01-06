import React from 'react';
import { Building2, User } from 'lucide-react';

interface UserTypeSelectorProps {
  selectedType: 'partner' | 'customer' | null;
  onSelect: (type: 'partner' | 'customer') => void;
}

export default function UserTypeSelector({ selectedType, onSelect }: UserTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <button
        onClick={() => onSelect('customer')}
        className={`p-6 rounded-lg border-2 transition-all duration-300 flex flex-col items-center gap-3
                   ${selectedType === 'customer' 
                     ? 'border-neon-yellow bg-neon-yellow/10' 
                     : 'border-dark-grey hover:border-neon-yellow/50'}`}
      >
        <User className={`w-8 h-8 ${selectedType === 'customer' ? 'text-neon-yellow' : 'text-text-grey'}`} />
        <span className="font-bold">Customer</span>
      </button>

      <button
        onClick={() => onSelect('partner')}
        className={`p-6 rounded-lg border-2 transition-all duration-300 flex flex-col items-center gap-3
                   ${selectedType === 'partner' 
                     ? 'border-neon-yellow bg-neon-yellow/10' 
                     : 'border-dark-grey hover:border-neon-yellow/50'}`}
      >
        <Building2 className={`w-8 h-8 ${selectedType === 'partner' ? 'text-neon-yellow' : 'text-text-grey'}`} />
        <span className="font-bold">Partner</span>
      </button>
    </div>
  );
}
