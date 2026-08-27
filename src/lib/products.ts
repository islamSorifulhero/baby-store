import { Product } from "@/types";
import { PRODUCTS, CATEGORIES } from "@/data/mock-products";

/**
 * DATA ACCESS LAYER
 * ------------------
 * This file currently reads from the in-memory mock dataset (src/data/mock-products.ts)
 * so the storefront is fully functional out of the box with zero setup.
 *
 * To switch to the real PostgreSQL database via Prisma, replace the body of each
 * function below with the commented `prisma.*` query shown above it, then delete
 * the mock-data import. The function signatures are already shaped to match what
 * Prisma returns (after a small `.map()` to flatten `category.name` etc).
 */

export type ProductFilters = {
  category?: string;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price-asc" | "price-desc" | "rating";
  query?: string;
};

export async function getAllProducts(filters: ProductFilters = {}): Promise<Product[]> {
  // const products = await prisma.product.findMany({
  //   where: {
  //     isActive: true,
  //     category: filters.category ? { slug: filters.category } : undefined,
  //     price: { gte: filters.minPrice, lte: filters.maxPrice },
  //     variants: filters.size ? { some: { size: filters.size } } : undefined,
  //   },
  //   include: { category: true, variants: true },
  //   orderBy: sortToOrderBy(filters.sort),
  // });

  let result = [...PRODUCTS].filter((p) => p.isActive);

  if (filters.category) {
    result = result.filter((p) => p.categorySlug === filters.category);
  }
  if (filters.size) {
    result = result.filter((p) => p.variants.some((v) => v.size === filters.size));
  }
  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter((p) => p.title.toLowerCase().includes(q));
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return result;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  // const products = await prisma.product.findMany({ where: { isFeatured: true, isActive: true }, include: { category: true, variants: true } });
  return PRODUCTS.filter((p) => p.isFeatured);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  // const product = await prisma.product.findUnique({ where: { slug }, include: { category: true, variants: true } });
  return PRODUCTS.find((p) => p.slug === slug);
}

export async function getRelatedProducts(categorySlug: string, excludeSlug: string): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug && p.slug !== excludeSlug).slice(0, 4);
}

export async function getCategories() {
  // const categories = await prisma.category.findMany();
  return CATEGORIES;
}

export const ALL_SIZES = Array.from(
  new Set(PRODUCTS.flatMap((p) => p.variants.map((v) => v.size)))
);

export const PRICE_BOUNDS = {
  min: Math.min(...PRODUCTS.map((p) => p.price)),
  max: Math.max(...PRODUCTS.map((p) => p.price))
};
