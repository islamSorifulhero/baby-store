import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata = { title: "Admin Dashboard | AVORAS" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row bg-avoras-cream/40">
      <AdminSidebar />
      <div className="flex-1 p-5 md:p-8">{children}</div>
    </div>
  );
}
