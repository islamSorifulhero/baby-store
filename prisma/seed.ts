import { PrismaClient } from "@prisma/client";
import { createHash } from "crypto";

const prisma = new PrismaClient();

// NOTE: For production, replace this with a proper bcrypt/argon2 hash
// (e.g. `npm i bcryptjs` and use bcrypt.hashSync(pw, 10)). SHA-256 is used
// here only so the seed script has zero extra dependencies out of the box.
function hash(pw: string) {
  return createHash("sha256").update(pw).digest("hex");
}

async function main() {
  console.log("Seeding AVORAS database...");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      name: "AVORAS Admin",
      email: "admin@avoras.com",
      passwordHash: hash("admin123"),
      role: "ADMIN"
    }
  });

  const categories = await Promise.all([
    prisma.category.create({
      data: { name: "0-3 Months", slug: "0-3-months", description: "Newborn essentials", imageUrl: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600" }
    }),
    prisma.category.create({
      data: { name: "3-6 Months", slug: "3-6-months", description: "Growing baby wear", imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600" }
    }),
    prisma.category.create({
      data: { name: "Rompers", slug: "rompers", description: "Comfy everyday rompers", imageUrl: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=601" }
    }),
    prisma.category.create({
      data: { name: "Gift Sets", slug: "gift-sets", description: "Curated baby gift sets", imageUrl: "https://images.unsplash.com/photo-1544880504-6b48d9293e8?w=600" }
    })
  ]);

  const [c03, c36, rompers, giftSets] = categories;

  const products = [
    {
      title: "Organic Cotton Onesie Set (Pack of 3)",
      slug: "organic-cotton-onesie-set",
      description:
        "Ultra-soft GOTS-certified organic cotton onesies, gentle on newborn skin. Breathable fabric with envelope neckline for easy dressing. Pack of 3 in soft pastel shades.",
      price: 1450,
      compareAtPrice: 1800,
      images: [
        "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800",
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800"
      ],
      categoryId: c03.id,
      ageRange: "0-3M",
      material: "100% Organic Cotton",
      isFeatured: true,
      rating: 4.9,
      reviewCount: 128,
      variants: [
        { size: "NB", sku: "AVR-ONESIE-NB", stock: 24 },
        { size: "0-3M", sku: "AVR-ONESIE-03", stock: 40 },
        { size: "3-6M", sku: "AVR-ONESIE-36", stock: 18 }
      ]
    },
    {
      title: "Bamboo Fiber Sleep Suit",
      slug: "bamboo-fiber-sleep-suit",
      description:
        "Temperature-regulating bamboo fiber sleep suit for undisturbed naps. Hypoallergenic, silky-soft with a two-way zipper for quick diaper changes.",
      price: 1250,
      compareAtPrice: null,
      images: [
        "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800",
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800"
      ],
      categoryId: c03.id,
      ageRange: "0-3M",
      material: "Bamboo Viscose",
      isFeatured: true,
      rating: 4.8,
      reviewCount: 76,
      variants: [
        { size: "NB", sku: "AVR-SLEEP-NB", stock: 15 },
        { size: "0-3M", sku: "AVR-SLEEP-03", stock: 22 }
      ]
    },
    {
      title: "Soft Terry Romper - Cloud Print",
      slug: "soft-terry-romper-cloud",
      description:
        "Playful cloud-print romper made from plush terry cotton. Snap buttons at the bottom for effortless diaper access. Perfect for playtime and outings.",
      price: 990,
      compareAtPrice: 1200,
      images: [
        "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=800",
        "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=802"
      ],
      categoryId: rompers.id,
      ageRange: "3-6M",
      material: "Terry Cotton",
      isFeatured: true,
      rating: 4.7,
      reviewCount: 54,
      variants: [
        { size: "3-6M", sku: "AVR-ROMP-CLOUD-36", stock: 30 },
        { size: "6-9M", sku: "AVR-ROMP-CLOUD-69", stock: 20 }
      ]
    },
    {
      title: "Striped Short-Sleeve Romper",
      slug: "striped-short-sleeve-romper",
      description:
        "Classic striped romper in breathable cotton jersey, ideal for warm days. Reinforced stitching for everyday durability and easy machine wash.",
      price: 850,
      compareAtPrice: null,
      images: [
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=802",
        "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=802"
      ],
      categoryId: rompers.id,
      ageRange: "6-9M",
      material: "Cotton Jersey",
      isFeatured: false,
      rating: 4.6,
      reviewCount: 32,
      variants: [
        { size: "3-6M", sku: "AVR-ROMP-STR-36", stock: 12 },
        { size: "6-9M", sku: "AVR-ROMP-STR-69", stock: 25 },
        { size: "9-12M", sku: "AVR-ROMP-STR-912", stock: 10 }
      ]
    },
    {
      title: "Knit Cardigan & Booties Gift Set",
      slug: "knit-cardigan-booties-gift-set",
      description:
        "A beautifully packaged gift set featuring a hand-finished knit cardigan and matching booties. Presented in a keepsake AVORAS gift box - perfect for baby showers.",
      price: 2200,
      compareAtPrice: 2600,
      images: [
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=802",
        "https://images.unsplash.com/photo-1503919005314-30d93d07d825?w=800"
      ],
      categoryId: giftSets.id,
      ageRange: "0-6M",
      material: "Cotton Knit",
      isFeatured: true,
      rating: 5.0,
      reviewCount: 41,
      variants: [
        { size: "0-3M", sku: "AVR-GIFT-CARD-03", stock: 10 },
        { size: "3-6M", sku: "AVR-GIFT-CARD-36", stock: 8 }
      ]
    },
    {
      title: "Welcome Baby Essentials Box",
      slug: "welcome-baby-essentials-box",
      description:
        "A complete newborn welcome box with onesies, mittens, cap, and a swaddle wrap - all in organic cotton. The perfect first gift for new parents.",
      price: 2800,
      compareAtPrice: 3200,
      images: [
        "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=803",
        "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=803"
      ],
      categoryId: giftSets.id,
      ageRange: "NB",
      material: "Organic Cotton",
      isFeatured: false,
      rating: 4.9,
      reviewCount: 63,
      variants: [{ size: "NB", sku: "AVR-GIFT-BOX-NB", stock: 14 }]
    },
    {
      title: "Footed Sleepsuit - Pastel Blue",
      slug: "footed-sleepsuit-pastel-blue",
      description:
        "Cozy footed sleepsuit with covered mittens to prevent scratching. Soft interlock cotton keeps little ones warm without overheating.",
      price: 1100,
      compareAtPrice: null,
      images: [
        "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=804",
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=804"
      ],
      categoryId: c36.id,
      ageRange: "3-6M",
      material: "Interlock Cotton",
      isFeatured: false,
      rating: 4.7,
      reviewCount: 28,
      variants: [
        { size: "3-6M", sku: "AVR-FOOT-BLUE-36", stock: 20 },
        { size: "6-9M", sku: "AVR-FOOT-BLUE-69", stock: 16 }
      ]
    },
    {
      title: "Muslin Swaddle Blanket Set (2-Pack)",
      slug: "muslin-swaddle-blanket-set",
      description:
        "Breathable 100% muslin cotton swaddle blankets, generously sized for snug wrapping. Softens beautifully after every wash.",
      price: 1350,
      compareAtPrice: 1600,
      images: [
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=805",
        "https://images.unsplash.com/photo-1503919005314-30d93d07d826?w=800"
      ],
      categoryId: c03.id,
      ageRange: "0-3M",
      material: "Muslin Cotton",
      isFeatured: true,
      rating: 4.8,
      reviewCount: 47,
      variants: [{ size: "One Size", sku: "AVR-SWADDLE-2PK", stock: 35 }]
    }
  ];

  for (const p of products) {
    const { variants, ...productData } = p;
    await prisma.product.create({
      data: {
        ...productData,
        variants: { create: variants }
      }
    });
  }

  console.log(`Seeded ${products.length} products across ${categories.length} categories.`);
  console.log(`Admin login -> email: admin@avoras.com / password: admin123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
