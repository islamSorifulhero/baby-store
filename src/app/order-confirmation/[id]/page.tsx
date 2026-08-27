import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, Package, MapPin, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getOrderById } from "@/lib/orders-store";
import { formatBDT } from "@/lib/utils";

export default function OrderConfirmationPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { orderNumber?: string };
}) {
  const order = getOrderById(params.id);
  if (!order) notFound();

  return (
    <div className="container py-14 md:py-20 max-w-3xl">
      <div className="text-center mb-10">
        <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-9 w-9 text-emerald-600" />
        </div>
        <h1 className="font-display text-3xl font-bold text-slate-800">Order Placed Successfully!</h1>
        <p className="text-slate-500 mt-2">
          Thank you, {order.customerName.split(" ")[0]}! Your order has been received.
        </p>
        <p className="mt-3 inline-block bg-avoras-beige/60 px-4 py-1.5 rounded-full text-sm font-medium text-slate-700">
          Order ID: {order.orderNumber}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Package className="h-5 w-5" /> Order Summary
          </h2>
          <Badge variant="warning">{order.status}</Badge>
        </div>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.variantId} className="flex gap-3">
              <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-avoras-beige/40 shrink-0">
                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="64px" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{item.title}</p>
                <p className="text-xs text-slate-500">
                  Size: {item.size} · Qty: {item.quantity}
                </p>
              </div>
              <span className="text-sm font-medium text-slate-800">{formatBDT(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{formatBDT(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Shipping</span>
            <span>{order.shippingFee === 0 ? "Free" : formatBDT(order.shippingFee)}</span>
          </div>
          <div className="flex justify-between font-semibold text-slate-800 text-base pt-2 border-t border-slate-100">
            <span>Total</span>
            <span>{formatBDT(order.total)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5 mb-1.5">
              <MapPin className="h-3.5 w-3.5" /> SHIPPING ADDRESS
            </p>
            <p className="text-sm text-slate-700">{order.customerName}</p>
            <p className="text-sm text-slate-600">{order.customerPhone}</p>
            <p className="text-sm text-slate-600">
              {order.addressLine}, {order.area}, {order.district}, {order.division}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5 mb-1.5">
              <CreditCard className="h-3.5 w-3.5" /> PAYMENT METHOD
            </p>
            <p className="text-sm text-slate-700">
              {order.paymentMethod === "COD" ? "Cash on Delivery" : order.paymentMethod}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
        <Button asChild variant="primary" size="lg">
          <Link href="/products">Continue Shopping</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
