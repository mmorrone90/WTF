export interface SizeOption {
  value: string;
  label: string;
  order: number;
}

export interface ProductCategory {
  id: string;
  label: string;
  sizes: SizeOption[];
}

export const CLOTHING_SIZES: SizeOption[] = [
  { value: 'xs', label: 'XS', order: 1 },
  { value: 's', label: 'S', order: 2 },
  { value: 'm', label: 'M', order: 3 },
  { value: 'l', label: 'L', order: 4 },
  { value: 'xl', label: 'XL', order: 5 },
  { value: 'xxl', label: 'XXL', order: 6 },
];

export const SHOE_SIZES: SizeOption[] = [
  { value: '35', label: 'EU 35', order: 1 },
  { value: '36', label: 'EU 36', order: 2 },
  { value: '37', label: 'EU 37', order: 3 },
  { value: '38', label: 'EU 38', order: 4 },
  { value: '39', label: 'EU 39', order: 5 },
  { value: '40', label: 'EU 40', order: 6 },
  { value: '41', label: 'EU 41', order: 7 },
  { value: '42', label: 'EU 42', order: 8 },
  { value: '43', label: 'EU 43', order: 9 },
  { value: '44', label: 'EU 44', order: 10 },
  { value: '45', label: 'EU 45', order: 11 },
];

export const HAT_SIZES: SizeOption[] = [
  { value: 's', label: 'S (55-56cm)', order: 1 },
  { value: 'm', label: 'M (57-58cm)', order: 2 },
  { value: 'l', label: 'L (59-60cm)', order: 3 },
  { value: 'xl', label: 'XL (61-62cm)', order: 4 },
];

export const BELT_SIZES: SizeOption[] = [
  { value: 's', label: 'S (75-85cm)', order: 1 },
  { value: 'm', label: 'M (85-95cm)', order: 2 },
  { value: 'l', label: 'L (95-105cm)', order: 3 },
  { value: 'xl', label: 'XL (105-115cm)', order: 4 },
];

export const ONE_SIZE: SizeOption[] = [
  { value: 'os', label: 'One Size', order: 1 },
];

export const ACCESSORY_SIZES: SizeOption[] = [
  { value: 'os', label: 'One Size', order: 1 },
];

export const PRODUCT_CATEGORIES: Record<string, ProductCategory> = {
  clothing: {
    id: 'clothing',
    label: 'Clothing',
    sizes: CLOTHING_SIZES,
  },
  shoes: {
    id: 'shoes',
    label: 'Shoes',
    sizes: SHOE_SIZES,
  },
  hats: {
    id: 'hats',
    label: 'Hats',
    sizes: HAT_SIZES,
  },
  belts: {
    id: 'belts',
    label: 'Belts',
    sizes: BELT_SIZES,
  },
  accessories: {
    id: 'accessories',
    label: 'Accessories',
    sizes: ACCESSORY_SIZES,
  },
}; 