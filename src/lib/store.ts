"use client";

import { Product, StoreConfig } from "./types";

const PRODUCTS_KEY = "mbs_products_v2";
const CONFIG_KEY = "mbs_config_v2";

const DEFAULT_CONFIG: StoreConfig = {
  businessName: "Reactivate MBS",
  tagline: "Mind Body & Soul",
  aboutText:
    "Welcome to Reactivate MBS Mind Body & Soul LLC. We create handcrafted candles and curate premium beauty products to nourish your mind, body, and soul. Every product is made with love and intention.",
  socialLinks: {
    instagram: "https://instagram.com/reactivatembs",
    facebook: "https://facebook.com/reactivatembs",
    tiktok: "https://tiktok.com/@reactivatembs",
    pinterest: "https://pinterest.com/reactivatembs",
    youtube: "",
    twitter: "",
    website: "",
  },
  heroImageUrl: "",
};

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Lavender Serenity Candle",
    description:
      "Hand-poured soy candle with pure lavender essential oil. Perfect for relaxation and meditation. Burns for 40+ hours.",
    price: 24.99,
    category: "candles",
    imageUrl: "https://images.unsplash.com/photo-1602607616907-faf0f0a68e3a?w=400&h=400&fit=crop",
    purchaseLink: "#",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Vanilla & Honey Glow Candle",
    description:
      "Warm vanilla and honey blend that fills your space with a cozy, inviting aroma. Made with natural beeswax.",
    price: 28.99,
    category: "candles",
    imageUrl: "https://images.unsplash.com/photo-1603905179474-10067ef3c636?w=400&h=400&fit=crop",
    purchaseLink: "#",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Rose Petal Body Butter",
    description:
      "Luxurious whipped body butter infused with rose petals and shea butter. Deep moisture for silky smooth skin.",
    price: 18.99,
    category: "body",
    imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
    purchaseLink: "#",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Glow Up Facial Serum",
    description:
      "Vitamin C brightening serum with hyaluronic acid. Reveals your natural radiance in just 7 days.",
    price: 34.99,
    category: "skincare",
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    purchaseLink: "#",
    featured: false,
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Matte Lip Collection",
    description:
      "Set of 4 long-lasting matte liquid lipsticks in universally flattering shades. Vegan and cruelty-free.",
    price: 29.99,
    category: "beauty",
    imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
    purchaseLink: "#",
    featured: false,
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Self-Care Sunday Bundle",
    description:
      "The ultimate self-care package: 1 signature candle, body butter, facial mask, and bath salts. Gift-wrapped.",
    price: 64.99,
    category: "bundles",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop",
    purchaseLink: "#",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
  },
];

export function getProducts(): Product[] {
  if (typeof window === "undefined") return SAMPLE_PRODUCTS;
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (!stored) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(SAMPLE_PRODUCTS));
    return SAMPLE_PRODUCTS;
  }
  return JSON.parse(stored);
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function addProduct(product: Omit<Product, "id" | "createdAt">): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...updates };
  saveProducts(products);
  return products[index];
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
}

export function getConfig(): StoreConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  const stored = localStorage.getItem(CONFIG_KEY);
  if (!stored) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(DEFAULT_CONFIG));
    return DEFAULT_CONFIG;
  }
  return JSON.parse(stored);
}

export function saveConfig(config: StoreConfig) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}
