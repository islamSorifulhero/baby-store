import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-avoras-blush via-avoras-cream to-avoras-sky">
      <div className="container grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-16 md:py-24">
        <div className="text-center md:text-left">
          <span className="inline-block rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-600 mb-5">
            NEW ARRIVALS FOR NEWBORNS
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 leading-[1.1] text-balance">
            Softest Cotton for Your Little Ones
          </h1>
          <p className="mt-5 text-slate-600 text-base sm:text-lg max-w-md mx-auto md:mx-0">
            Gentle, breathable, and beautifully made baby clothing — designed to keep your baby comfy from their
            very first day.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Button asChild size="lg" variant="primary">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/70">
              <Link href="/products?category=gift-sets">Explore Gift Sets</Link>
            </Button>
          </div>
        </div>

        <div className="relative aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1000"
            alt="Baby wearing soft AVORAS cotton clothing"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
