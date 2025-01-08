import { Product } from '../types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Tech Wear Jacket',
    brand: 'CyberStyle',
    price: 189.99,
    currency: 'USD',
    size: 'L',
    description: 'Advanced tech wear jacket with multiple pockets and weather resistance',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3',
    partnerUrl: 'https://example.com/product-1',
    rating: 5,
    originalPrice: 239.99,
    tags: 'jacket,tech wear,unisex'
  },
  {
    id: '2',
    name: 'Urban Combat Boots',
    brand: 'NeoTokyo',
    price: 159.99,
    currency: 'USD',
    size: '42',
    description: 'Durable urban combat boots with advanced grip technology',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1542280756-74b2f55e73ab',
    partnerUrl: 'https://example.com/product-2',
    rating: 4,
    originalPrice: 199.99,
    tags: 'boots,footwear,unisex'
  },
  {
    id: '3',
    name: 'Neon Dreams Hoodie',
    brand: 'Synthwave',
    price: 79.99,
    currency: 'USD',
    size: 'M',
    description: 'Comfortable hoodie with neon accents and reflective details',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7',
    partnerUrl: 'https://example.com/product-3',
    rating: 5,
    originalPrice: 99.99,
    tags: 'hoodie,streetwear,unisex'
  },
  {
    id: '4',
    name: 'Cyber Punk Dress',
    brand: 'Digital Couture',
    price: 129.99,
    currency: 'USD',
    size: 'S',
    description: 'Futuristic dress with LED accents and asymmetric design',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
    partnerUrl: 'https://example.com/product-4',
    rating: 4,
    originalPrice: 159.99,
    tags: 'dress,women,cyberpunk'
  },
  {
    id: '5',
    name: 'Matrix Cargo Pants',
    brand: 'Digital Nomad',
    price: 89.99,
    currency: 'USD',
    size: '32',
    description: 'Tactical cargo pants with multiple pockets and water resistance',
    stock: 75,
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8',
    partnerUrl: 'https://example.com/product-5',
    rating: 5,
    originalPrice: 119.99,
    tags: 'pants,tactical,men'
  }
];
