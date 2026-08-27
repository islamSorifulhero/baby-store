import Link from "next/link";
import Image from "next/image";
import { Truck, RotateCcw, Banknote, ShieldCheck } from "lucide-react";

const CATEGORY_CARDS = [
  { name: "0-3 Months", slug: "0-3-months", image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600", tint: "bg-avoras-blush" },
  { name: "3-6 Months", slug: "3-6-months", image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=600", tint: "bg-avoras-sky" },
  { name: "Rompers", slug: "rompers", image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=600", tint: "bg-avoras-beige" },
  { name: "Gift Sets", slug: "gift-sets", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600", tint: "bg-avoras-pink/40" }
];

export function CategoryGrid() {
  return (
    <section className="container py-16 md:py-20">
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl font-bold text-slate-800">Shop by Category</h2>
        <p className="text-slate-500 mt-2">Find exactly the right fit for every stage</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {CATEGORY_CARDS.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products?category=${cat.slug}`}
            className="group block rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`relative aspect-square ${cat.tint}`}>
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="p-4 bg-white text-center">
              <span className="font-medium text-slate-800">{cat.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

const BADGES = [
  { icon: Banknote, title: "Cash on Delivery", desc: "Pay when it arrives" },
  { icon: Truck, title: "Fast Shipping", desc: "Nationwide in 2-4 days" },
  { icon: RotateCcw, title: "Easy Returns", desc: "7-day hassle-free return" },
  { icon: ShieldCheck, title: "Safe Materials", desc: "Hypoallergenic fabrics" }
];

export function TrustBadges() {
  return (
    <section className="bg-avoras-beige/40 py-12 md:py-14">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-6">
        {BADGES.map((b) => (
          <div key={b.title} className="flex flex-col items-center text-center gap-2">
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm">
              <b.icon className="h-5 w-5 text-slate-700" />
            </div>
            <p className="font-medium text-sm text-slate-800">{b.title}</p>
            <p className="text-xs text-slate-500">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
