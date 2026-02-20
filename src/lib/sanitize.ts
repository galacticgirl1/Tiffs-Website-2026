/**
 * Sanitize user input to prevent XSS attacks.
 */

// Strip any HTML tags from text input
export function sanitizeText(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

// Validate URLs — only allow http:, https:, and relative paths
export function sanitizeUrl(url: string): string {
  if (!url) return "";
  const trimmed = url.trim();

  // Allow relative paths (e.g. /apparel-hoodie-set.svg)
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed;
  }

  // Allow # links
  if (trimmed === "#") return "#";

  // Only allow http and https protocols
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return trimmed;
    }
  } catch {
    // Invalid URL
  }

  // Block everything else (javascript:, data:, vbscript:, etc.)
  return "";
}

// Sanitize image URL — must be a valid image source
export function sanitizeImageUrl(url: string): string {
  if (!url) return "";
  const sanitized = sanitizeUrl(url);
  // Extra check: block event handler injection in URL strings
  if (/on\w+\s*=/i.test(sanitized)) return "";
  return sanitized;
}
