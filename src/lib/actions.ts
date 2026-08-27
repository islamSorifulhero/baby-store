"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { CartItem, Order, OrderStatus, Product } from "@/types";
import { addOrder, updateOrderStatus as updateStatus } from "@/lib/orders-store";
import { PRODUCTS } from "@/data/mock-products";
import { generateOrderNumber } from "@/lib/utils";

/**
 * PRODUCTION NOTE:
 * Every function below is written as a Next.js Server Action, callable directly
 * from Client Components with `await placeOrder(formData)`. Swap the in-memory
 * mock read/writes for the equivalent `prisma.*` calls (shown in comments) once
 * DATABASE_URL is configured and `npx prisma migrate dev` has been run.
 */

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Full name is required"),
  customerPhone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Enter a valid Bangladeshi phone number (e.g. 017XXXXXXXX)"),
  customerEmail: z.string().email().optional().or(z.literal("")),
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  area: z.string().min(1, "Area / Thana is required"),
  addressLine: z.string().min(5, "Full address is required"),
  orderNote: z.string().optional(),
  paymentMethod: z.enum(["COD", "BKASH", "NAGAD", "CARD"]),
  bkashTxnId: z.string().optional()
});

export type CheckoutResult =
  | { success: true; orderId: string; orderNumber: string }
  | { success: false; error: string; fieldErrors?: Record<string, string> };

export async function placeOrder(
  cartItems: CartItem[],
  formData: z.infer<typeof checkoutSchema>
): Promise<CheckoutResult> {
  const parsed = checkoutSchema.safeParse(formData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      fieldErrors[issue.path[0] as string] = issue.message;
    });
    return { success: false, error: "Please fix the highlighted fields.", fieldErrors };
  }

  if (!cartItems || cartItems.length === 0) {
    return { success: false, error: "Your cart is empty." };
  }

  if (parsed.data.paymentMethod === "BKASH" && !parsed.data.bkashTxnId) {
    return {
      success: false,
      error: "Please enter your bKash transaction ID.",
      fieldErrors: { bkashTxnId: "bKash Transaction ID is required" }
    };
  }

  // const order = await prisma.order.create({
  //   data: {
  //     orderNumber: generateOrderNumber(),
  //     subtotal, shippingFee, discount, total,
  //     ...parsed.data,
  //     items: { create: cartItems.map(i => ({ productId: i.productId, variantId: i.variantId, titleSnap: i.title, imageSnap: i.image, size: i.size, price: i.price, quantity: i.quantity })) }
  //   }
  // });
  // Also decrement stock:
  // await Promise.all(cartItems.map(i => prisma.productVariant.update({ where: { id: i.variantId }, data: { stock: { decrement: i.quantity } } })));

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shippingFee = subtotal >= 2000 ? 0 : 80;
  const discount = 0;
  const total = subtotal + shippingFee - discount;

  const order: Order = {
    id: `ord-${Date.now()}`,
    orderNumber: generateOrderNumber(),
    items: cartItems,
    subtotal,
    shippingFee,
    discount,
    total,
    status: "PENDING",
    paymentMethod: parsed.data.paymentMethod,
    customerName: parsed.data.customerName,
    customerPhone: parsed.data.customerPhone,
    customerEmail: parsed.data.customerEmail || undefined,
    division: parsed.data.division,
    district: parsed.data.district,
    area: parsed.data.area,
    addressLine: parsed.data.addressLine,
    orderNote: parsed.data.orderNote,
    createdAt: new Date().toISOString()
  };

  addOrder(order);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");

  return { success: true, orderId: order.id, orderNumber: order.orderNumber };
}

export async function updateOrderStatusAction(orderId: string, status: OrderStatus) {
  // await prisma.order.update({ where: { id: orderId }, data: { status } });
  updateStatus(orderId, status);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
  return { success: true };
}

const productSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  compareAtPrice: z.coerce.number().optional(),
  categorySlug: z.string().min(1),
  ageRange: z.string().min(1),
  material: z.string().optional(),
  images: z.string().min(1), // comma-separated URLs from the admin form
  isFeatured: z.coerce.boolean().optional(),
  variants: z.string().min(1) // JSON string: [{size, sku, stock}]
});

export type ProductActionResult =
  | { success: true; productId: string }
  | { success: false; error: string };

export async function createProductAction(formData: FormData): Promise<ProductActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = productSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues.map((i) => i.message).join(", ") };
  }

  let variants;
  try {
    variants = JSON.parse(parsed.data.variants);
  } catch {
    return { success: false, error: "Invalid variant data." };
  }

  // const product = await prisma.product.create({
  //   data: {
  //     title: parsed.data.title, slug: parsed.data.slug, description: parsed.data.description,
  //     price: parsed.data.price, compareAtPrice: parsed.data.compareAtPrice,
  //     images: parsed.data.images.split(",").map(s => s.trim()),
  //     category: { connect: { slug: parsed.data.categorySlug } },
  //     ageRange: parsed.data.ageRange, material: parsed.data.material,
  //     isFeatured: !!parsed.data.isFeatured,
  //     variants: { create: variants }
  //   }
  // });

  const newProduct: Product = {
    id: `prod-${Date.now()}`,
    title: parsed.data.title,
    slug: parsed.data.slug,
    description: parsed.data.description,
    price: parsed.data.price,
    compareAtPrice: parsed.data.compareAtPrice ?? null,
    images: parsed.data.images.split(",").map((s) => s.trim()),
    categoryId: "cat-manual",
    categorySlug: parsed.data.categorySlug,
    categoryName: parsed.data.categorySlug,
    ageRange: parsed.data.ageRange,
    material: parsed.data.material,
    isFeatured: !!parsed.data.isFeatured,
    isActive: true,
    rating: 5,
    reviewCount: 0,
    variants: variants.map((v: any, idx: number) => ({
      id: `v-${Date.now()}-${idx}`,
      size: v.size,
      sku: v.sku,
      stock: Number(v.stock) || 0,
      priceDelta: 0
    }))
  };

  PRODUCTS.push(newProduct);
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");

  return { success: true, productId: newProduct.id };
}

export async function updateProductAction(productId: string, formData: FormData): Promise<ProductActionResult> {
  const idx = PRODUCTS.findIndex((p) => p.id === productId);
  if (idx === -1) return { success: false, error: "Product not found." };

  const raw = Object.fromEntries(formData.entries());
  const parsed = productSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues.map((i) => i.message).join(", ") };
  }

  let variants;
  try {
    variants = JSON.parse(parsed.data.variants);
  } catch {
    return { success: false, error: "Invalid variant data." };
  }

  // await prisma.product.update({ where: { id: productId }, data: { ... } });

  PRODUCTS[idx] = {
    ...PRODUCTS[idx],
    title: parsed.data.title,
    slug: parsed.data.slug,
    description: parsed.data.description,
    price: parsed.data.price,
    compareAtPrice: parsed.data.compareAtPrice ?? null,
    images: parsed.data.images.split(",").map((s) => s.trim()),
    categorySlug: parsed.data.categorySlug,
    ageRange: parsed.data.ageRange,
    material: parsed.data.material,
    isFeatured: !!parsed.data.isFeatured,
    variants: variants.map((v: any, i: number) => ({
      id: v.id || `v-${Date.now()}-${i}`,
      size: v.size,
      sku: v.sku,
      stock: Number(v.stock) || 0,
      priceDelta: 0
    }))
  };

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${parsed.data.slug}`);

  return { success: true, productId };
}

export async function deleteProductAction(productId: string) {
  // await prisma.product.delete({ where: { id: productId } });
  const idx = PRODUCTS.findIndex((p) => p.id === productId);
  if (idx !== -1) PRODUCTS.splice(idx, 1);
  revalidatePath("/admin/products");
  revalidatePath("/products");
  return { success: true };
}
