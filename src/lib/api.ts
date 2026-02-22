"use client";

import { Product, StoreConfig } from "./types";

// Fetch products from the server API
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch("/api/products", { cache: "no-store" });
    if (!res.ok) {
      console.error("Failed to fetch products:", res.status, res.statusText);
      return [];
    }
    return await res.json();
  } catch (err) {
    console.error("fetchProducts error:", err);
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
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error("Save products failed:", res.status, data);
      return false;
    }
    return true;
  } catch (err) {
    console.error("saveProductsToServer error:", err);
    return false;
  }
}

// Fetch config from the server API
export async function fetchConfig(): Promise<StoreConfig | null> {
  try {
    const res = await fetch("/api/config", { cache: "no-store" });
    if (!res.ok) {
      console.error("Failed to fetch config:", res.status, res.statusText);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error("fetchConfig error:", err);
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
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error("Save config failed:", res.status, data);
      return false;
    }
    return true;
  } catch (err) {
    console.error("saveConfigToServer error:", err);
    return false;
  }
}
