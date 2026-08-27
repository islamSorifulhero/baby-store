"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { createProductAction, updateProductAction } from "@/lib/actions";
import { Product } from "@/types";
import { toast } from "sonner";

type VariantRow = { id?: string; size: string; sku: string; stock: number };

const CATEGORY_OPTIONS = [
  { value: "0-3-months", label: "0-3 Months" },
  { value: "3-6-months", label: "3-6 Months" },
  { value: "rompers", label: "Rompers" },
  { value: "gift-sets", label: "Gift Sets" }
];

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEdit = !!product;

  const [variants, setVariants] = useState<VariantRow[]>(
    product?.variants.map((v) => ({ id: v.id, size: v.size, sku: v.sku, stock: v.stock })) ?? [
      { size: "0-3M", sku: "", stock: 0 }
    ]
  );
  const [category, setCategory] = useState(product?.categorySlug ?? "0-3-months");
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? false);

  function addVariantRow() {
    setVariants((v) => [...v, { size: "", sku: "", stock: 0 }]);
  }

  function removeVariantRow(idx: number) {
    setVariants((v) => v.filter((_, i) => i !== idx));
  }

  function updateVariantRow(idx: number, field: keyof VariantRow, value: string | number) {
    setVariants((v) => v.map((row, i) => (i === idx ? { ...row, [field]: value } : row)));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("categorySlug", category);
    formData.set("isFeatured", isFeatured ? "true" : "");
    formData.set("variants", JSON.stringify(variants));

    startTransition(async () => {
      const result = isEdit
        ? await updateProductAction(product!.id, formData)
        : await createProductAction(formData);

      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success(isEdit ? "Product updated!" : "Product created!");
      router.push("/admin/products");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <section className="rounded-2xl border border-slate-100 bg-white p-6 space-y-4">
        <h2 className="font-display text-lg font-semibold text-slate-800">Product Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={product?.title} required />
          </div>
          <div>
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input id="slug" name="slug" defaultValue={product?.slug} placeholder="e.g. cotton-onesie-set" required />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" defaultValue={product?.description} required rows={4} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="price">Price (৳)</Label>
            <Input id="price" name="price" type="number" step="0.01" defaultValue={product?.price} required />
          </div>
          <div>
            <Label htmlFor="compareAtPrice">Compare-at Price (optional)</Label>
            <Input id="compareAtPrice" name="compareAtPrice" type="number" step="0.01" defaultValue={product?.compareAtPrice ?? ""} />
          </div>
          <div>
            <Label htmlFor="ageRange">Age Range</Label>
            <Input id="ageRange" name="ageRange" defaultValue={product?.ageRange} placeholder="e.g. 0-3M" required />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="material">Material</Label>
            <Input id="material" name="material" defaultValue={product?.material ?? ""} placeholder="e.g. Organic Cotton" />
          </div>
        </div>

        <div>
          <Label htmlFor="images">Image URLs (comma-separated)</Label>
          <Textarea
            id="images"
            name="images"
            defaultValue={product?.images.join(", ")}
            placeholder="https://... , https://..."
            required
            rows={2}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          Feature this product on homepage
        </label>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-slate-800">Size Variants & Stock</h2>
          <Button type="button" variant="outline" size="sm" onClick={addVariantRow}>
            <Plus className="h-3.5 w-3.5" /> Add Variant
          </Button>
        </div>

        <div className="space-y-3">
          {variants.map((row, idx) => (
            <div key={idx} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end">
              <div>
                <Label className="text-xs">Size</Label>
                <Input
                  value={row.size}
                  onChange={(e) => updateVariantRow(idx, "size", e.target.value)}
                  placeholder="e.g. 0-3M"
                  required
                />
              </div>
              <div>
                <Label className="text-xs">SKU</Label>
                <Input
                  value={row.sku}
                  onChange={(e) => updateVariantRow(idx, "sku", e.target.value)}
                  placeholder="e.g. AVR-001-03"
                  required
                />
              </div>
              <div>
                <Label className="text-xs">Stock</Label>
                <Input
                  type="number"
                  value={row.stock}
                  onChange={(e) => updateVariantRow(idx, "stock", Number(e.target.value))}
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => removeVariantRow(idx)}
                disabled={variants.length === 1}
                className="p-2.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 disabled:opacity-30 mb-0.5"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="flex gap-3">
        <Button type="submit" variant="primary" size="lg" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving...
            </>
          ) : isEdit ? (
            "Save Changes"
          ) : (
            "Create Product"
          )}
        </Button>
        <Button type="button" variant="ghost" size="lg" onClick={() => router.push("/admin/products")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
