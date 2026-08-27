import { getAllProducts, ALL_SIZES } from "@/lib/products";
import { ProductGrid } from "@/components/storefront/product-card";
import { ProductFiltersBar } from "@/components/storefront/product-filters";

export const metadata = { title: "Shop All Products | AVORAS" };

export default async function ProductsPage({
  searchParams
}: {
  searchParams: { category?: string; size?: string; minPrice?: string; maxPrice?: string; sort?: string };
}) {
  const products = await getAllProducts({
    category: searchParams.category,
    size: searchParams.size,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    sort: (searchParams.sort as any) ?? "newest"
  });

  return (
    <div className="container py-10 md:py-14">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-slate-800">Shop All Products</h1>
        <p className="text-slate-500 mt-2">{products.length} products found</p>
      </div>

      <ProductFiltersBar sizes={ALL_SIZES} />
      <ProductGrid products={products} />
    </div>
  );
}
