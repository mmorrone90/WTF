// Update BrandFormData interface
export interface BrandFormData {
  businessName: string;
  businessEmail: string;
  phoneNumber: string;
  websiteUrl: string;
  password: string;
  confirmPassword: string;
}

// Rest of the file remains unchanged
export interface BaseUser {
  id: string;
  email: string;
  created_at: string;
}

export interface CustomerProfile extends BaseUser {
  user_type: 'customer';
  full_name: string;
  phone?: string;
  shipping_address?: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  preferences?: Record<string, any>;
}

export interface PartnerProfile extends BaseUser {
  user_type: 'partner';
  business_name: string;
  phone: string;
  website_url?: string;
}

export type UserProfile = CustomerProfile | PartnerProfile;
