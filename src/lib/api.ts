"use client";

import { Product, StoreConfig } from "./types";

// Fetch products from the server API
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch("/api/products", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch {
    return [];
  }
}

// Save products via the server API (admin only)
export async function saveProductsToServer(products: Product[], password: string): Promise<boolean> {
  try {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, products }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Fetch config from the server API
export async function fetchConfig(): Promise<StoreConfig | null> {
  try {
    const res = await fetch("/api/config", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch config");
    return await res.json();
  } catch {
    return null;
  }
}

// Save config via the server API (admin only)
export async function saveConfigToServer(config: StoreConfig, password: string): Promise<boolean> {
  try {
    const res = await fetch("/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, config }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
