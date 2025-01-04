import React from 'react';
import '../../styles/glow.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`
      bg-dark-grey rounded-lg overflow-hidden
      transform transition-all duration-300
      hover:scale-105 glow-border
      ${className}
    `}>
      {children}
    </div>
  );
}