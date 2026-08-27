"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Minus, Plus, Check, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SizeGuideModal } from "@/components/storefront/size-guide-modal";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/types";
import { cn, formatBDT } from "@/lib/utils";
import { toast } from "sonner";

export function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.variants.find((v) => v.stock > 0)?.size ?? null
  );
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  const selectedVariant = product.variants.find((v) => v.size === selectedSize);
  const inStock = selectedVariant ? selectedVariant.stock > 0 : false;
  const maxStock = selectedVariant?.stock ?? 0;

  function handleAddToCart(buyNow = false) {
    if (!selectedVariant) {
      toast.error("Please select a size first.");
      return;
    }
    if (!inStock) {
      toast.error("This size is currently out of stock.");
      return;
    }
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      title: product.title,
      image: product.images[0],
      size: selectedVariant.size,
      price: product.price,
      quantity,
      maxStock: selectedVariant.stock
    });
    if (buyNow) {
      router.push("/checkout");
    } else {
      toast.success("Added to your bag!");
    }
  }

  const discountPct =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
      {/* Gallery */}
      <div>
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-avoras-beige/40 border border-slate-100">
          <Image
            src={product.images[activeImage]}
            alt={product.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {discountPct && (
            <Badge variant="pink" className="absolute top-4 left-4">
              -{discountPct}% OFF
            </Badge>
          )}
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-3 mt-4">
            {product.images.map((img, idx) => (
              <button
                key={img + idx}
                onClick={() => setActiveImage(idx)}
                className={cn(
                  "relative h-20 w-20 rounded-xl overflow-hidden border-2 shrink-0",
                  activeImage === idx ? "border-slate-800" : "border-transparent"
                )}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div>
        <p className="text-sm text-slate-500 uppercase tracking-wide">{product.categoryName}</p>
        <h1 className="font-display text-3xl font-bold text-slate-800 mt-1">{product.title}</h1>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-slate-700">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-slate-400">({product.reviewCount} reviews)</span>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <span className="text-2xl font-bold text-slate-800">{formatBDT(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-lg text-slate-400 line-through">{formatBDT(product.compareAtPrice)}</span>
          )}
        </div>

        <p className="text-slate-600 leading-relaxed mt-5">{product.description}</p>

        {product.material && (
          <p className="text-sm text-slate-500 mt-3">
            <span className="font-medium text-slate-700">Material:</span> {product.material}
          </p>
        )}

        {/* Size selection */}
        <div className="mt-7">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-sm font-medium text-slate-800">
              Size: {selectedSize && <span className="text-slate-500">{selectedSize}</span>}
            </span>
            <SizeGuideModal />
          </div>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                disabled={v.stock === 0}
                onClick={() => {
                  setSelectedSize(v.size);
                  setQuantity(1);
                }}
                className={cn(
                  "px-4 py-2 rounded-xl border text-sm font-medium transition-colors",
                  v.stock === 0
                    ? "border-slate-200 text-slate-300 line-through cursor-not-allowed"
                    : selectedSize === v.size
                    ? "border-slate-800 bg-slate-800 text-white"
                    : "border-slate-300 text-slate-700 hover:border-slate-500"
                )}
              >
                {v.size}
              </button>
            ))}
          </div>
        </div>

        {/* Stock status */}
        <div className="mt-3">
          {inStock ? (
            <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600">
              <Check className="h-4 w-4" /> In Stock ({maxStock} available)
            </span>
          ) : (
            <span className="text-sm text-red-500">Out of Stock for this size</span>
          )}
        </div>

        {/* Quantity */}
        <div className="mt-6">
          <span className="text-sm font-medium text-slate-800 block mb-2.5">Quantity</span>
          <div className="inline-flex items-center border rounded-full">
            <button
              className="p-3 disabled:opacity-30"
              disabled={quantity <= 1}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center font-medium">{quantity}</span>
            <button
              className="p-3 disabled:opacity-30"
              disabled={quantity >= maxStock}
              onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Button size="lg" variant="outline" className="flex-1" disabled={!inStock} onClick={() => handleAddToCart(false)}>
            Add to Cart
          </Button>
          <Button size="lg" variant="primary" className="flex-1" disabled={!inStock} onClick={() => handleAddToCart(true)}>
            Buy Now
          </Button>
        </div>

        {/* Trust row */}
        <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-slate-100">
          <div className="flex flex-col items-center text-center gap-1.5">
            <Truck className="h-5 w-5 text-slate-600" />
            <span className="text-xs text-slate-500">Fast Shipping</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1.5">
            <RotateCcw className="h-5 w-5 text-slate-600" />
            <span className="text-xs text-slate-500">Easy Returns</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1.5">
            <ShieldCheck className="h-5 w-5 text-slate-600" />
            <span className="text-xs text-slate-500">Safe Fabric</span>
          </div>
        </div>
      </div>
    </div>
  );
}
