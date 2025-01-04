import { BrandFormData } from '../../types/auth';
import { validateEmail, validatePassword, validatePhone, validateUrl } from './validators';

export function validateBrandForm(data: BrandFormData) {
  const errors: Record<string, string> = {};

  if (!data.businessName.trim()) {
    errors.businessName = 'Business name is required';
  }

  if (!validateEmail(data.businessEmail)) {
    errors.businessEmail = 'Please enter a valid business email';
  }

  if (!validatePhone(data.phoneNumber)) {
    errors.phoneNumber = 'Please enter a valid phone number';
  }

  if (data.websiteUrl && !validateUrl(data.websiteUrl)) {
    errors.websiteUrl = 'Please enter a valid URL';
  }

  if (!validatePassword(data.password)) {
    errors.password = 'Password must be at least 8 characters with 1 uppercase letter and 1 number';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}