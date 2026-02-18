"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Settings } from "lucide-react";
import SpaBasketIcon from "@/components/SpaBasketIcon";

interface HeaderProps {
  cartCount?: number;
  onCartClick?: () => void;
}

export default function Header({ cartCount = 0, onCartClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-brand-dark text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Reactivate MBS Logo"
              className="h-10 sm:h-14 w-10 sm:w-14 object-cover rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-display font-bold tracking-wide text-brand-gold">
                Reactivate MBS
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-brand-cream/70">
                Mind Body &amp; Soul
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm tracking-wide uppercase text-brand-cream/80 hover:text-brand-gold transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/#about"
              className="text-sm tracking-wide uppercase text-brand-cream/80 hover:text-brand-gold transition-colors"
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="text-sm tracking-wide uppercase text-brand-cream/80 hover:text-brand-gold transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-sm tracking-wide uppercase text-brand-cream/60 hover:text-brand-gold transition-colors"
            >
              <Settings size={14} />
              Admin
            </Link>
            {onCartClick && (
              <button
                onClick={onCartClick}
                className="relative text-brand-cream/80 hover:text-brand-gold transition-colors"
              >
                <SpaBasketIcon size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-brand-dark text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            {onCartClick && (
              <button
                onClick={onCartClick}
                className="relative text-brand-cream/80 hover:text-white transition-colors"
              >
                <SpaBasketIcon size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-brand-dark text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-brand-cream"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-brand-dark border-t border-brand-medium">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block text-sm tracking-wide uppercase text-brand-cream/80 hover:text-brand-gold"
            >
              Shop
            </Link>
            <Link
              href="/#about"
              onClick={() => setMenuOpen(false)}
              className="block text-sm tracking-wide uppercase text-brand-cream/80 hover:text-brand-gold"
            >
              About
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="block text-sm tracking-wide uppercase text-brand-cream/80 hover:text-brand-gold"
            >
              Contact
            </Link>
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1 text-sm tracking-wide uppercase text-brand-cream/60 hover:text-brand-gold"
            >
              <Settings size={14} />
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
