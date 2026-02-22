import { NextRequest, NextResponse } from "next/server";
import { put, head } from "@vercel/blob";

const PRODUCTS_BLOB_KEY = "mbs-products.json";
const ADMIN_PASSWORD = "Starseed888#";

// Default products (fallback if blob doesn't exist yet)
const DEFAULT_PRODUCTS = [
  {
    id: "1",
    name: "Lavender Serenity Candle",
    description: "Hand-poured soy candle with pure lavender essential oil. Perfect for relaxation and meditation. Burns for 40+ hours.",
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
    description: "Warm vanilla and honey blend that fills your space with a cozy, inviting aroma. Made with natural beeswax.",
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
    description: "Luxurious whipped body butter infused with rose petals and shea butter. Deep moisture for silky smooth skin.",
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
    description: "Vitamin C brightening serum with hyaluronic acid. Reveals your natural radiance in just 7 days.",
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
    description: "Set of 4 long-lasting matte liquid lipsticks in universally flattering shades. Vegan and cruelty-free.",
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
    description: "The ultimate self-care package: 1 signature candle, body butter, facial mask, and bath salts. Gift-wrapped.",
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
    description: "Handmade herbal bath salt with Epsom salt, Lavender, Rose, Rosemary, Basil, Eucalyptus, Spearmint, Cinnamon, Pumpkin, and Sage. No preservatives. Made in Reading, PA.",
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
    description: "Complete matching set — black hoodie with MBS logo and sweatpants with 'Soak in Bliss' running down the leg. Save $10 when you buy the set!",
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
    description: "Luxurious white spa robe with 'Soak in Bliss' embroidered on the left chest and the MBS logo on the back. Perfect for your self-care routine.",
    price: 45.00,
    category: "apparel",
    imageUrl: "/apparel-robe-white.svg",
    purchaseLink: "#",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
  },
];

async function getProducts() {
  try {
    const blob = await head(PRODUCTS_BLOB_KEY);
    if (blob) {
      const response = await fetch(blob.url);
      return await response.json();
    }
  } catch {
    // Blob doesn't exist yet, use defaults
  }
  return DEFAULT_PRODUCTS;
}

// GET — anyone can read products
export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

// POST — admin only, save products
export async function POST(request: NextRequest) {
  try {
    const { password, products } = await request.json();
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await put(PRODUCTS_BLOB_KEY, JSON.stringify(products), {
      access: "public",
      addRandomSuffix: false,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
