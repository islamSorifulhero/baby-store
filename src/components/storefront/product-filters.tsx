"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" }
];

const CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories" },
  { value: "0-3-months", label: "0-3 Months" },
  { value: "3-6-months", label: "3-6 Months" },
  { value: "rompers", label: "Rompers" },
  { value: "gift-sets", label: "Gift Sets" }
];

const PRICE_RANGES = [
  { value: "all", label: "Any Price", min: undefined, max: undefined },
  { value: "0-1000", label: "Under " + formatBDT(1000), min: 0, max: 1000 },
  { value: "1000-2000", label: formatBDT(1000) + " - " + formatBDT(2000), min: 1000, max: 2000 },
  { value: "2000-9999", label: "Above " + formatBDT(2000), min: 2000, max: 9999999 }
];

export function ProductFiltersBar({ sizes }: { sizes: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  function handlePriceChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    const range = PRICE_RANGES.find((r) => r.value === value);
    if (!range || value === "all") {
      params.delete("minPrice");
      params.delete("maxPrice");
    } else {
      params.set("minPrice", String(range.min));
      params.set("maxPrice", String(range.max));
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const activeCategory = searchParams.get("category") ?? "all";
  const activeSize = searchParams.get("size") ?? "all";
  const activeSort = searchParams.get("sort") ?? "newest";
  const activeMinPrice = searchParams.get("minPrice");

  const activePriceValue =
    PRICE_RANGES.find((r) => String(r.min) === activeMinPrice)?.value ?? "all";

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      <Select value={activeCategory} onValueChange={(v) => updateParam("category", v)}>
        <SelectTrigger className="w-[170px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {CATEGORY_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={activeSize} onValueChange={(v) => updateParam("size", v)}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sizes</SelectItem>
          {sizes.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={activePriceValue} onValueChange={handlePriceChange}>
        <SelectTrigger className="w-[190px]">
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent>
          {PRICE_RANGES.map((r) => (
            <SelectItem key={r.value} value={r.value}>
              {r.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={activeSort} onValueChange={(v) => updateParam("sort", v)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {(activeCategory !== "all" || activeSize !== "all" || activePriceValue !== "all") && (
        <Button variant="ghost" size="sm" onClick={() => router.push(pathname)}>
          Clear Filters
        </Button>
      )}
    </div>
  );
}
