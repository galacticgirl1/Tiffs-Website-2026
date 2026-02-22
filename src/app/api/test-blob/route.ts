import { NextResponse } from "next/server";
import { list, put } from "@vercel/blob";

export async function GET() {
  const hasToken = !!process.env.BLOB_READ_WRITE_TOKEN;
  const tokenPrefix = process.env.BLOB_READ_WRITE_TOKEN
    ? process.env.BLOB_READ_WRITE_TOKEN.substring(0, 10) + "..."
    : "NOT SET";

  let blobTest = "not tested";
  let blobList = "not tested";

  if (hasToken) {
    try {
      const result = await put("test-connection.txt", "hello", {
        access: "private",
        addRandomSuffix: false,
      });
      blobTest = "SUCCESS - wrote to: " + result.url;
    } catch (err) {
      blobTest = "FAILED - " + (err instanceof Error ? err.message : String(err));
    }

    try {
      const { blobs } = await list();
      blobList = `Found ${blobs.length} blobs: ${blobs.map((b) => b.pathname).join(", ")}`;
    } catch (err) {
      blobList = "FAILED - " + (err instanceof Error ? err.message : String(err));
    }
  }

  return NextResponse.json({
    hasToken,
    tokenPrefix,
    blobTest,
    blobList,
    env: process.env.NODE_ENV,
  });
}
