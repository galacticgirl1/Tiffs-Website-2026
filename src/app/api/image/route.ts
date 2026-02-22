import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/blob";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  try {
    const result = await get(path, { access: "private" });

    if (!result || !result.stream) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Determine content type from path
    const ext = path.split(".").pop()?.toLowerCase() || "";
    const contentTypes: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
      svg: "image/svg+xml",
    };
    const contentType = contentTypes[ext] || "image/jpeg";

    return new NextResponse(result.stream, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("GET /api/image error:", err);
    return NextResponse.json({ error: "Failed to load image" }, { status: 500 });
  }
}
