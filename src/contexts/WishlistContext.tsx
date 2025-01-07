import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import { toggleWishlist } from '../services/productService';

interface WishlistContextType {
  wishlist: Set<string>;
  isInWishlist: (productId: string) => boolean;
  toggleWishlistItem: (productId: string) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      // Load wishlist from local storage or API
      const savedWishlist = localStorage.getItem(`wishlist_${user.id}`);
      if (savedWishlist) {
        setWishlist(new Set(JSON.parse(savedWishlist)));
      }
    }
  }, [user]);

  const isInWishlist = (productId: string) => wishlist.has(productId);

  const toggleWishlistItem = async (productId: string) => {
    if (!user) return;

    const isAdded = await toggleWishlist(user.id, productId);
    const newWishlist = new Set(wishlist);

    if (isAdded) {
      newWishlist.add(productId);
    } else {
      newWishlist.delete(productId);
    }

    setWishlist(newWishlist);
    localStorage.setItem(
      `wishlist_${user.id}`,
      JSON.stringify(Array.from(newWishlist))
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, isInWishlist, toggleWishlistItem }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
} 