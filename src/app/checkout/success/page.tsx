"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowLeft, Package, Printer, Mail } from "lucide-react";
import { getCart, clearCart, getCartTotal, CartItem } from "@/lib/cart";
import { addOrder, getOrderBySessionId, Order } from "@/lib/orders";

export default function CheckoutSuccess() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center"><p className="text-brand-light">Loading...</p></div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || "";
  const [order, setOrder] = useState<Order | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const existing = sessionId ? getOrderBySessionId(sessionId) : null;
    if (existing) {
      setOrder(existing);
      clearCart();
      return;
    }

    const items = getCart();
    setCartItems(items);

    if (items.length > 0) {
      const newOrder = addOrder({
        stripeSessionId: sessionId,
        items: items.map((item) => ({
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          imageUrl: item.product.imageUrl,
        })),
        subtotal: getCartTotal(items),
        status: "paid",
        customerEmail: "",
        shippingAddress: "",
        notes: "",
      });
      setOrder(newOrder);
      clearCart();
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Confirmation Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 text-center shadow-lg mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-brand-dark mb-2">
            Order Confirmed!
          </h1>
          {order && (
            <p className="text-brand-dark font-bold text-lg mb-2">
              Order #{order.id}
            </p>
          )}
          <p className="text-brand-light leading-relaxed max-w-md mx-auto">
            Thank you for your purchase! Your order has been received and is
            being prepared with care. You will receive an email confirmation
            shortly.
          </p>
        </div>

        {/* Order Details */}
        {order && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-6">
            <h2 className="text-lg font-display font-bold text-brand-dark mb-4 flex items-center gap-2">
              <Package size={20} className="text-brand-dark" />
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-cream rounded-xl p-3"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-brand-cream flex-shrink-0">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package size={20} className="text-brand-light" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-brand-dark text-sm">
                      {item.name}
                    </p>
                    <p className="text-xs text-brand-light">
                      Qty: {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <span className="font-bold text-brand-dark text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-cream pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-brand-light">Subtotal</span>
                <span className="text-brand-dark font-medium">
                  ${order.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-light">Shipping</span>
                <span className="text-brand-dark font-medium">
                  Calculated by Stripe
                </span>
              </div>
              <div className="flex justify-between text-base pt-2 border-t border-brand-cream">
                <span className="font-bold text-brand-dark">Total</span>
                <span className="font-bold text-brand-dark text-lg">
                  ${order.subtotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* What's Next */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-6">
          <h2 className="text-lg font-display font-bold text-brand-dark mb-4">
            What Happens Next?
          </h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-dark/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-brand-dark">1</span>
              </div>
              <div>
                <p className="font-semibold text-brand-dark text-sm">
                  Order Confirmation
                </p>
                <p className="text-xs text-brand-light">
                  You&apos;ll receive an email with your order details and receipt.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-dark/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-brand-dark">2</span>
              </div>
              <div>
                <p className="font-semibold text-brand-dark text-sm">
                  Preparation
                </p>
                <p className="text-xs text-brand-light">
                  We&apos;ll carefully prepare and package your items with love.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-dark/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-brand-dark">3</span>
              </div>
              <div>
                <p className="font-semibold text-brand-dark text-sm">
                  Shipping
                </p>
                <p className="text-xs text-brand-light">
                  You&apos;ll receive a tracking number once your order ships.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-brand-medium transition-all"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
          <button
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center gap-2 bg-white text-brand-medium px-6 py-3 rounded-xl font-semibold text-sm hover:bg-brand-dark hover:text-brand-cream transition-all border border-brand-cream"
          >
            <Printer size={16} />
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
