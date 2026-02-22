import { NextResponse } from "next/server";
import { put, get } from "@vercel/blob";

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
    results.step1_write = "SUCCESS - url: " + blob.url;
  } catch (err) {
    results.step1_write = "FAILED - " + (err instanceof Error ? err.message : String(err));
    return NextResponse.json(results);
  }

  // Step 2: Read it back using get()
  try {
    const result = await get("mbs-products.json", { access: "private" });
    if (result && result.stream) {
      const response = new Response(result.stream);
      const data = await response.json();
      results.step2_read = "SUCCESS - data: " + JSON.stringify(data);
    } else {
      results.step2_read = "FAILED - no result or stream";
    }
  } catch (err) {
    results.step2_read = "FAILED - " + (err instanceof Error ? err.message : String(err));
  }

  return NextResponse.json(results);
}
