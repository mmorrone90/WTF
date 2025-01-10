import { ProductCategory, PRODUCT_CATEGORIES } from '../types/product-categories';

export function findCategory(categoryId: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES[categoryId];
}

export function getCategoryPath(categoryId: string): ProductCategory[] {
  const category = PRODUCT_CATEGORIES[categoryId];
  return category ? [category] : [];
}

export function getCategoryBreadcrumb(categoryId: string): string {
  const category = PRODUCT_CATEGORIES[categoryId];
  return category ? category.label : '';
}

export function getSizeSystem(categoryId: string) {
  const category = findCategory(categoryId);
  if (!category) return null;
  return { sizes: category.sizes };
}

export function getAvailableSizes(categoryId: string) {
  const category = findCategory(categoryId);
  return category ? category.sizes : [];
}

export function formatSize(categoryId: string, sizeValue: string): string {
  const category = findCategory(categoryId);
  if (!category) return sizeValue;
  
  const size = category.sizes.find(s => s.value === sizeValue);
  if (!size) return sizeValue;
  
  return size.label;
}

export function getAllCategories(): ProductCategory[] {
  return Object.values(PRODUCT_CATEGORIES);
}

export function validateSize(categoryId: string, sizeValue: string): boolean {
  const category = findCategory(categoryId);
  if (!category) return false;
  return category.sizes.some(s => s.value === sizeValue);
}

export function getNextSize(categoryId: string, currentSize: string): string | null {
  const category = findCategory(categoryId);
  if (!category) return null;

  const currentSizeObj = category.sizes.find(s => s.value === currentSize);
  if (!currentSizeObj) return null;

  const nextSize = category.sizes.find(s => s.order === currentSizeObj.order + 1);
  return nextSize?.value || null;
}

export function getPreviousSize(categoryId: string, currentSize: string): string | null {
  const category = findCategory(categoryId);
  if (!category) return null;

  const currentSizeObj = category.sizes.find(s => s.value === currentSize);
  if (!currentSizeObj) return null;

  const prevSize = category.sizes.find(s => s.order === currentSizeObj.order - 1);
  return prevSize?.value || null;
} 