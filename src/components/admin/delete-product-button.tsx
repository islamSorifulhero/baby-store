"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteProductAction } from "@/lib/actions";
import { toast } from "sonner";

export function DeleteProductButton({ productId, productTitle }: { productId: string; productTitle: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${productTitle}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteProductAction(productId);
      toast.success("Product deleted.");
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
      title="Delete product"
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </button>
  );
}
