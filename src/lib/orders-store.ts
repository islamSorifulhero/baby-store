import { Order, OrderStatus } from "@/types";

/**
 * In production, replace this whole module with Prisma queries against the
 * `Order` / `OrderItem` models in prisma/schema.prisma, e.g.:
 *
 *   export async function createOrder(data) {
 *     return prisma.order.create({ data: { ...data, items: { create: data.items } } });
 *   }
 *
 * For this scaffold we keep orders in a server-side in-memory array (module-level
 * singleton, survives across requests within the same server process) so
 * Add-to-cart -> Checkout -> Admin Order Management works end-to-end immediately.
 */

const globalStore = globalThis as unknown as { __avorasOrders?: Order[] };

if (!globalStore.__avorasOrders) {
  globalStore.__avorasOrders = seedMockOrders();
}

function seedMockOrders(): Order[] {
  const now = Date.now();
  return [
    {
      id: "ord-1001",
      orderNumber: "AVR-260812-4821",
      items: [
        { productId: "prod-1", variantId: "v2", title: "Organic Cotton Onesie Set (Pack of 3)", image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=200", size: "0-3M", price: 1450, quantity: 1, maxStock: 40 }
      ],
      subtotal: 1450,
      shippingFee: 80,
      discount: 0,
      total: 1530,
      status: "DELIVERED",
      paymentMethod: "COD",
      customerName: "Nusrat Jahan",
      customerPhone: "01711223344",
      division: "Dhaka",
      district: "Dhaka",
      area: "Mirpur",
      addressLine: "House 12, Road 5, Mirpur 10",
      createdAt: new Date(now - 6 * 86400000).toISOString()
    },
    {
      id: "ord-1002",
      orderNumber: "AVR-260818-1032",
      items: [
        { productId: "prod-5", variantId: "v11", title: "Knit Cardigan & Booties Gift Set", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=200", size: "0-3M", price: 2200, quantity: 1, maxStock: 10 },
        { productId: "prod-8", variantId: "v16", title: "Muslin Swaddle Blanket Set (2-Pack)", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=200", size: "One Size", price: 1350, quantity: 1, maxStock: 35 }
      ],
      subtotal: 3550,
      shippingFee: 0,
      discount: 100,
      total: 3450,
      status: "PROCESSING",
      paymentMethod: "BKASH",
      customerName: "Tanvir Ahmed",
      customerPhone: "01812345678",
      division: "Chattogram",
      district: "Chattogram",
      area: "Pahartali",
      addressLine: "Flat 3B, Green View, Pahartali",
      createdAt: new Date(now - 2 * 86400000).toISOString()
    },
    {
      id: "ord-1003",
      orderNumber: "AVR-260823-7719",
      items: [
        { productId: "prod-3", variantId: "v6", title: "Soft Terry Romper - Cloud Print", image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=200", size: "3-6M", price: 990, quantity: 2, maxStock: 30 }
      ],
      subtotal: 1980,
      shippingFee: 80,
      discount: 0,
      total: 2060,
      status: "PENDING",
      paymentMethod: "COD",
      customerName: "Farzana Hoque",
      customerPhone: "01922334455",
      division: "Dhaka",
      district: "Gazipur",
      area: "Tongi",
      addressLine: "House 22, Sector 4, Tongi",
      createdAt: new Date(now - 3 * 3600000).toISOString()
    }
  ];
}

export function getOrders(): Order[] {
  return globalStore.__avorasOrders!.slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getOrderById(id: string): Order | undefined {
  return globalStore.__avorasOrders!.find((o) => o.id === id);
}

export function addOrder(order: Order) {
  globalStore.__avorasOrders!.unshift(order);
  return order;
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  const order = globalStore.__avorasOrders!.find((o) => o.id === id);
  if (order) order.status = status;
  return order;
}

export function getDashboardMetrics() {
  const orders = getOrders();
  const totalSales = orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "PENDING").length;
  const deliveredOrders = orders.filter((o) => o.status === "DELIVERED").length;
  const recentOrders = orders.slice(0, 5);

  return { totalSales, totalOrders, pendingOrders, deliveredOrders, recentOrders };
}
