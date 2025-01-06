import React from 'react';
import { User, Mail, Phone, Lock } from 'lucide-react';
import FormInput from './FormInput';
import Button from '../ui/Button';
import { CustomerFormData } from '../../types/auth';

interface CustomerSignUpFormProps {
  formData: CustomerFormData;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
}

export default function CustomerSignUpForm({
  formData,
  errors,
  onChange,
  showPassword,
  onTogglePassword
}: CustomerSignUpFormProps) {
  return (
    <div className="space-y-6">
      <FormInput
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={onChange}
        placeholder="Full Name"
        icon={User}
        error={errors.fullName}
      />

      <FormInput
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        placeholder="Email Address"
        icon={Mail}
        error={errors.email}
      />

      <FormInput
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={onChange}
        placeholder="Phone Number (Optional)"
        icon={Phone}
        error={errors.phone}
      />

      <FormInput
        type={showPassword ? 'text' : 'password'}
        name="password"
        value={formData.password}
        onChange={onChange}
        placeholder="Password"
        icon={Lock}
        error={errors.password}
        showPasswordToggle
        onTogglePassword={onTogglePassword}
      />

      <FormInput
        type={showPassword ? 'text' : 'password'}
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={onChange}
        placeholder="Confirm Password"
        icon={Lock}
        error={errors.confirmPassword}
      />
    </div>
  );
}
