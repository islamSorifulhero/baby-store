import Link from "next/link";
import { Facebook, Instagram, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-100 bg-avoras-beige/50">
      <div className="container py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-2xl font-bold text-slate-800 mb-3">AVORAS</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Softest cotton for your little ones. Thoughtfully designed baby clothing, made to keep newborns
            comfortable, safe, and stylish.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="p-2 rounded-full bg-white border border-slate-200 hover:bg-avoras-pink/30 transition">
              <Facebook className="h-4 w-4 text-slate-700" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white border border-slate-200 hover:bg-avoras-pink/30 transition">
              <Instagram className="h-4 w-4 text-slate-700" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-800 mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="/products?category=0-3-months" className="hover:text-slate-900">0-3 Months</Link></li>
            <li><Link href="/products?category=3-6-months" className="hover:text-slate-900">3-6 Months</Link></li>
            <li><Link href="/products?category=rompers" className="hover:text-slate-900">Rompers</Link></li>
            <li><Link href="/products?category=gift-sets" className="hover:text-slate-900">Gift Sets</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-800 mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="#" className="hover:text-slate-900">Shipping & Delivery</Link></li>
            <li><Link href="#" className="hover:text-slate-900">Returns & Exchanges</Link></li>
            <li><Link href="#" className="hover:text-slate-900">Size Guide</Link></li>
            <li><Link href="#" className="hover:text-slate-900">Track Order</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-800 mb-3">Get in Touch</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +880 1XXX-XXXXXX</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@avoras.com</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 py-5">
        <p className="text-center text-xs text-slate-500">
          © {new Date().getFullYear()} AVORAS. All rights reserved. Made with love for little ones.
        </p>
      </div>
    </footer>
  );
}
