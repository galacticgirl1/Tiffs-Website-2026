import { NextRequest, NextResponse } from "next/server";
import { put, head } from "@vercel/blob";

const CONFIG_BLOB_KEY = "mbs-config.json";
const ADMIN_PASSWORD = "Starseed888#";

const DEFAULT_CONFIG = {
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

async function getConfig() {
  try {
    const blob = await head(CONFIG_BLOB_KEY);
    if (blob) {
      const response = await fetch(blob.url);
      return await response.json();
    }
  } catch {
    // Blob doesn't exist yet, use defaults
  }
  return DEFAULT_CONFIG;
}

// GET — anyone can read config
export async function GET() {
  const config = await getConfig();
  return NextResponse.json(config);
}

// POST — admin only, save config
export async function POST(request: NextRequest) {
  try {
    const { password, config } = await request.json();
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await put(CONFIG_BLOB_KEY, JSON.stringify(config), {
      access: "public",
      addRandomSuffix: false,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
