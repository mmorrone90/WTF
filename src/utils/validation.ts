// Update validateBrandForm function
export const validateBrandForm = (data: BrandFormData) => {
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
};

// Rest of the validation functions remain unchanged
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phone ? phoneRegex.test(phone) : true;
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
