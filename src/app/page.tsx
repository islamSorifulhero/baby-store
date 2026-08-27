import Link from "next/link";
import { Hero } from "@/components/storefront/hero";
import { CategoryGrid, TrustBadges } from "@/components/storefront/category-trust";
import { ProductGrid } from "@/components/storefront/product-card";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/lib/products";

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <>
      <Hero />
      <TrustBadges />
      <CategoryGrid />

      <section className="container py-16 md:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-800">Featured Products</h2>
            <p className="text-slate-500 mt-2">Hand-picked favorites, loved by parents</p>
          </div>
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link href="/products">View All</Link>
          </Button>
        </div>
        <ProductGrid products={featured} />
        <div className="sm:hidden mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </section>

      <section className="bg-avoras-blush/40 py-16">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-slate-800">Join the AVORAS Family</h2>
          <p className="text-slate-600 mt-3">
            Get early access to new arrivals, exclusive gift-set discounts, and parenting tips — straight to your
            inbox.
          </p>
          <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-11 rounded-full border border-slate-300 bg-white px-5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button type="submit" variant="primary">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
