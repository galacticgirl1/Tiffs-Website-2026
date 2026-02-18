"use client";

import { useState } from "react";
import {
  X,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Loader2,
} from "lucide-react";
import SpaBasketIcon from "@/components/SpaBasketIcon";
import {
  CartItem,
  removeFromCart,
  updateCartQuantity,
  getCartTotal,
} from "@/lib/cart";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onCartUpdate: (cart: CartItem[]) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onCartUpdate,
}: CartDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = getCartTotal(cart);

  function handleRemove(productId: string) {
    const updated = removeFromCart(productId);
    onCartUpdate(updated);
  }

  function handleQuantity(productId: string, quantity: number) {
    const updated = updateCartQuantity(productId, quantity);
    onCartUpdate(updated);
  }

  async function handleCheckout() {
    if (cart.length === 0) return;

    setLoading(true);
    setError("");

    try {
      const items = cart.map((item) => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        imageUrl: item.product.imageUrl,
      }));

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, origin: window.location.origin }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      if (message.includes("REPLACE_WITH")) {
        setError(
          "Stripe is not configured yet. Add your Stripe API keys to .env.local to enable payments."
        );
      } else {
        setError(message);
      }
      setLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-brand-cream">
            <div className="flex items-center gap-2">
              <SpaBasketIcon size={22} className="text-brand-dark" />
              <h2 className="text-lg font-display font-bold text-brand-dark">
                Your Cart
              </h2>
              <span className="text-sm text-brand-light">
                ({cart.length} {cart.length === 1 ? "item" : "items"})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-brand-light hover:text-brand-dark transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <SpaBasketIcon
                  size={48}
                  className="text-brand-light mx-auto mb-4"
                />
                <p className="text-brand-medium">Your cart is empty</p>
                <p className="text-sm text-brand-light mt-1">
                  Add some products to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3 bg-cream rounded-xl p-3"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-brand-cream flex-shrink-0">
                      {item.product.imageUrl ? (
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <SpaBasketIcon
                            size={20}
                            className="text-brand-light"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-brand-dark truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-brand-dark font-bold">
                        ${item.product.price.toFixed(2)}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                            className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-brand-medium hover:bg-brand-dark hover:text-white transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-medium text-brand-dark w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-brand-medium hover:bg-brand-dark hover:text-white transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.product.id)}
                          className="p-1 text-brand-light hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Total & Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-brand-cream px-6 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-medium">Subtotal</span>
                <span className="text-lg font-bold text-brand-dark">
                  ${total.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-brand-light">
                Shipping calculated at checkout
              </p>

              {error && (
                <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-brand-dark text-brand-cream py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider hover:bg-brand-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard size={16} />
                    Checkout - ${total.toFixed(2)}
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 pt-1">
                <span className="text-[10px] text-brand-light uppercase tracking-wider">
                  Secure payment via Stripe
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
