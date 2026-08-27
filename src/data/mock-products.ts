import { Product } from "@/types";

export const CATEGORIES = [
  { id: "cat-1", name: "0-3 Months", slug: "0-3-months", imageUrl: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600" },
  { id: "cat-2", name: "3-6 Months", slug: "3-6-months", imageUrl: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=600" },
  { id: "cat-3", name: "Rompers", slug: "rompers", imageUrl: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=600" },
  { id: "cat-4", name: "Gift Sets", slug: "gift-sets", imageUrl: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600" }
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Organic Cotton Onesie Set (Pack of 3)",
    slug: "organic-cotton-onesie-set",
    description:
      "Ultra-soft GOTS-certified organic cotton onesies, gentle on newborn skin. Breathable fabric with envelope neckline for easy dressing. Pack of 3 in soft pastel shades. Machine washable and pre-shrunk for a lasting fit.",
    price: 1450,
    compareAtPrice: 1800,
    images: [
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=900",
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=900",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=900"
    ],
    categoryId: "cat-1",
    categorySlug: "0-3-months",
    categoryName: "0-3 Months",
    ageRange: "0-3M",
    material: "100% Organic Cotton",
    isFeatured: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 128,
    variants: [
      { id: "v1", size: "NB", sku: "AVR-ONESIE-NB", stock: 24, priceDelta: 0 },
      { id: "v2", size: "0-3M", sku: "AVR-ONESIE-03", stock: 40, priceDelta: 0 },
      { id: "v3", size: "3-6M", sku: "AVR-ONESIE-36", stock: 18, priceDelta: 0 }
    ]
  },
  {
    id: "prod-2",
    title: "Bamboo Fiber Sleep Suit",
    slug: "bamboo-fiber-sleep-suit",
    description:
      "Temperature-regulating bamboo fiber sleep suit for undisturbed naps. Hypoallergenic, silky-soft with a two-way zipper for quick diaper changes at night.",
    price: 1250,
    compareAtPrice: null,
    images: [
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=900",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=900"
    ],
    categoryId: "cat-1",
    categorySlug: "0-3-months",
    categoryName: "0-3 Months",
    ageRange: "0-3M",
    material: "Bamboo Viscose",
    isFeatured: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 76,
    variants: [
      { id: "v4", size: "NB", sku: "AVR-SLEEP-NB", stock: 15, priceDelta: 0 },
      { id: "v5", size: "0-3M", sku: "AVR-SLEEP-03", stock: 22, priceDelta: 0 }
    ]
  },
  {
    id: "prod-3",
    title: "Soft Terry Romper - Cloud Print",
    slug: "soft-terry-romper-cloud",
    description:
      "Playful cloud-print romper made from plush terry cotton. Snap buttons at the bottom for effortless diaper access. Perfect for playtime and outings.",
    price: 990,
    compareAtPrice: 1200,
    images: [
      "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=900",
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=901"
    ],
    categoryId: "cat-3",
    categorySlug: "rompers",
    categoryName: "Rompers",
    ageRange: "3-6M",
    material: "Terry Cotton",
    isFeatured: true,
    isActive: true,
    rating: 4.7,
    reviewCount: 54,
    variants: [
      { id: "v6", size: "3-6M", sku: "AVR-ROMP-CLOUD-36", stock: 30, priceDelta: 0 },
      { id: "v7", size: "6-9M", sku: "AVR-ROMP-CLOUD-69", stock: 20, priceDelta: 0 }
    ]
  },
  {
    id: "prod-4",
    title: "Striped Short-Sleeve Romper",
    slug: "striped-short-sleeve-romper",
    description:
      "Classic striped romper in breathable cotton jersey, ideal for warm days. Reinforced stitching for everyday durability and easy machine wash.",
    price: 850,
    compareAtPrice: null,
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=901",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=901"
    ],
    categoryId: "cat-3",
    categorySlug: "rompers",
    categoryName: "Rompers",
    ageRange: "6-9M",
    material: "Cotton Jersey",
    isFeatured: false,
    isActive: true,
    rating: 4.6,
    reviewCount: 32,
    variants: [
      { id: "v8", size: "3-6M", sku: "AVR-ROMP-STR-36", stock: 12, priceDelta: 0 },
      { id: "v9", size: "6-9M", sku: "AVR-ROMP-STR-69", stock: 25, priceDelta: 0 },
      { id: "v10", size: "9-12M", sku: "AVR-ROMP-STR-912", stock: 10, priceDelta: 0 }
    ]
  },
  {
    id: "prod-5",
    title: "Knit Cardigan & Booties Gift Set",
    slug: "knit-cardigan-booties-gift-set",
    description:
      "A beautifully packaged gift set featuring a hand-finished knit cardigan and matching booties. Presented in a keepsake AVORAS gift box - perfect for baby showers.",
    price: 2200,
    compareAtPrice: 2600,
    images: [
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=902",
      "https://images.unsplash.com/photo-1503919005314-30d93d07d825?w=900"
    ],
    categoryId: "cat-4",
    categorySlug: "gift-sets",
    categoryName: "Gift Sets",
    ageRange: "0-6M",
    material: "Cotton Knit",
    isFeatured: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 41,
    variants: [
      { id: "v11", size: "0-3M", sku: "AVR-GIFT-CARD-03", stock: 10, priceDelta: 0 },
      { id: "v12", size: "3-6M", sku: "AVR-GIFT-CARD-36", stock: 8, priceDelta: 0 }
    ]
  },
  {
    id: "prod-6",
    title: "Welcome Baby Essentials Box",
    slug: "welcome-baby-essentials-box",
    description:
      "A complete newborn welcome box with onesies, mittens, cap, and a swaddle wrap - all in organic cotton. The perfect first gift for new parents.",
    price: 2800,
    compareAtPrice: 3200,
    images: [
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=903",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=903"
    ],
    categoryId: "cat-4",
    categorySlug: "gift-sets",
    categoryName: "Gift Sets",
    ageRange: "NB",
    material: "Organic Cotton",
    isFeatured: false,
    isActive: true,
    rating: 4.9,
    reviewCount: 63,
    variants: [{ id: "v13", size: "NB", sku: "AVR-GIFT-BOX-NB", stock: 14, priceDelta: 0 }]
  },
  {
    id: "prod-7",
    title: "Footed Sleepsuit - Pastel Blue",
    slug: "footed-sleepsuit-pastel-blue",
    description:
      "Cozy footed sleepsuit with covered mittens to prevent scratching. Soft interlock cotton keeps little ones warm without overheating.",
    price: 1100,
    compareAtPrice: null,
    images: [
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=904",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=904"
    ],
    categoryId: "cat-2",
    categorySlug: "3-6-months",
    categoryName: "3-6 Months",
    ageRange: "3-6M",
    material: "Interlock Cotton",
    isFeatured: false,
    isActive: true,
    rating: 4.7,
    reviewCount: 28,
    variants: [
      { id: "v14", size: "3-6M", sku: "AVR-FOOT-BLUE-36", stock: 20, priceDelta: 0 },
      { id: "v15", size: "6-9M", sku: "AVR-FOOT-BLUE-69", stock: 16, priceDelta: 0 }
    ]
  },
  {
    id: "prod-8",
    title: "Muslin Swaddle Blanket Set (2-Pack)",
    slug: "muslin-swaddle-blanket-set",
    description:
      "Breathable 100% muslin cotton swaddle blankets, generously sized for snug wrapping. Softens beautifully after every wash.",
    price: 1350,
    compareAtPrice: 1600,
    images: [
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=905",
      "https://images.unsplash.com/photo-1503919005314-30d93d07d826?w=900"
    ],
    categoryId: "cat-1",
    categorySlug: "0-3-months",
    categoryName: "0-3 Months",
    ageRange: "0-3M",
    material: "Muslin Cotton",
    isFeatured: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 47,
    variants: [{ id: "v16", size: "One Size", sku: "AVR-SWADDLE-2PK", stock: 35, priceDelta: 0 }]
  }
];
