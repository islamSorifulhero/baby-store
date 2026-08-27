import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { ProductDetailClient } from "@/components/storefront/product-detail-client";
import { ProductGrid } from "@/components/storefront/product-card";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found | AVORAS" };
  return {
    title: `${product.title} | AVORAS`,
    description: product.description
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.categorySlug, product.slug);

  return (
    <div className="container py-10 md:py-14">
      <ProductDetailClient product={product} />

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold text-slate-800 mb-8">You May Also Like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
