import React from 'react';
import '../../styles/glow.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'default', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  return (
    <button
      className={`
        relative px-6 py-3 font-bold rounded-lg
        transition-all duration-300
        glow-border
        ${variant === 'default' ? 'bg-neon-yellow text-black hover:bg-neon-yellow/90' : ''}
        ${variant === 'outline' ? 'border-2 border-neon-yellow text-neon-yellow hover:bg-neon-yellow/10' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}