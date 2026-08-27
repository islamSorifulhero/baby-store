import Link from "next/link";
import { DollarSign, ShoppingCart, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDashboardMetrics } from "@/lib/orders-store";
import { formatBDT } from "@/lib/utils";

const STATUS_VARIANT: Record<string, "warning" | "secondary" | "success" | "danger"> = {
  PENDING: "warning",
  PROCESSING: "secondary",
  SHIPPED: "secondary",
  DELIVERED: "success",
  CANCELLED: "danger"
};

export default function AdminOverviewPage() {
  const { totalSales, totalOrders, pendingOrders, deliveredOrders, recentOrders } = getDashboardMetrics();

  const stats = [
    { label: "Total Sales", value: formatBDT(totalSales), icon: DollarSign, tint: "bg-emerald-100 text-emerald-700" },
    { label: "Total Orders", value: totalOrders, icon: ShoppingCart, tint: "bg-avoras-sky text-slate-700" },
    { label: "Pending Orders", value: pendingOrders, icon: Clock, tint: "bg-amber-100 text-amber-700" },
    { label: "Delivered", value: deliveredOrders, icon: CheckCircle, tint: "bg-avoras-pink/50 text-slate-700" }
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-800 mb-1">Dashboard Overview</h1>
      <p className="text-slate-500 mb-8">Welcome back! Here's what's happening with AVORAS today.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`h-11 w-11 rounded-full flex items-center justify-center ${s.tint}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500">{s.label}</p>
                <p className="text-xl font-bold text-slate-800">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-slate-800">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-slate-500 hover:text-slate-800 underline">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase text-slate-500 border-b">
                  <th className="py-2.5 pr-4">Order</th>
                  <th className="py-2.5 pr-4">Customer</th>
                  <th className="py-2.5 pr-4">Total</th>
                  <th className="py-2.5 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-slate-50 last:border-0">
                    <td className="py-3 pr-4 font-medium text-slate-800">{o.orderNumber}</td>
                    <td className="py-3 pr-4 text-slate-600">{o.customerName}</td>
                    <td className="py-3 pr-4 text-slate-800">{formatBDT(o.total)}</td>
                    <td className="py-3 pr-4">
                      <Badge variant={STATUS_VARIANT[o.status]}>{o.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
