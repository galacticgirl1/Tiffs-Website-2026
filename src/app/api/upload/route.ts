import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const dynamic = "force-dynamic";

// Increase body size limit for image uploads
export const maxDuration = 30;

const ADMIN_PASSWORD = "Starseed888#";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const password = formData.get("password") as string;
    const file = formData.get("file") as File;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!file || !file.name) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Generate a unique filename
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `product-images/${Date.now()}.${ext}`;

    const blob = await put(filename, file, {
      access: "private",
      addRandomSuffix: true,
      allowOverwrite: true,
    });

    // Return the pathname so we can serve it via /api/image proxy
    return NextResponse.json({ url: `/api/image?path=${encodeURIComponent(blob.pathname)}` });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Upload failed";
    console.error("POST /api/upload error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
