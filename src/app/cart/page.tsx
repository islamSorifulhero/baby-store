"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container py-24 flex flex-col items-center text-center gap-4">
        <ShoppingBag className="h-14 w-14 text-slate-300" />
        <h1 className="font-display text-2xl font-bold text-slate-800">Your bag is empty</h1>
        <p className="text-slate-500">Looks like you haven't added anything yet.</p>
        <Button asChild variant="primary" size="lg">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  const shippingFee = subtotal() >= 2000 ? 0 : 80;

  return (
    <div className="container py-10 md:py-14">
      <h1 className="font-display text-3xl font-bold text-slate-800 mb-8">Shopping Bag</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.variantId} className="flex gap-4 p-4 rounded-2xl border border-slate-100 bg-white">
              <div className="relative h-24 w-24 rounded-xl overflow-hidden bg-avoras-beige/40 shrink-0">
                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-slate-800">{item.title}</p>
                  <button onClick={() => removeItem(item.variantId)} className="text-slate-400 hover:text-red-500">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-slate-500 mt-1">Size: {item.size}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border rounded-full">
                    <button
                      className="p-2 disabled:opacity-30"
                      disabled={item.quantity <= 1}
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      className="p-2 disabled:opacity-30"
                      disabled={item.quantity >= item.maxStock}
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="font-semibold text-slate-800">{formatBDT(item.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 h-fit sticky top-24">
          <h2 className="font-display text-lg font-semibold text-slate-800 mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatBDT(subtotal())}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span>{shippingFee === 0 ? "Free" : formatBDT(shippingFee)}</span>
            </div>
          </div>
          <div className="border-t border-slate-100 mt-4 pt-4 flex justify-between font-semibold text-slate-800">
            <span>Total</span>
            <span>{formatBDT(subtotal() + shippingFee)}</span>
          </div>
          <Button asChild variant="primary" size="lg" className="w-full mt-6">
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
