import React from 'react';
import { Apple, Chrome } from 'lucide-react';

interface SocialAuthButtonProps {
  provider: 'google' | 'apple';
  onClick: () => void;
  disabled?: boolean;
}

export default function SocialAuthButton({ provider, onClick, disabled }: SocialAuthButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 
                 border-2 border-dark-grey rounded-lg
                 hover:border-neon-yellow transition-colors
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {provider === 'google' ? (
        <>
          <Chrome className="w-5 h-5" />
          Continue with Google
        </>
      ) : (
        <>
          <Apple className="w-5 h-5" />
          Continue with Apple
        </>
      )}
    </button>
  );
}
