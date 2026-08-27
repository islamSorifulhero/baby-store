import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { getAllProducts } from "@/lib/products";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteProductButton } from "@/components/admin/delete-product-button";
import { formatBDT } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-800">Product Management</h1>
          <p className="text-slate-500 mt-1">{products.length} products</p>
        </div>
        <Button asChild variant="primary">
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4" /> Add Product
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
            return (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-avoras-beige/40 shrink-0">
                      <Image src={product.images[0]} alt={product.title} fill className="object-cover" sizes="40px" />
                    </div>
                    <span className="font-medium text-slate-800 line-clamp-1">{product.title}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600">{product.categoryName}</TableCell>
                <TableCell className="text-slate-800">{formatBDT(product.price)}</TableCell>
                <TableCell>
                  <Badge variant={totalStock > 10 ? "success" : totalStock > 0 ? "warning" : "danger"}>
                    {totalStock} units
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={product.isActive ? "secondary" : "outline"}>
                    {product.isActive ? "Active" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                      title="Edit product"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteProductButton productId={product.id} productTitle={product.title} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
