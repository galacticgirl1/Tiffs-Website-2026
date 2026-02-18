"use client";

import { ExternalLink, Plus } from "lucide-react";
import SpaBasketIcon from "@/components/SpaBasketIcon";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-brand-cream">
      <div className="relative aspect-square overflow-hidden bg-brand-cream">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-light">
            <SpaBasketIcon size={48} />
          </div>
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 bg-white text-brand-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
            Featured
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-brand-dark text-sm font-bold px-4 py-2 rounded-full">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-lg font-semibold text-brand-dark leading-tight">
            {product.name}
          </h3>
          <span className="text-lg font-bold text-brand-dark whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-brand-light leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-2">
          <span className="inline-block text-[10px] uppercase tracking-wider text-brand-medium bg-brand-cream px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        {product.inStock && (
          <div className="mt-4 flex gap-2">
            {onAddToCart && (
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 flex items-center justify-center gap-2 bg-brand-dark text-white py-3 rounded-xl text-sm font-semibold uppercase tracking-wider hover:bg-brand-medium transition-all duration-300"
              >
                <Plus size={16} />
                Add to Cart
              </button>
            )}
            {product.purchaseLink && product.purchaseLink !== "#" && (
              <a
                href={product.purchaseLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 bg-brand-cream text-brand-medium px-4 py-3 rounded-xl text-sm font-semibold hover:bg-brand-dark hover:text-brand-cream transition-all duration-300"
                title="Buy externally"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        )}

        {!product.inStock && (
          <div className="mt-4 w-full flex items-center justify-center gap-2 bg-brand-cream text-brand-medium py-3 rounded-xl text-sm font-semibold uppercase tracking-wider">
            Sold Out
          </div>
        )}
      </div>
    </div>
  );
}
