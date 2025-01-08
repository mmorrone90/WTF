import { Product as DbProduct, ProductImage, Partner } from '../types/database';

// Mock Partners
const partners: Partner[] = [
  {
    id: 'p1',
    business_name: 'CyberStyle',
    phone: '+1234567890',
    website_url: 'https://example.com/cyberstyle',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'p2',
    business_name: 'NeoTokyo',
    phone: '+1234567891',
    website_url: 'https://example.com/neotokyo',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'p3',
    business_name: 'Digital Couture',
    phone: '+1234567892',
    website_url: 'https://example.com/digitalcouture',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'p4',
    business_name: 'Future Fits',
    phone: '+1234567893',
    website_url: 'https://example.com/futurefits',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'p5',
    business_name: 'Quantum Fashion',
    phone: '+1234567894',
    website_url: 'https://example.com/quantumfashion',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Mock Product Images
const productImages: Record<string, ProductImage[]> = {
  '1': [
    {
      id: 'img1',
      product_id: '1',
      image_url: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3',
      is_primary: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'img2',
      product_id: '1',
      image_url: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923',
      is_primary: false,
      created_at: new Date().toISOString()
    }
  ],
  '2': [
    {
      id: 'img3',
      product_id: '2',
      image_url: 'https://images.unsplash.com/photo-1542280756-74b2f55e73ab',
      is_primary: true,
      created_at: new Date().toISOString()
    }
  ],
  '3': [
    {
      id: 'img4',
      product_id: '3',
      image_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
      is_primary: true,
      created_at: new Date().toISOString()
    }
  ],
  '4': [
    {
      id: 'img5',
      product_id: '4',
      image_url: 'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139',
      is_primary: true,
      created_at: new Date().toISOString()
    }
  ],
  '5': [
    {
      id: 'img6',
      product_id: '5',
      image_url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
      is_primary: true,
      created_at: new Date().toISOString()
    }
  ],
  '6': [
    {
      id: 'img7',
      product_id: '6',
      image_url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
      is_primary: true,
      created_at: new Date().toISOString()
    }
  ],
  '7': [
    {
      id: 'img8',
      product_id: '7',
      image_url: 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab',
      is_primary: true,
      created_at: new Date().toISOString()
    }
  ],
  '8': [
    {
      id: 'img9',
      product_id: '8',
      image_url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990',
      is_primary: true,
      created_at: new Date().toISOString()
    }
  ],
  '9': [
    {
      id: 'img10',
      product_id: '9',
      image_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477',
      is_primary: true,
      created_at: new Date().toISOString()
    }
  ],
  '10': [
    {
      id: 'img11',
      product_id: '10',
      image_url: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7',
      is_primary: true,
      created_at: new Date().toISOString()
    }
  ]
};

// Mock Products
const products: (DbProduct & { partners: Partner, product_images: ProductImage[] })[] = [
  {
    id: '1',
    name: 'Tech Wear Jacket',
    description: 'Advanced tech wear jacket with multiple pockets and weather resistance',
    size: 'L',
    price: 189.99,
    currency: 'USD',
    partner_id: 'p1',
    category_id: 'c1',
    stock: 50,
    metadata: { material: 'Waterproof Nylon', color: 'Black' },
    tags: 'jacket,tech wear,unisex',
    created_at: new Date().toISOString(),
    partners: partners[0],
    product_images: productImages['1']
  },
  {
    id: '2',
    name: 'Urban Combat Boots',
    description: 'Durable urban combat boots with advanced grip technology',
    size: '42',
    price: 159.99,
    currency: 'USD',
    partner_id: 'p2',
    category_id: 'c2',
    stock: 30,
    metadata: { material: 'Premium Leather', color: 'Black' },
    tags: 'boots,footwear,unisex',
    created_at: new Date().toISOString(),
    partners: partners[1],
    product_images: productImages['2']
  },
  {
    id: '3',
    name: 'Neon Dreams Hoodie',
    description: 'Comfortable hoodie with neon accents and reflective details',
    size: 'M',
    price: 79.99,
    currency: 'USD',
    partner_id: 'p3',
    category_id: 'c3',
    stock: 100,
    metadata: { material: 'Organic Cotton', color: 'Black/Neon' },
    tags: 'hoodie,streetwear,unisex',
    created_at: new Date().toISOString(),
    partners: partners[2],
    product_images: productImages['3']
  },
  {
    id: '4',
    name: 'Holographic Crop Top',
    description: 'Stunning holographic crop top that changes color under different lighting',
    size: 'S',
    price: 49.99,
    currency: 'USD',
    partner_id: 'p4',
    category_id: 'c4',
    stock: 75,
    metadata: { material: 'Holographic Fabric', color: 'Multi' },
    tags: 'top,crop top,women',
    created_at: new Date().toISOString(),
    partners: partners[3],
    product_images: productImages['4']
  },
  {
    id: '5',
    name: 'LED Light Sneakers',
    description: 'Futuristic sneakers with programmable LED lights and wireless charging',
    size: '41',
    price: 199.99,
    currency: 'USD',
    partner_id: 'p5',
    category_id: 'c2',
    stock: 25,
    metadata: { material: 'Synthetic Mesh', color: 'White/LED' },
    tags: 'shoes,footwear,unisex,led',
    created_at: new Date().toISOString(),
    partners: partners[4],
    product_images: productImages['5']
  },
  {
    id: '6',
    name: 'Smart Cargo Pants',
    description: 'Tactical cargo pants with built-in heating elements and phone charging pocket',
    size: '32',
    price: 149.99,
    currency: 'USD',
    partner_id: 'p1',
    category_id: 'c5',
    stock: 40,
    metadata: { material: 'Tech Cotton Blend', color: 'Olive' },
    tags: 'pants,cargo,men,smart clothing',
    created_at: new Date().toISOString(),
    partners: partners[0],
    product_images: productImages['6']
  },
  {
    id: '7',
    name: 'Digital Camo Backpack',
    description: 'Weather-proof backpack with digital display and solar charging panel',
    size: 'ONE SIZE',
    price: 129.99,
    currency: 'USD',
    partner_id: 'p2',
    category_id: 'c6',
    stock: 60,
    metadata: { material: 'Ballistic Nylon', color: 'Digital Camo' },
    tags: 'accessories,backpack,unisex,tech',
    created_at: new Date().toISOString(),
    partners: partners[1],
    product_images: productImages['7']
  },
  {
    id: '8',
    name: 'Cyberpunk Dress',
    description: 'Elegant dress with fiber optic threading and touch-sensitive panels',
    size: 'M',
    price: 299.99,
    currency: 'USD',
    partner_id: 'p3',
    category_id: 'c7',
    stock: 15,
    metadata: { material: 'Smart Fabric', color: 'Black/RGB' },
    tags: 'dress,women,evening wear,led',
    created_at: new Date().toISOString(),
    partners: partners[2],
    product_images: productImages['8']
  },
  {
    id: '9',
    name: 'AR Visor Beanie',
    description: 'Warm beanie with built-in AR display and bone conduction audio',
    size: 'ONE SIZE',
    price: 89.99,
    currency: 'USD',
    partner_id: 'p4',
    category_id: 'c8',
    stock: 45,
    metadata: { material: 'Merino Wool Blend', color: 'Gray' },
    tags: 'accessories,headwear,unisex,ar',
    created_at: new Date().toISOString(),
    partners: partners[3],
    product_images: productImages['9']
  },
  {
    id: '10',
    name: 'Quantum Phase Jacket',
    description: 'Color-shifting jacket with adaptive temperature control',
    size: 'XL',
    price: 399.99,
    currency: 'USD',
    partner_id: 'p5',
    category_id: 'c1',
    stock: 10,
    metadata: { material: 'Quantum Fabric', color: 'Iridescent' },
    tags: 'jacket,outerwear,unisex,luxury',
    created_at: new Date().toISOString(),
    partners: partners[4],
    product_images: productImages['10']
  }
];

type DbProductWithRelations = DbProduct & { partners: Partner, product_images: ProductImage[] };

class MockQueryBuilder {
  private table: string;
  private query: string;
  private filters: Record<string, any>;

  constructor(table: string, query: string) {
    this.table = table;
    this.query = query;
    this.filters = {};
  }

  eq(field: string, value: any): MockQueryBuilder {
    this.filters[field] = value;
    return this;
  }

  private async execute(): Promise<DbProductWithRelations[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));

    if (this.table === 'products') {
      let result = [...products];
      
      // Apply filters
      Object.entries(this.filters).forEach(([field, value]) => {
        result = result.filter(item => item[field as keyof DbProductWithRelations] === value);
      });

      return result;
    }

    return [];
  }

  async single(): Promise<{ data: DbProductWithRelations | null, error: Error | null }> {
    try {
      const result = await this.execute();
      return {
        data: result[0] || null,
        error: null
      };
    } catch (err) {
      return {
        data: null,
        error: err as Error
      };
    }
  }

  async order(field: string): Promise<{ data: DbProductWithRelations[], error: Error | null }> {
    try {
      const result = await this.execute();
      
      // Sort by field
      result.sort((a, b) => {
        const aValue = a[field as keyof DbProductWithRelations];
        const bValue = b[field as keyof DbProductWithRelations];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue);
        }
        return 0;
      });

      return {
        data: result,
        error: null
      };
    } catch (err) {
      return {
        data: [],
        error: err as Error
      };
    }
  }
}

interface MockDb {
  from: (table: string) => {
    select: (query: string) => MockQueryBuilder;
  };
}

export const mockDb: MockDb = {
  from: (table: string) => ({
    select: (query: string) => new MockQueryBuilder(table, query)
  })
}; 