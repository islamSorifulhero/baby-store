import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-800 mb-6">Add New Product</h1>
      <ProductForm />
    </div>
  );
}
