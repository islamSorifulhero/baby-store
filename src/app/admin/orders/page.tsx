import { getOrders } from "@/lib/orders-store";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { OrderStatusSelect } from "@/components/admin/order-status-select";
import { formatBDT } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function AdminOrdersPage() {
  const orders = getOrders();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-slate-800">Order Management</h1>
        <p className="text-slate-500 mt-1">{orders.length} total orders</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium text-slate-800">{order.orderNumber}</TableCell>
              <TableCell>
                <div>
                  <p className="text-slate-800">{order.customerName}</p>
                  <p className="text-xs text-slate-500">{order.customerPhone}</p>
                </div>
              </TableCell>
              <TableCell className="text-slate-600">{order.items.length} item(s)</TableCell>
              <TableCell className="text-slate-600">{order.paymentMethod}</TableCell>
              <TableCell className="font-medium text-slate-800">{formatBDT(order.total)}</TableCell>
              <TableCell className="text-slate-500 text-xs">
                {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
              </TableCell>
              <TableCell>
                <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
