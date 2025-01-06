export interface MockProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  image: string;
  partnerUrl: string;
  rating: number;
  category: string;
  gender: 'men' | 'women' | 'unisex';
}

export const mockProducts: MockProduct[] = [
  {
    id: '1',
    name: 'Tech Wear Jacket',
    brand: 'CyberStyle',
    price: 189.99,
    originalPrice: 239.99,
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3',
    partnerUrl: 'https://example.com/product-1',
    rating: 5,
    category: 'jacket',
    gender: 'unisex'
  },
  {
    id: '2',
    name: 'Urban Combat Boots',
    brand: 'NeoTokyo',
    price: 159.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1542280756-74b2f55e73ab',
    partnerUrl: 'https://example.com/product-2',
    rating: 4,
    category: 'sneakers',
    gender: 'unisex'
  },
  {
    id: '3',
    name: 'Neon Dreams Hoodie',
    brand: 'Synthwave',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7',
    partnerUrl: 'https://example.com/product-3',
    rating: 5,
    category: 'hoodie',
    gender: 'unisex'
  },
  {
    id: '4',
    name: 'Cyber Punk Dress',
    brand: 'Digital Couture',
    price: 129.99,
    originalPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
    partnerUrl: 'https://example.com/product-4',
    rating: 4,
    category: 'dress',
    gender: 'women'
  },
  {
    id: '5',
    name: 'Matrix Cargo Pants',
    brand: 'Digital Nomad',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8',
    partnerUrl: 'https://example.com/product-5',
    rating: 5,
    category: 'pant',
    gender: 'men'
  },
  {
    id: '6',
    name: 'Holographic Crop Top',
    brand: 'Cyber Glam',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    partnerUrl: 'https://example.com/product-6',
    rating: 4,
    category: 't-shirt',
    gender: 'women'
  },
  {
    id: '7',
    name: 'Tech Runner Sneakers',
    brand: 'NeoTokyo',
    price: 139.99,
    originalPrice: 179.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    partnerUrl: 'https://example.com/product-7',
    rating: 5,
    category: 'sneakers',
    gender: 'unisex'
  },
  {
    id: '8',
    name: 'Digital Camo Jacket',
    brand: 'CyberStyle',
    price: 169.99,
    originalPrice: 219.99,
    image: 'https://images.unsplash.com/photo-1551794840-8ae3b9c814e4',
    partnerUrl: 'https://example.com/product-8',
    rating: 4,
    category: 'jacket',
    gender: 'men'
  },
  {
    id: '9',
    name: 'Neon Stripe Sports Bra',
    brand: 'Digital Fit',
    price: 44.99,
    originalPrice: 59.99,
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2',
    partnerUrl: 'https://example.com/product-9',
    rating: 5,
    category: 'sports',
    gender: 'women'
  }
];
