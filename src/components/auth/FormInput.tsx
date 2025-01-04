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
        <Icon className="h-5 w-5 text-text-grey" />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`block w-full pl-10 ${rightElement ? 'pr-12' : 'pr-3'} py-3 
                   bg-dark-grey rounded-lg text-white placeholder-text-grey
                   focus:outline-none focus:ring-2 focus:ring-neon-yellow
                   ${error ? 'ring-2 ring-red-500' : ''}`}
        placeholder={placeholder}
      />
      {rightElement}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}