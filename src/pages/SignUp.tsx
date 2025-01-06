import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import UserTypeSelector from '../components/auth/UserTypeSelector';
import CustomerSignUpForm from '../components/auth/CustomerSignUpForm';
import { CustomerFormData } from '../types/auth';
import { validateCustomerForm } from '../utils/validation/customerValidation';
import { signUpCustomer } from '../services/customerAuth';

export default function SignUp() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'partner' | 'customer' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const [customerFormData, setCustomerFormData] = useState<CustomerFormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleUserTypeSelect = (type: 'partner' | 'customer') => {
    if (type === 'partner') {
      navigate('/brand/signup');
    } else {
      setUserType(type);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    try {
      const validationErrors = validateCustomerForm(customerFormData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setLoading(false);
        return;
      }

      await signUpCustomer({
        email: customerFormData.email,
        password: customerFormData.password,
        fullName: customerFormData.fullName,
        phone: customerFormData.phone
      });

      navigate('/');
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
    setCustomerFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-2">Create Account</h2>
          <p className="text-text-grey">Join the future of fashion</p>
        </div>

        <UserTypeSelector
          selectedType={userType}
          onSelect={handleUserTypeSelect}
        />

        {userType === 'customer' && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <CustomerSignUpForm
              formData={customerFormData}
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <p className="text-center text-text-grey">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-neon-yellow hover:text-neon-yellow/80 font-bold"
              >
                Sign In
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
