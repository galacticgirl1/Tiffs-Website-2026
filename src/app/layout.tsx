import type { Metadata } from "next";
import "./globals.css";
import ChatWrapper from "@/components/ChatWrapper";

export const metadata: Metadata = {
  title: "Reactivate MBS | Mind Body & Soul",
  description:
    "Handcrafted candles and premium beauty products to nourish your mind, body, and soul. Shop Reactivate MBS Mind Body & Soul LLC.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream antialiased">
        {children}
        <ChatWrapper />
      </body>
    </html>
  );
}
