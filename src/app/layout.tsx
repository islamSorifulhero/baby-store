import type { Metadata } from "next";
import { Poppins, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/storefront/site-chrome";
import { Providers } from "@/components/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: "AVORAS — Softest Cotton for Your Little Ones",
  description:
    "AVORAS is a premium baby clothing brand offering soft, safe, and stylish essentials for newborns and infants. Cash on delivery available across Bangladesh.",
  keywords: ["baby clothes", "newborn clothing", "baby romper", "AVORAS", "Bangladesh baby shop"]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${fraunces.variable}`}>
      <body className="font-sans">
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
