export interface Product {
  id: string;
  name: string;
  description?: string;
  size: string;
  price: number;
  currency: string;
  partner_id?: string;
  category_id?: string;
  stock: number;
  metadata?: Record<string, any>;
  tags?: string;
  created_at?: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  is_primary: boolean;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  partner_id?: string;
  description?: string;
  created_at?: string;
}

export interface Partner {
  id: string;
  business_name: string;
  phone: string;
  website_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Customer {
  id: string;
  full_name: string;
  phone?: string;
  shipping_address?: Record<string, any>;
  preferences?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface Profile {
  id: string;
  email: string;
  user_type: string;
  created_at?: string;
  updated_at?: string;
} 