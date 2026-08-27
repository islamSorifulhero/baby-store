"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Banknote, Smartphone, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useCartStore } from "@/store/cart-store";
import { placeOrder } from "@/lib/actions";
import { BD_DIVISIONS, cn, formatBDT } from "@/lib/utils";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "BKASH">("COD");
  const [division, setDivision] = useState("Dhaka");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const shippingFee = subtotal() >= 2000 ? 0 : 80;
  const total = subtotal() + shippingFee;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    setIsSubmitting(true);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const payload = {
      customerName: formData.get("customerName") as string,
      customerPhone: formData.get("customerPhone") as string,
      customerEmail: (formData.get("customerEmail") as string) || "",
      division,
      district: formData.get("district") as string,
      area: formData.get("area") as string,
      addressLine: formData.get("addressLine") as string,
      orderNote: (formData.get("orderNote") as string) || "",
      paymentMethod,
      bkashTxnId: (formData.get("bkashTxnId") as string) || ""
    };

    const result = await placeOrder(items, payload as any);
    setIsSubmitting(false);

    if (!result.success) {
      toast.error(result.error);
      if (result.fieldErrors) setFieldErrors(result.fieldErrors);
      return;
    }

    clearCart();
    router.push(`/order-confirmation/${result.orderId}?orderNumber=${result.orderNumber}`);
  }

  if (items.length === 0) {
    return (
      <div className="container py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-slate-800 mb-3">Your bag is empty</h1>
        <Button asChild variant="primary">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-14">
      <h1 className="font-display text-3xl font-bold text-slate-800 mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address */}
          <section className="rounded-2xl border border-slate-100 bg-white p-6">
            <h2 className="font-display text-lg font-semibold text-slate-800 mb-5">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">Full Name</Label>
                <Input id="customerName" name="customerName" placeholder="e.g. Nusrat Jahan" required />
                {fieldErrors.customerName && <p className="text-xs text-red-500 mt-1">{fieldErrors.customerName}</p>}
              </div>
              <div>
                <Label htmlFor="customerPhone">Phone Number</Label>
                <Input id="customerPhone" name="customerPhone" placeholder="017XXXXXXXX" required />
                {fieldErrors.customerPhone && <p className="text-xs text-red-500 mt-1">{fieldErrors.customerPhone}</p>}
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="customerEmail">Email (optional)</Label>
              <Input id="customerEmail" name="customerEmail" type="email" placeholder="you@example.com" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <Label htmlFor="division">Division</Label>
                <Select value={division} onValueChange={setDivision}>
                  <SelectTrigger>
                    <SelectValue placeholder="Division" />
                  </SelectTrigger>
                  <SelectContent>
                    {BD_DIVISIONS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="district">District</Label>
                <Input id="district" name="district" placeholder="e.g. Dhaka" required />
                {fieldErrors.district && <p className="text-xs text-red-500 mt-1">{fieldErrors.district}</p>}
              </div>
              <div>
                <Label htmlFor="area">Area / Thana</Label>
                <Input id="area" name="area" placeholder="e.g. Mirpur" required />
                {fieldErrors.area && <p className="text-xs text-red-500 mt-1">{fieldErrors.area}</p>}
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="addressLine">Full Address</Label>
              <Textarea id="addressLine" name="addressLine" placeholder="House, road, landmark..." required />
              {fieldErrors.addressLine && <p className="text-xs text-red-500 mt-1">{fieldErrors.addressLine}</p>}
            </div>
            <div className="mt-4">
              <Label htmlFor="orderNote">Order Note (optional)</Label>
              <Textarea id="orderNote" name="orderNote" placeholder="Delivery instructions..." />
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-2xl border border-slate-100 bg-white p-6">
            <h2 className="font-display text-lg font-semibold text-slate-800 mb-5">Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("COD")}
                className={cn(
                  "flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors",
                  paymentMethod === "COD" ? "border-slate-800 bg-avoras-beige/40" : "border-slate-200"
                )}
              >
                <Banknote className="h-5 w-5 text-slate-700" />
                <div>
                  <p className="font-medium text-slate-800 text-sm">Cash on Delivery</p>
                  <p className="text-xs text-slate-500">Pay when your order arrives</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("BKASH")}
                className={cn(
                  "flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors",
                  paymentMethod === "BKASH" ? "border-slate-800 bg-avoras-beige/40" : "border-slate-200"
                )}
              >
                <Smartphone className="h-5 w-5 text-slate-700" />
                <div>
                  <p className="font-medium text-slate-800 text-sm">bKash</p>
                  <p className="text-xs text-slate-500">Send money to 01XXX-XXXXXX</p>
                </div>
              </button>
            </div>

            {paymentMethod === "BKASH" && (
              <div className="mt-4">
                <Label htmlFor="bkashTxnId">bKash Transaction ID</Label>
                <Input id="bkashTxnId" name="bkashTxnId" placeholder="e.g. 8N7A6XXXXX" />
                {fieldErrors.bkashTxnId && <p className="text-xs text-red-500 mt-1">{fieldErrors.bkashTxnId}</p>}
                <p className="text-xs text-slate-500 mt-1.5">
                  Send {formatBDT(total)} to <span className="font-medium">01XXX-XXXXXX (Personal)</span> and enter
                  the transaction ID above.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Order Summary */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 h-fit sticky top-24">
          <h2 className="font-display text-lg font-semibold text-slate-800 mb-4">Order Summary</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.variantId} className="flex gap-3">
                <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-avoras-beige/40 shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="56px" />
                  <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-slate-800 text-white text-[10px] flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-800 line-clamp-1">{item.title}</p>
                  <p className="text-xs text-slate-500">Size: {item.size}</p>
                </div>
                <span className="text-sm font-medium text-slate-800">{formatBDT(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatBDT(subtotal())}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span>{shippingFee === 0 ? "Free" : formatBDT(shippingFee)}</span>
            </div>
            <div className="flex justify-between font-semibold text-slate-800 text-base pt-2 border-t border-slate-100">
              <span>Total</span>
              <span>{formatBDT(total)}</span>
            </div>
          </div>
          <Button type="submit" variant="primary" size="lg" className="w-full mt-6" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Placing Order...
              </>
            ) : (
              "Place Order"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
