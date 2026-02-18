"use client";

import { useEffect, useState } from "react";
import { Instagram, Facebook, Youtube, Twitter, Globe, Heart } from "lucide-react";
import { getConfig } from "@/lib/store";
import { StoreConfig } from "@/lib/types";

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.3z" />
    </svg>
  );
}

function PinterestIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.96s-.36-.72-.36-1.78c0-1.66.97-2.9 2.17-2.9 1.02 0 1.52.77 1.52 1.7 0 1.03-.66 2.58-1 4.01-.28 1.2.6 2.17 1.78 2.17 2.14 0 3.78-2.26 3.78-5.5 0-2.88-2.07-4.89-5.02-4.89-3.42 0-5.43 2.57-5.43 5.22 0 1.03.4 2.14.9 2.74a.36.36 0 0 1 .08.35l-.33 1.36c-.05.23-.18.27-.42.16-1.56-.73-2.54-3-2.54-4.84 0-3.94 2.86-7.55 8.25-7.55 4.33 0 7.7 3.09 7.7 7.2 0 4.3-2.71 7.77-6.48 7.77-1.27 0-2.46-.66-2.86-1.44l-.78 2.97c-.28 1.08-1.04 2.44-1.55 3.27A12 12 0 1 0 12 0z" />
    </svg>
  );
}

export default function Footer() {
  const [config, setConfig] = useState<StoreConfig | null>(null);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  const socialLinks = config?.socialLinks;

  return (
    <footer className="bg-brand-dark text-brand-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/logo.png"
                alt="Reactivate MBS Logo"
                className="h-12 w-12 object-cover rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div>
                <h3 className="text-xl font-display font-bold text-white">
                  Reactivate MBS
                </h3>
                <p className="text-sm text-brand-cream/50 tracking-[0.15em] uppercase">
                  Mind Body &amp; Soul LLC
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-brand-cream/60">
              Handcrafted candles and premium beauty products made with love and intention.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition-colors">Shop All</a>
              </li>
              <li>
                <a href="/#about" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-white transition-colors">Contact</a>
              </li>
              <li>
                <a href="/admin" className="hover:text-white transition-colors">Store Admin</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Follow Us
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks?.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-brand-medium flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all"
                  title="Instagram"
                >
                  <Instagram size={18} />
                </a>
              )}
              {socialLinks?.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-brand-medium flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all"
                  title="Facebook"
                >
                  <Facebook size={18} />
                </a>
              )}
              {socialLinks?.tiktok && (
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-brand-medium flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all"
                  title="TikTok"
                >
                  <TikTokIcon size={18} />
                </a>
              )}
              {socialLinks?.pinterest && (
                <a
                  href={socialLinks.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-brand-medium flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all"
                  title="Pinterest"
                >
                  <PinterestIcon size={18} />
                </a>
              )}
              {socialLinks?.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-brand-medium flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all"
                  title="YouTube"
                >
                  <Youtube size={18} />
                </a>
              )}
              {socialLinks?.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-brand-medium flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all"
                  title="Twitter/X"
                >
                  <Twitter size={18} />
                </a>
              )}
              {socialLinks?.website && (
                <a
                  href={socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-brand-medium flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all"
                  title="Website"
                >
                  <Globe size={18} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-brand-medium/50 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-brand-cream/40">
            &copy; {new Date().getFullYear()} Reactivate MBS Mind Body &amp; Soul LLC. All rights reserved.
          </p>
          <p className="text-xs text-brand-cream/40 flex items-center gap-1">
            Made with <Heart size={12} className="text-rose-400" /> for your wellness
          </p>
        </div>
      </div>
    </footer>
  );
}
