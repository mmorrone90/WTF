import { CustomerFormData } from '../../types/auth';
import { validateEmail, validatePassword, validatePhone } from './validators';

export function validateCustomerForm(data: CustomerFormData) {
  const errors: Record<string, string> = {};

  if (!data.fullName.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!validatePassword(data.password)) {
    errors.password = 'Password must be at least 8 characters with 1 uppercase letter and 1 number';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}