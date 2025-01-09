import React from 'react';

interface ShimmerProps {
  className?: string;
}

export function Shimmer({ className = '' }: ShimmerProps) {
  return (
    <div className={`relative overflow-hidden bg-dark-grey/30 ${className}`}>
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-dark-grey/30 via-white/10 to-dark-grey/30" />
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-4">
      <Shimmer className="aspect-square rounded-xl" />
      <Shimmer className="h-4 rounded w-2/3" />
      <Shimmer className="h-4 rounded w-1/3" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(count).fill(0).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function BestSellersSkeleton() {
  return (
    <section className="py-20 bg-dark-grey/20">
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <Shimmer className="h-12 rounded w-64 mb-4 md:mb-0" />
          <Shimmer className="h-6 rounded w-96" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Shimmer className="aspect-square rounded-xl" />
        <div className="space-y-6">
          <div className="space-y-4">
            <Shimmer className="h-8 rounded w-3/4" />
            <Shimmer className="h-6 rounded w-1/4" />
          </div>
          <Shimmer className="h-6 rounded w-1/3" />
          <Shimmer className="h-24 rounded" />
          <div className="space-y-3">
            <Shimmer className="h-6 rounded w-1/4" />
            <Shimmer className="h-6 rounded w-1/2" />
          </div>
          <Shimmer className="h-12 rounded w-full" />
        </div>
      </div>
      <div className="mt-16">
        <Shimmer className="h-8 rounded w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
} 