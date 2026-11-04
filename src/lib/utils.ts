import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path = "/") {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://muhit.dev";
  return new URL(path, base).toString();
}

export function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}
