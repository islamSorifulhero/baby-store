"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "0-3 Months", href: "/products?category=0-3-months" },
  { label: "3-6 Months", href: "/products?category=3-6-months" },
  { label: "Rompers", href: "/products?category=rompers" },
  { label: "Gift Sets", href: "/products?category=gift-sets" },
  { label: "All Products", href: "/products" }
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-avoras-cream/90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <button className="md:hidden p-2 -ml-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link href="/" className="font-display text-2xl font-bold tracking-tight text-slate-800">
          AVORAS
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
            <Search className="h-5 w-5 text-slate-700" />
          </Button>
          <Button variant="ghost" size="icon" onClick={openCart} className="relative">
            <ShoppingBag className="h-5 w-5 text-slate-700" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-avoras-pink text-[11px] font-semibold text-slate-800">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-avoras-cream">
          <nav className="container flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-sm font-medium text-slate-700 border-b border-slate-100 last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
