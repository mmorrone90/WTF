import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { signIn } from '../services/auth/authService';
import { AuthenticationError } from '../services/auth/errors';
import { signInWithProvider } from '../services/socialAuth';
import FormInput from '../components/auth/FormInput';
import SocialAuthButton from '../components/auth/SocialAuthButton';
import Button from '../components/ui/Button';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await signIn(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      if (error instanceof AuthenticationError) {
        switch (error.code) {
          case 'INVALID_CREDENTIALS':
            setErrors({
              email: 'Invalid email or password',
              password: 'Invalid email or password'
            });
            break;
          default:
            setErrors({
              auth: 'Failed to sign in. Please try again.'
            });
        }
      } else {
        setErrors({
          auth: 'An unexpected error occurred'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'apple') => {
    try {
      await signInWithProvider(provider);
      // The page will redirect to the OAuth provider
    } catch (error) {
      setErrors({
        auth: 'Failed to sign in with social provider'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-2">Welcome Back</h2>
          <p className="text-text-grey">Log in to your account</p>
          <p className="text-xs text-text-grey mt-1">
            Are you a partner?{' '}
            <button
              type="button"
              onClick={() => navigate('/brand/login')}
              className="text-neon-yellow hover:text-neon-yellow/80 font-bold"
            >
              Please login here
            </button>
          </p>
        </div>

        <div className="space-y-4">
          <SocialAuthButton 
            provider="google" 
            onClick={() => handleSocialAuth('google')}
            disabled={loading}
          />
          <SocialAuthButton 
            provider="apple" 
            onClick={() => handleSocialAuth('apple')}
            disabled={loading}
          />

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
            error={errors.email}
            disabled={loading}
          />

          <FormInput
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            icon={Lock}
            error={errors.password}
            showPasswordToggle
            onTogglePassword={() => setShowPassword(!showPassword)}
            disabled={loading}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-neon-yellow rounded border-dark-grey focus:ring-neon-yellow"
              />
              <span className="ml-2 text-sm">Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-neon-yellow hover:text-neon-yellow/80 text-sm font-bold"
            >
              Forgot Password?
            </button>
          </div>

          {errors.auth && (
            <p className="text-red-500 text-sm text-center">{errors.auth}</p>
          )}

          <Button 
            type="submit" 
            className="w-full py-4"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Log In'}
          </Button>

          <p className="text-center text-text-grey">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-neon-yellow hover:text-neon-yellow/80 font-bold"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
