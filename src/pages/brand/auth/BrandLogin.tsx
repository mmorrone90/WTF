import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandAuthForm from '../../../components/brand/auth/BrandAuthForm';
import { signInBrand } from '../../../services/brandAuth';

export default function BrandLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSubmit = async (formData: { email: string; password: string }) => {
    setIsLoading(true);
    setError(undefined);
    
    try {
      await signInBrand({
        email: formData.email,
        password: formData.password
      });
      navigate('/brand/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <BrandAuthForm 
        onSubmit={handleSubmit} 
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
