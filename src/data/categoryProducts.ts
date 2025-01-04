interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface CategoryData {
  [key: string]: Product[];
}

export const categoryProducts: CategoryData = {
  "Fashion Brands": [
    { id: "fb1", name: "Designer Blazer", image: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac", price: 599 },
    { id: "fb2", name: "Luxury Dress", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d", price: 799 },
    { id: "fb3", name: "Premium Coat", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b", price: 899 },
    { id: "fb4", name: "Signature Bag", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3", price: 1299 }
  ],
  "Streetwear": [
    { id: "sw1", name: "Urban Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7", price: 129 },
    { id: "sw2", name: "Graphic Tee", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c", price: 49 },
    { id: "sw3", name: "Cargo Pants", image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8", price: 89 },
    { id: "sw4", name: "Street Cap", image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346", price: 39 }
  ],
  "Sport": [
    { id: "sp1", name: "Performance Jacket", image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974", price: 159 },
    { id: "sp2", name: "Training Shorts", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f", price: 49 },
    { id: "sp3", name: "Sport Bra", image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2", price: 39 },
    { id: "sp4", name: "Compression Tights", image: "https://images.unsplash.com/photo-1506126279646-a697353d3166", price: 69 }
  ],
  "Shoes": [
    { id: "sh1", name: "Running Sneakers", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", price: 129 },
    { id: "sh2", name: "Designer Boots", image: "https://images.unsplash.com/photo-1542280756-74b2f55e73ab", price: 249 },
    { id: "sh3", name: "Classic Loafers", image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509", price: 179 },
    { id: "sh4", name: "Sport Trainers", image: "https://images.unsplash.com/photo-1539185441755-769473a23570", price: 159 }
  ],
  "Accessories": [
    { id: "ac1", name: "Designer Watch", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314", price: 299 },
    { id: "ac2", name: "Leather Wallet", image: "https://images.unsplash.com/photo-1627123424574-724758594e93", price: 89 },
    { id: "ac3", name: "Sunglasses", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083", price: 159 },
    { id: "ac4", name: "Silver Necklace", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f", price: 129 }
  ]
};