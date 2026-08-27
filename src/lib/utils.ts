import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBDT(amount: number | string) {
  const n = typeof amount === "string" ? parseFloat(amount) : amount;
  return `৳${n.toLocaleString("en-BD", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function generateOrderNumber() {
  const date = new Date();
  const y = date.getFullYear().toString().slice(-2);
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `AVR-${y}${m}${d}-${rand}`;
}

export const BD_DIVISIONS = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh"
];
