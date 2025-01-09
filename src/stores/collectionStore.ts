import { create } from 'zustand';

export interface Collection {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  designer: string;
  price: number;
  tags: string[];
  trending: boolean;
}

interface CollectionStore {
  collections: Collection[];
  addCollection: (collection: Collection) => void;
  setCollections: (collections: Collection[]) => void;
}

export const useCollectionStore = create<CollectionStore>((set) => ({
  collections: [
    {
      id: '1',
      title: 'Urban Nomad',
      description: 'Seamless blend of street style and functional design.',
      imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
      designer: 'Marco Rossi',
      price: 249.99,
      tags: ['streetwear', 'urban', 'minimalist'],
      trending: true
    },
    {
      id: '2',
      title: 'Eco Warrior',
      description: 'Sustainable fashion that doesn\'t compromise on style.',
      imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f',
      designer: 'Elena Green',
      price: 189.50,
      tags: ['sustainable', 'eco-friendly', 'organic'],
      trending: true
    },
    {
      id: '3',
      title: 'Tech Fusion',
      description: 'Cutting-edge wearable technology meets high fashion.',
      imageUrl: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a',
      designer: 'Alex Chen',
      price: 299.99,
      tags: ['tech', 'futuristic', 'innovative'],
      trending: true
    }
  ],
  addCollection: (collection) => set((state) => ({ 
    collections: [...state.collections, collection] 
  })),
  setCollections: (collections) => set({ collections })
})); 