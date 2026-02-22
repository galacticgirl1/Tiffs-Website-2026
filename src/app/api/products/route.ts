import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

export const dynamic = "force-dynamic";

const PRODUCTS_BLOB_KEY = "mbs-products.json";
const ADMIN_PASSWORD = "Starseed888#";

async function getProducts() {
  try {
    const { blobs } = await list({ prefix: PRODUCTS_BLOB_KEY });
    if (blobs.length > 0) {
      const response = await fetch(blobs[0].downloadUrl, { cache: "no-store" });
      if (response.ok) {
        return await response.json();
      }
    }
  } catch (err) {
    console.error("Error reading products blob:", err);
  }
  return [];
}

// GET — anyone can read products
export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (err) {
    console.error("GET /api/products error:", err);
    return NextResponse.json([], { status: 200 });
  }
}

// POST — admin only, save products
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, products } = body;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!Array.isArray(products)) {
      return NextResponse.json({ error: "Products must be an array" }, { status: 400 });
    }

    const blob = await put(PRODUCTS_BLOB_KEY, JSON.stringify(products), {
      access: "private",
      addRandomSuffix: false,
    });

    console.log("Products saved to blob:", blob.url);
    return NextResponse.json({ success: true, url: blob.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    console.error("POST /api/products error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
