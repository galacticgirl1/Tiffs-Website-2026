"use client";

import { useEffect, useState } from "react";
import { Sparkles, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import WelcomeAudio from "@/components/WelcomeAudio";
import ChakraLady from "@/components/ChakraLady";
import { getProducts, getConfig } from "@/lib/store";
import { getCart, addToCart, getCartCount, CartItem } from "@/lib/cart";
import { Product, StoreConfig, CATEGORIES } from "@/lib/types";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [config, setConfig] = useState<StoreConfig | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    setProducts(getProducts());
    setConfig(getConfig());
    setCart(getCart());
  }, []);

  function handleAddToCart(product: Product) {
    const updated = addToCart(product);
    setCart(updated);
    setCartOpen(true);
  }

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={getCartCount(cart)} onCartClick={() => setCartOpen(true)} />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onCartUpdate={setCart}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-dark via-brand-medium to-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gray-400 rounded-full blur-3xl" />
        </div>
        {/* Chakra Lady — top left corner */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 hidden sm:block">
          <div className="relative">
            <img
              src="/chakra-lady.png"
              alt="Chakra meditation"
              className="w-40 md:w-52 lg:w-64"
              style={{ transform: "scaleX(-1)", mixBlendMode: "lighten" }}
            />
            {/* Electric current ring around ball */}
            <svg className="absolute top-[40%] left-[25%] w-[50%] h-[28%] pointer-events-none" viewBox="0 0 60 60" fill="none">
              <ellipse cx="30" cy="30" rx="26" ry="26" stroke="rgba(100,180,255,0.5)" strokeWidth="0.8" className="animate-electricity-1" fill="none" />
              <ellipse cx="30" cy="30" rx="24" ry="24" stroke="rgba(150,210,255,0.4)" strokeWidth="0.6" className="animate-electricity-2" fill="none" />
              <ellipse cx="30" cy="30" rx="28" ry="28" stroke="rgba(80,160,255,0.3)" strokeWidth="0.5" className="animate-electricity-3" fill="none" />
              <path d="M4 30 Q10 20 16 28 Q20 14 26 24 Q30 8 34 24 Q38 14 44 28 Q50 20 56 30" stroke="rgba(150,200,255,0.7)" strokeWidth="0.7" fill="none" className="animate-electricity-2" />
              <path d="M4 30 Q10 40 16 32 Q20 46 26 36 Q30 52 34 36 Q38 46 44 32 Q50 40 56 30" stroke="rgba(120,190,255,0.6)" strokeWidth="0.7" fill="none" className="animate-electricity-3" />
              <path d="M30 4 Q20 10 28 16 Q14 20 24 26 Q8 30 24 34 Q14 38 28 44 Q20 50 30 56" stroke="rgba(140,200,255,0.5)" strokeWidth="0.6" fill="none" className="animate-electricity-1" />
              <path d="M30 4 Q40 10 32 16 Q46 20 36 26 Q52 30 36 34 Q46 38 32 44 Q40 50 30 56" stroke="rgba(130,195,255,0.5)" strokeWidth="0.6" fill="none" className="animate-electricity-2" />
            </svg>
          </div>
        </div>
        {/* Chakra Lady — top right corner */}
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 hidden sm:block">
          <div className="relative">
            <img
              src="/chakra-lady.png"
              alt="Chakra meditation"
              className="w-40 md:w-52 lg:w-64"
              style={{ mixBlendMode: "lighten" }}
            />
            {/* Electric current ring around ball */}
            <svg className="absolute top-[40%] left-[25%] w-[50%] h-[28%] pointer-events-none" viewBox="0 0 60 60" fill="none">
              <ellipse cx="30" cy="30" rx="26" ry="26" stroke="rgba(100,180,255,0.5)" strokeWidth="0.8" className="animate-electricity-1" fill="none" />
              <ellipse cx="30" cy="30" rx="24" ry="24" stroke="rgba(150,210,255,0.4)" strokeWidth="0.6" className="animate-electricity-3" fill="none" />
              <ellipse cx="30" cy="30" rx="28" ry="28" stroke="rgba(80,160,255,0.3)" strokeWidth="0.5" className="animate-electricity-2" fill="none" />
              <path d="M4 30 Q10 20 16 28 Q20 14 26 24 Q30 8 34 24 Q38 14 44 28 Q50 20 56 30" stroke="rgba(150,200,255,0.7)" strokeWidth="0.7" fill="none" className="animate-electricity-3" />
              <path d="M4 30 Q10 40 16 32 Q20 46 26 36 Q30 52 34 36 Q38 46 44 32 Q50 40 56 30" stroke="rgba(120,190,255,0.6)" strokeWidth="0.7" fill="none" className="animate-electricity-1" />
              <path d="M30 4 Q20 10 28 16 Q14 20 24 26 Q8 30 24 34 Q14 38 28 44 Q20 50 30 56" stroke="rgba(140,200,255,0.5)" strokeWidth="0.6" fill="none" className="animate-electricity-2" />
              <path d="M30 4 Q40 10 32 16 Q46 20 36 26 Q52 30 36 34 Q46 38 32 44 Q40 50 30 56" stroke="rgba(130,195,255,0.5)" strokeWidth="0.6" fill="none" className="animate-electricity-1" />
            </svg>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
          <img
            src="/logo.png"
            alt="Reactivate M.B.S. Mind Body & Soul - Soak in Bliss"
            className="h-40 sm:h-52 lg:h-64 w-auto object-contain mx-auto mb-8 rounded-full shadow-2xl ring-2 ring-white/20"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={20} className="text-brand-gold" />
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gold">
              Soak in Bliss
            </span>
            <Sparkles size={20} className="text-brand-gold" />
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold mb-4">
            <span className="text-brand-gold">Reactivate</span>{" "}
            <span className="text-brand-cream">MBS</span>
          </h1>
          <p className="text-lg sm:text-2xl font-display text-brand-cream/70 mb-6 tracking-wide">
            Mind Body &amp; Soul
          </p>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-brand-cream/60 leading-relaxed mb-8">
            {config?.aboutText ||
              "We are an aroma therapy & holistic healing company that sells all natural and organic products. We create handcrafted candles and curate premium beauty products to nourish your mind, body, and soul. Every product is made with love and intention."}
          </p>
          <WelcomeAudio />
          <a
            href="#shop"
            className="electric-card-hover inline-flex items-center gap-2 bg-white text-brand-dark px-8 py-3 rounded-full font-semibold uppercase tracking-wider text-sm hover:bg-brand-cream transition-colors duration-300"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-dark mb-2">
              Featured Products
            </h2>
            <p className="text-brand-light">Our most loved items, handpicked for you</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </section>
      )}

      {/* Coming Soon — Clothing Apparel */}
      <section className="relative bg-brand-dark py-16 overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] font-bold mb-4 animate-text-shine-grey">✦ Coming Soon ✦</p>
          <h2 className="text-4xl sm:text-6xl font-display font-bold mb-4 animate-text-shine-grey">
            Clothing &amp; Apparel
          </h2>
          <div className="w-16 h-0.5 bg-white/20 mx-auto mb-4" />
          <p className="text-brand-cream/50 text-sm sm:text-base max-w-xl mx-auto">
            We&apos;re expanding! Stay tuned for our exclusive line of branded clothing and apparel — designed with the same love and intention as all our products.
          </p>
        </div>
      </section>

      {/* Shop All */}
      <section id="shop" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-dark mb-2">
              Shop All Products
            </h2>
            <p className="text-brand-light">Browse our complete collection</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-brand-dark text-brand-cream"
                  : "bg-brand-cream text-brand-medium hover:bg-brand-dark hover:text-brand-cream"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.value
                    ? "bg-brand-dark text-brand-cream"
                    : "bg-brand-cream text-brand-medium hover:bg-brand-dark hover:text-brand-cream"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-brand-light">
              <p className="text-lg">No products in this category yet.</p>
              <p className="text-sm mt-2">
                Check back soon — new products are added regularly!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-dark mb-4">
              Our Story
            </h2>
            <p className="text-brand-light leading-relaxed mb-4">
              {config?.aboutText ||
                "Welcome to Reactivate MBS Mind Body & Soul LLC. We create handcrafted candles and curate premium beauty products to nourish your mind, body, and soul."}
            </p>
            <p className="text-brand-light leading-relaxed">
              Every product is carefully crafted or selected with your wellness in mind. We believe
              that self-care is not a luxury — it&apos;s a necessity. Our mission is to help you
              create moments of peace, beauty, and rejuvenation in your everyday life.
            </p>
          </div>
          <div className="bg-gradient-to-br from-brand-dark/5 to-brand-cream rounded-3xl p-10 text-center">
            <Sparkles size={48} className="text-brand-dark mx-auto mb-4" />
            <h3 className="text-2xl font-display font-bold text-brand-dark mb-2">
              Our Promise
            </h3>
            <ul className="text-sm text-brand-medium space-y-2">
              <li>Handcrafted with premium ingredients</li>
              <li>Cruelty-free &amp; eco-conscious</li>
              <li>Made with love &amp; intention</li>
              <li>Supporting women&apos;s wellness</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-brand-dark text-brand-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-gold mb-4">
            Get In Touch
          </h2>
          <p className="text-brand-cream/60 mb-8 max-w-lg mx-auto">
            Have questions about our products or want to place a custom order? We&apos;d love to
            hear from you!
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2 text-brand-cream/70">
              <Mail size={18} className="text-brand-gold" />
              <a href="mailto:reactivatembs@gmail.com" className="text-sm hover:text-white transition-colors">reactivatembs@gmail.com</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
