"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatBDT } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, subtotal } = useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" /> Your Bag ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-center">
            <ShoppingBag className="h-12 w-12 text-slate-300" />
            <p className="text-slate-500">Your bag is empty.</p>
            <Button variant="primary" onClick={closeCart} asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-3">
                  <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-avoras-beige/50 shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-slate-800 line-clamp-2">{item.title}</p>
                      <button onClick={() => removeItem(item.variantId)} className="text-slate-400 hover:text-red-500 shrink-0">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Size: {item.size}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded-full">
                        <button
                          className="p-1.5 disabled:opacity-30"
                          disabled={item.quantity <= 1}
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          className="p-1.5 disabled:opacity-30"
                          disabled={item.quantity >= item.maxStock}
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-slate-800">
                        {formatBDT(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-5 space-y-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800 text-base">{formatBDT(subtotal())}</span>
              </div>
              <p className="text-xs text-slate-500">Shipping & taxes calculated at checkout.</p>
              <Button asChild variant="primary" size="lg" className="w-full" onClick={closeCart}>
                <Link href="/checkout">Checkout</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full" onClick={closeCart}>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
