import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center text-center py-24 min-h-[60vh]">
      <span className="font-display text-7xl font-bold text-avoras-pink">404</span>
      <h1 className="font-display text-2xl font-bold text-slate-800 mt-4">Page Not Found</h1>
      <p className="text-slate-500 mt-2 max-w-sm">
        Sorry, we couldn't find the page you're looking for. It may have been moved or no longer exists.
      </p>
      <Button asChild variant="primary" size="lg" className="mt-6">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
