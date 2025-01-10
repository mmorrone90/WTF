import { ProductCategory, PRODUCT_CATEGORIES } from '../types/product-categories';

export function findCategory(categoryId: string): ProductCategory | undefined {
  function searchCategory(categories: ProductCategory[]): ProductCategory | undefined {
    for (const category of categories) {
      if (category.id === categoryId) return category;
      if (category.subcategories) {
        const found = searchCategory(category.subcategories);
        if (found) return found;
      }
    }
    return undefined;
  }

  return searchCategory(PRODUCT_CATEGORIES);
}

export function getCategoryPath(categoryId: string): ProductCategory[] {
  function findPath(categories: ProductCategory[], path: ProductCategory[] = []): ProductCategory[] | null {
    for (const category of categories) {
      const newPath = [...path, category];
      if (category.id === categoryId) return newPath;
      if (category.subcategories) {
        const found = findPath(category.subcategories, newPath);
        if (found) return found;
      }
    }
    return null;
  }

  return findPath(PRODUCT_CATEGORIES) || [];
}

export function getCategoryBreadcrumb(categoryId: string): string {
  const path = getCategoryPath(categoryId);
  return path.map(cat => cat.name).join(' > ');
}

export function getSizeSystem(categoryId: string) {
  const category = findCategory(categoryId);
  if (!category) return null;
  return category.sizeSystem;
}

export function getAvailableSizes(categoryId: string, gender?: 'male' | 'female' | 'unisex') {
  const sizeSystem = getSizeSystem(categoryId);
  if (!sizeSystem) return [];

  // For categories that don't need gender differentiation
  if (!['tops', 'bottoms', 'outerwear'].includes(categoryId)) {
    return sizeSystem.sizes;
  }

  // Return gender-specific sizes if gender is provided
  if (gender) {
    return sizeSystem.sizes;
  }

  return [];
}

export function formatSize(categoryId: string, sizeValue: string): string {
  const sizeSystem = getSizeSystem(categoryId);
  if (!sizeSystem) return sizeValue;
  
  const size = sizeSystem.sizes.find(s => s.value === sizeValue);
  if (!size) return sizeValue;
  
  return size.label;
}

export function getAllCategories(includeSubcategories = true): ProductCategory[] {
  function flattenCategories(categories: ProductCategory[]): ProductCategory[] {
    return categories.reduce((acc: ProductCategory[], category) => {
      acc.push(category);
      if (includeSubcategories && category.subcategories) {
        acc.push(...flattenCategories(category.subcategories));
      }
      return acc;
    }, []);
  }

  return flattenCategories(PRODUCT_CATEGORIES);
}

export function validateSize(categoryId: string, sizeValue: string): boolean {
  const sizeSystem = getSizeSystem(categoryId);
  if (!sizeSystem) return false;
  return sizeSystem.sizes.some(s => s.value === sizeValue);
}

export function getNextSize(categoryId: string, currentSize: string): string | null {
  const sizeSystem = getSizeSystem(categoryId);
  if (!sizeSystem) return null;

  const currentSizeObj = sizeSystem.sizes.find(s => s.value === currentSize);
  if (!currentSizeObj) return null;

  const nextSize = sizeSystem.sizes.find(s => s.order === currentSizeObj.order + 1);
  return nextSize?.value || null;
}

export function getPreviousSize(categoryId: string, currentSize: string): string | null {
  const sizeSystem = getSizeSystem(categoryId);
  if (!sizeSystem) return null;

  const currentSizeObj = sizeSystem.sizes.find(s => s.value === currentSize);
  if (!currentSizeObj) return null;

  const prevSize = sizeSystem.sizes.find(s => s.order === currentSizeObj.order - 1);
  return prevSize?.value || null;
}

export function getSizeMeasurements(categoryId: string, sizeValue: string, gender?: 'male' | 'female' | 'unisex'): Record<string, string> | null {
  const sizeSystem = getSizeSystem(categoryId);
  if (!sizeSystem) return null;

  const size = sizeSystem.sizes.find(s => s.value === sizeValue);
  if (!size || !size.measurements) return null;

  // For categories that don't need gender differentiation
  if (!['tops', 'bottoms', 'outerwear'].includes(categoryId)) {
    return size.measurements as Record<string, string>;
  }

  // Return gender-specific measurements if gender is provided
  if (gender && typeof size.measurements === 'object' && 'male' in size.measurements) {
    if (gender === 'unisex') {
      // For unisex, return male measurements as default
      const maleMeasurements = size.measurements.male;
      return maleMeasurements && typeof maleMeasurements === 'object'
        ? maleMeasurements as Record<string, string>
        : null;
    }
    const genderMeasurements = size.measurements[gender];
    return genderMeasurements && typeof genderMeasurements === 'object'
      ? genderMeasurements as Record<string, string>
      : null;
  }

  return null;
} 