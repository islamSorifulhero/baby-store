"use client";

import { useState, useTransition } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { updateOrderStatusAction } from "@/lib/actions";
import { OrderStatus } from "@/types";
import { toast } from "sonner";

const STATUSES: OrderStatus[] = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export function OrderStatusSelect({ orderId, currentStatus }: { orderId: string; currentStatus: OrderStatus }) {
  const [status, setStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string) {
    const newStatus = value as OrderStatus;
    setStatus(newStatus);
    startTransition(async () => {
      await updateOrderStatusAction(orderId, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
    });
  }

  return (
    <Select value={status} onValueChange={handleChange}>
      <SelectTrigger className={`w-[150px] h-9 text-xs ${isPending ? "opacity-60" : ""}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUSES.map((s) => (
          <SelectItem key={s} value={s}>
            {s}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
