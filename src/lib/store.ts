"use client";

import { Product, StoreConfig } from "./types";
import { sanitizeText, sanitizeUrl, sanitizeImageUrl } from "./sanitize";

const PRODUCTS_KEY = "mbs_products_v7";
const CONFIG_KEY = "mbs_config_v6";

const DEFAULT_CONFIG: StoreConfig = {
  businessName: "Reactivate MBS",
  tagline: "Mind Body & Soul",
  aboutText:
    "We are an aroma therapy & holistic healing company that sells all natural and organic products. We create handcrafted candles and curate premium beauty products to nourish your mind, body, and soul. Every product is made with love and intention.",
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
    imageUrl: "/candles.jpg",
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
    imageUrl: "/candles.jpg",
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
    imageUrl: "/body-oils.jpg",
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
    imageUrl: "/body-oils.jpg",
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
    imageUrl: "/body-oils.jpg",
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
    imageUrl: "/candles.jpg",
    purchaseLink: "#",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Herbal Bath Salt",
    description:
      "Handmade herbal bath salt with Epsom salt, Lavender, Rose, Rosemary, Basil, Eucalyptus, Spearmint, Cinnamon, Pumpkin, and Sage. No preservatives. Made in Reading, PA.",
    price: 18.99,
    category: "bath-salts",
    imageUrl: "/bath-salt.jpg",
    purchaseLink: "#",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "MBS Hoodie + Sweats Set",
    description:
      "Complete matching set — black hoodie with MBS logo and sweatpants with 'Soak in Bliss' running down the leg. Save $10 when you buy the set!",
    price: 40.00,
    category: "apparel",
    imageUrl: "/apparel-hoodie-set.svg",
    purchaseLink: "#",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "9",
    name: "MBS White Robe — Soak in Bliss",
    description:
      "Luxurious white spa robe with 'Soak in Bliss' embroidered on the left chest and the MBS logo on the back. Perfect for your self-care routine.",
    price: 45.00,
    category: "apparel",
    imageUrl: "/apparel-robe-white.svg",
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

function sanitizeProduct(product: Partial<Product>): Partial<Product> {
  const sanitized = { ...product };
  if (sanitized.name) sanitized.name = sanitizeText(sanitized.name);
  if (sanitized.description) sanitized.description = sanitizeText(sanitized.description);
  if (sanitized.imageUrl) sanitized.imageUrl = sanitizeImageUrl(sanitized.imageUrl);
  if (sanitized.purchaseLink) sanitized.purchaseLink = sanitizeUrl(sanitized.purchaseLink);
  return sanitized;
}

export function addProduct(product: Omit<Product, "id" | "createdAt">): Product {
  const products = getProducts();
  const sanitized = sanitizeProduct(product);
  const newProduct: Product = {
    ...product,
    ...sanitized,
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
  const sanitized = sanitizeProduct(updates);
  products[index] = { ...products[index], ...sanitized };
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
  const sanitized: StoreConfig = {
    ...config,
    businessName: sanitizeText(config.businessName),
    tagline: sanitizeText(config.tagline),
    aboutText: sanitizeText(config.aboutText),
    socialLinks: {
      instagram: sanitizeUrl(config.socialLinks.instagram),
      facebook: sanitizeUrl(config.socialLinks.facebook),
      tiktok: sanitizeUrl(config.socialLinks.tiktok),
      pinterest: sanitizeUrl(config.socialLinks.pinterest),
      youtube: sanitizeUrl(config.socialLinks.youtube),
      twitter: sanitizeUrl(config.socialLinks.twitter),
      website: sanitizeUrl(config.socialLinks.website),
    },
    heroImageUrl: sanitizeImageUrl(config.heroImageUrl),
  };
  localStorage.setItem(CONFIG_KEY, JSON.stringify(sanitized));
}
