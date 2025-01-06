import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import BrandSignUpForm from '../../components/auth/BrandSignUpForm';
import { BrandFormData } from '../../types/auth';
import { validateBrandForm } from '../../utils/validation';
import { signUpBrand } from '../../services/brandAuth';

export default function BrandSignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<BrandFormData>({
    businessName: '',
    businessCategory: '',
    businessEmail: '',
    businessAddress: '',
    contactPersonName: '',
    socialMediaLinks: '',
    phoneNumber: '',
    websiteUrl: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    try {
      const validationErrors = validateBrandForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      await signUpBrand({
        email: formData.businessEmail,
        password: formData.password,
        businessName: formData.businessName,
        businessCategory: formData.businessCategory,
        contactPerson: formData.contactPersonName,
        phone: formData.phoneNumber,
        website: formData.websiteUrl
      });

      navigate('/brand/dashboard');
    } catch (error: any) {
      console.error('Signup error:', error);
      setErrors({
        email: error.message || 'Failed to create account'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-2">Create Partner Account</h2>
          <p className="text-text-grey">Join WhereToFind as a brand partner</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <BrandSignUpForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          <Button 
            type="submit" 
            className="w-full py-4"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Partner Account'}
          </Button>

          <p className="text-center text-text-grey">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/brand/login')}
              className="text-neon-yellow hover:text-neon-yellow/80 font-bold"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
