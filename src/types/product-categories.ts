export interface Size {
  value: string;
  label: string;
  order: number;
  gender?: 'male' | 'female' | 'unisex';
}

export interface SizeSystem {
  name: string;
  sizes: Size[];
}

export const CLOTHING_SIZES: SizeSystem = {
  name: 'Clothing',
  sizes: [
    { value: 'xs', label: 'XS', order: 1, gender: 'female' },
    { value: 's', label: 'S', order: 2, gender: 'female' },
    { value: 'm', label: 'M', order: 3, gender: 'female' },
    { value: 'l', label: 'L', order: 4, gender: 'female' },
    { value: 'xl', label: 'XL', order: 5, gender: 'female' },
    { value: 'xxl', label: 'XXL', order: 6, gender: 'female' },
    { value: 's', label: 'S', order: 7, gender: 'male' },
    { value: 'm', label: 'M', order: 8, gender: 'male' },
    { value: 'l', label: 'L', order: 9, gender: 'male' },
    { value: 'xl', label: 'XL', order: 10, gender: 'male' },
    { value: 'xxl', label: 'XXL', order: 11, gender: 'male' },
    { value: 'xxxl', label: 'XXXL', order: 12, gender: 'male' }
  ]
};

export const SHOE_SIZES: SizeSystem = {
  name: 'Shoes',
  sizes: [
    { value: '35', label: 'EU 35 / US 5', order: 1, gender: 'female' },
    { value: '36', label: 'EU 36 / US 6', order: 2, gender: 'female' },
    { value: '37', label: 'EU 37 / US 7', order: 3, gender: 'female' },
    { value: '38', label: 'EU 38 / US 8', order: 4, gender: 'female' },
    { value: '39', label: 'EU 39 / US 9', order: 5, gender: 'female' },
    { value: '40', label: 'EU 40 / US 10', order: 6, gender: 'female' },
    { value: '40', label: 'EU 40 / US 7', order: 7, gender: 'male' },
    { value: '41', label: 'EU 41 / US 8', order: 8, gender: 'male' },
    { value: '42', label: 'EU 42 / US 9', order: 9, gender: 'male' },
    { value: '43', label: 'EU 43 / US 10', order: 10, gender: 'male' },
    { value: '44', label: 'EU 44 / US 11', order: 11, gender: 'male' },
    { value: '45', label: 'EU 45 / US 12', order: 12, gender: 'male' }
  ]
};

export const HAT_SIZES: SizeSystem = {
  name: 'Hats',
  sizes: [
    { value: 's', label: 'S (55-56cm)', order: 1, gender: 'unisex' },
    { value: 'm', label: 'M (57-58cm)', order: 2, gender: 'unisex' },
    { value: 'l', label: 'L (59-60cm)', order: 3, gender: 'unisex' },
    { value: 'xl', label: 'XL (61-62cm)', order: 4, gender: 'unisex' }
  ]
};

export const BELT_SIZES: SizeSystem = {
  name: 'Belts',
  sizes: [
    { value: 's', label: 'S (75-85cm)', order: 1, gender: 'unisex' },
    { value: 'm', label: 'M (85-95cm)', order: 2, gender: 'unisex' },
    { value: 'l', label: 'L (95-105cm)', order: 3, gender: 'unisex' },
    { value: 'xl', label: 'XL (105-115cm)', order: 4, gender: 'unisex' }
  ]
};

export const SCARF_SIZES: SizeSystem = {
  name: 'Scarves',
  sizes: [
    { value: 'os', label: 'One Size', order: 1, gender: 'unisex' }
  ]
};

export const OTHER_SIZES: SizeSystem = {
  name: 'Other',
  sizes: [
    { value: 'xs', label: 'XS', order: 1, gender: 'unisex' },
    { value: 's', label: 'S', order: 2, gender: 'unisex' },
    { value: 'm', label: 'M', order: 3, gender: 'unisex' },
    { value: 'l', label: 'L', order: 4, gender: 'unisex' },
    { value: 'xl', label: 'XL', order: 5, gender: 'unisex' },
    { value: 'os', label: 'One Size', order: 6, gender: 'unisex' }
  ]
};

export interface ProductCategory {
  id: string;
  name: string;
  subcategories?: ProductCategory[];
  sizeSystem?: SizeSystem;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'clothing',
    name: 'Clothing',
    subcategories: [
      {
        id: 'tops',
        name: 'Tops',
        subcategories: [
          {
            id: 't-shirts',
            name: 'T-Shirts',
            sizeSystem: CLOTHING_SIZES
          },
          {
            id: 'shirts',
            name: 'Shirts',
            sizeSystem: CLOTHING_SIZES
          }
        ]
      },
      {
        id: 'bottoms',
        name: 'Bottoms',
        subcategories: [
          {
            id: 'pants',
            name: 'Pants',
            sizeSystem: CLOTHING_SIZES
          }
        ]
      },
      {
        id: 'outerwear',
        name: 'Outerwear',
        subcategories: [
          {
            id: 'blazers',
            name: 'Blazers',
            sizeSystem: CLOTHING_SIZES
          }
        ]
      }
    ]
  },
  {
    id: 'shoes',
    name: 'Shoes',
    sizeSystem: SHOE_SIZES,
    subcategories: [
      {
        id: 'sneakers',
        name: 'Sneakers',
        sizeSystem: SHOE_SIZES
      },
      {
        id: 'boots',
        name: 'Boots',
        sizeSystem: SHOE_SIZES
      },
      {
        id: 'sandals',
        name: 'Sandals',
        sizeSystem: SHOE_SIZES
      }
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories',
    subcategories: [
      {
        id: 'hats',
        name: 'Hats',
        sizeSystem: HAT_SIZES
      },
      {
        id: 'belts',
        name: 'Belts',
        sizeSystem: BELT_SIZES
      },
      {
        id: 'scarves',
        name: 'Scarves',
        sizeSystem: SCARF_SIZES
      }
    ]
  },
  {
    id: 'other',
    name: 'Other',
    sizeSystem: OTHER_SIZES
  }
]; 