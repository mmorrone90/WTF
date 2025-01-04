import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import FormInput from '../../auth/FormInput';
import Button from '../../ui/Button';
import SocialAuthButton from '../../auth/SocialAuthButton';

interface BrandAuthFormProps {
  onSubmit: (formData: { email: string; password: string }) => void;
  isLoading: boolean;
  error?: string;
}

export default function BrandAuthForm({ onSubmit, isLoading, error }: BrandAuthFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Partner WhereToFind</h2>
        <p className="mt-2 text-text-grey">Join our brand partnership program</p>
      </div>

      <div className="space-y-4">
        <SocialAuthButton provider="google" onClick={() => {}} />
        <SocialAuthButton provider="apple" onClick={() => {}} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dark-grey"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-text-grey">Or continue with</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <FormInput
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          icon={Mail}
        />

        <FormInput
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          icon={Lock}
          showPasswordToggle
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Continue'}
        </Button>
      </form>
    </div>
  );
}