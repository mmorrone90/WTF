import React from 'react';
import { Building2, Mail, Phone, Globe, Lock } from 'lucide-react';
import FormInput from './FormInput';
import { BrandFormData } from '../../types/auth';

interface BrandSignUpFormProps {
  formData: BrandFormData;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
}

export default function BrandSignUpForm({
  formData,
  errors,
  onChange,
  showPassword,
  onTogglePassword
}: BrandSignUpFormProps) {
  return (
    <div className="space-y-6">
      <FormInput
        type="text"
        name="businessName"
        value={formData.businessName}
        onChange={onChange}
        placeholder="Business Name"
        icon={Building2}
        error={errors.businessName}
      />

      <FormInput
        type="email"
        name="businessEmail"
        value={formData.businessEmail}
        onChange={onChange}
        placeholder="Business Email"
        icon={Mail}
        error={errors.businessEmail}
      />

      <FormInput
        type="tel"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={onChange}
        placeholder="Phone Number"
        icon={Phone}
        error={errors.phoneNumber}
      />

      <FormInput
        type="url"
        name="websiteUrl"
        value={formData.websiteUrl}
        onChange={onChange}
        placeholder="Website URL (Optional)"
        icon={Globe}
        error={errors.websiteUrl}
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