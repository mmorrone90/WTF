import { Product as DbProduct, ProductImage } from './database';

export interface Product extends Omit<DbProduct, 'partner_id' | 'category_id'> {
  brand: string; // Derived from partner's business_name
  image: string; // Primary image URL from product_images
  partnerUrl?: string; // Derived from partner's website_url
  rating?: number; // UI-specific field
  originalPrice?: number; // UI-specific field for discounts
  product_images?: ProductImage[]; // All product images
  metadata?: Record<string, any>; // Product metadata
  discount?: string; // UI-specific field for discount display
  sold?: string; // UI-specific field for number of items sold
}
