"use client";

import { Ruler } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SIZE_ROWS = [
  { size: "NB (Newborn)", age: "0-1 Month", weight: "up to 4.5 kg", height: "up to 55 cm" },
  { size: "0-3M", age: "0-3 Months", weight: "4.5 - 6 kg", height: "55 - 62 cm" },
  { size: "3-6M", age: "3-6 Months", weight: "6 - 8 kg", height: "62 - 68 cm" },
  { size: "6-9M", age: "6-9 Months", weight: "8 - 9.5 kg", height: "68 - 74 cm" },
  { size: "9-12M", age: "9-12 Months", weight: "9.5 - 11 kg", height: "74 - 80 cm" }
];

export function SizeGuideModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 text-sm text-slate-600 underline underline-offset-2 hover:text-slate-900">
          <Ruler className="h-3.5 w-3.5" /> Size Guide
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>AVORAS Baby Size Guide</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-slate-500 -mt-2">
          Every baby grows differently — use weight as your primary guide for the best fit.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-avoras-beige/50 text-left">
                <th className="p-2.5 rounded-l-lg font-medium">Size</th>
                <th className="p-2.5 font-medium">Age</th>
                <th className="p-2.5 font-medium">Weight</th>
                <th className="p-2.5 rounded-r-lg font-medium">Height</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_ROWS.map((row) => (
                <tr key={row.size} className="border-b border-slate-100 last:border-0">
                  <td className="p-2.5 font-medium text-slate-800">{row.size}</td>
                  <td className="p-2.5 text-slate-600">{row.age}</td>
                  <td className="p-2.5 text-slate-600">{row.weight}</td>
                  <td className="p-2.5 text-slate-600">{row.height}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400">
          Tip: If your baby is between sizes, we recommend sizing up for extra comfort and longer wear.
        </p>
      </DialogContent>
    </Dialog>
  );
}
