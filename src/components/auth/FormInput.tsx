import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: LucideIcon;
  error?: string;
  rightElement?: React.ReactNode;
}

export default function FormInput({
  type,
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  rightElement
}: FormInputProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-text-grey transition-colors peer-focus:text-neon-yellow" />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`peer block w-full pl-10 ${rightElement ? 'pr-12' : 'pr-3'} py-3 
                   bg-background rounded-lg text-white placeholder-text-grey
                   border border-text-grey
                   focus:outline-none focus:ring-2 focus:ring-neon-yellow focus:border-transparent
                   ${error ? 'ring-2 ring-red-500 border-transparent' : ''}`}
        placeholder={placeholder}
      />
      {rightElement}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
