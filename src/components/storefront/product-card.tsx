import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { formatBDT } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const inStock = product.variants.some((v) => v.stock > 0);
  const discountPct =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-avoras-beige/40 border border-slate-100">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discountPct && <Badge variant="pink">-{discountPct}%</Badge>}
          {!inStock && <Badge variant="danger">Out of Stock</Badge>}
        </div>
      </div>
      <div className="mt-3">
        <p className="text-xs text-slate-500 uppercase tracking-wide">{product.categoryName}</p>
        <h3 className="font-medium text-slate-800 mt-0.5 line-clamp-1">{product.title}</h3>
        <div className="flex items-center gap-1 mt-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs text-slate-500">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="font-semibold text-slate-800">{formatBDT(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-slate-400 line-through">{formatBDT(product.compareAtPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        No products match your filters. Try adjusting them.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
