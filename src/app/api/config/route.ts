import { NextRequest, NextResponse } from "next/server";
import { put, get } from "@vercel/blob";

export const dynamic = "force-dynamic";

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
    const result = await get(CONFIG_BLOB_KEY, { access: "private" });
    if (result && result.stream) {
      const response = new Response(result.stream);
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.error("Error reading config blob:", err);
  }
  return DEFAULT_CONFIG;
}

// GET — anyone can read config
export async function GET() {
  try {
    const config = await getConfig();
    return NextResponse.json(config);
  } catch (err) {
    console.error("GET /api/config error:", err);
    return NextResponse.json(DEFAULT_CONFIG, { status: 200 });
  }
}

// POST — admin only, save config
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, config } = body;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const blob = await put(CONFIG_BLOB_KEY, JSON.stringify(config), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    console.log("Config saved to blob:", blob.url);
    return NextResponse.json({ success: true, url: blob.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    console.error("POST /api/config error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
