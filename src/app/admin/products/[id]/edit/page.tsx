import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/mock-products";
import { ProductForm } from "@/components/admin/product-form";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.id);
  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-800 mb-6">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}
