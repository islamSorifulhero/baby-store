export type ProductVariant = {
  id: string;
  size: string;
  color?: string | null;
  sku: string;
  stock: number;
  priceDelta: number;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  images: string[];
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  ageRange: string;
  material?: string | null;
  isFeatured: boolean;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
};

export type CartItem = {
  productId: string;
  variantId: string;
  title: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
  maxStock: number;
};

export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
export type PaymentMethod = "COD" | "BKASH" | "NAGAD" | "CARD";

export type Order = {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  division: string;
  district: string;
  area: string;
  addressLine: string;
  orderNote?: string;
  createdAt: string;
};
