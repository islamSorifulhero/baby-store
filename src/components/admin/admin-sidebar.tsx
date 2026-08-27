"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-60 shrink-0 border-r border-slate-100 bg-white md:min-h-[calc(100vh-4rem)]">
      <div className="p-5">
        <Link href="/" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Store
        </Link>
        <h2 className="font-display text-xl font-bold text-slate-800 mb-6">AVORAS Admin</h2>
        <nav className="flex md:flex-col gap-1 overflow-x-auto">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors",
                  active ? "bg-slate-800 text-white" : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
