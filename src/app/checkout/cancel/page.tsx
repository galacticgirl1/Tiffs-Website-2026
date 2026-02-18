"use client";

import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-md w-full text-center shadow-lg">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={32} className="text-red-500" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-brand-dark mb-3">
          Order Cancelled
        </h1>
        <p className="text-brand-light leading-relaxed mb-6">
          Your payment was not processed. Your cart items are still saved —
          feel free to try again when you&apos;re ready.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-brand-medium transition-all"
        >
          <ArrowLeft size={16} />
          Back to Store
        </Link>
      </div>
    </div>
  );
}
