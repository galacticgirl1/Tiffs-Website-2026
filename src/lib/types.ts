export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "candles" | "beauty" | "skincare" | "body" | "bundles" | "apparel" | "bath-salts";
  imageUrl: string;
  purchaseLink: string;
  featured: boolean;
  inStock: boolean;
  createdAt: string;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  tiktok: string;
  pinterest: string;
  youtube: string;
  twitter: string;
  website: string;
}

export interface StoreConfig {
  businessName: string;
  tagline: string;
  aboutText: string;
  socialLinks: SocialLinks;
  heroImageUrl: string;
}

export const CATEGORIES: { value: Product["category"]; label: string }[] = [
  { value: "candles", label: "Candles" },
  { value: "beauty", label: "Beauty" },
  { value: "skincare", label: "Skincare" },
  { value: "body", label: "Body Care" },
  { value: "bundles", label: "Gift Bundles" },
  { value: "apparel", label: "Apparel" },
  { value: "bath-salts", label: "Bath Salts" },
];
