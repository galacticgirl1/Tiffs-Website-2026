import { NextResponse } from "next/server";
import { list, put } from "@vercel/blob";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, string> = {};

  // Step 1: Write a test product array
  const testProducts = [{ id: "test1", name: "Test Product", price: 9.99 }];
  try {
    const blob = await put("mbs-products.json", JSON.stringify(testProducts), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    results.step1_write = "SUCCESS - url: " + blob.url + " | downloadUrl: " + blob.downloadUrl;
  } catch (err) {
    results.step1_write = "FAILED - " + (err instanceof Error ? err.message : String(err));
    return NextResponse.json(results);
  }

  // Step 2: List blobs to find it
  try {
    const { blobs } = await list({ prefix: "mbs-products.json" });
    results.step2_list = `Found ${blobs.length} blobs`;
    if (blobs.length > 0) {
      results.step2_url = blobs[0].url;
      results.step2_downloadUrl = blobs[0].downloadUrl;
    }
  } catch (err) {
    results.step2_list = "FAILED - " + (err instanceof Error ? err.message : String(err));
  }

  // Step 3: Try reading via downloadUrl
  try {
    const { blobs } = await list({ prefix: "mbs-products.json" });
    if (blobs.length > 0) {
      const response = await fetch(blobs[0].downloadUrl, { cache: "no-store" });
      results.step3_read_status = String(response.status);
      if (response.ok) {
        const data = await response.json();
        results.step3_read_data = JSON.stringify(data);
      } else {
        results.step3_read_body = await response.text();
      }
    }
  } catch (err) {
    results.step3_read = "FAILED - " + (err instanceof Error ? err.message : String(err));
  }

  return NextResponse.json(results);
}
