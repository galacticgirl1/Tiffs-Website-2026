"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  ArrowLeft,
  ImageIcon,
  ExternalLink,
  Settings,
  Package,
  ClipboardList,
  MessageCircle,
} from "lucide-react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getConfig,
  saveConfig,
} from "@/lib/store";
import { Product, StoreConfig, CATEGORIES } from "@/lib/types";

type Tab = "products" | "settings";

interface ProductForm {
  name: string;
  description: string;
  price: string;
  category: Product["category"];
  imageUrl: string;
  purchaseLink: string;
  featured: boolean;
  inStock: boolean;
}

const emptyForm: ProductForm = {
  name: "",
  description: "",
  price: "",
  category: "candles",
  imageUrl: "",
  purchaseLink: "",
  featured: false,
  inStock: true,
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [config, setConfig] = useState<StoreConfig | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("products");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    setProducts(getProducts());
    setConfig(getConfig());
  }, []);

  function showSaved(msg: string) {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(""), 3000);
  }

  function handleAddNew() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function handleEdit(product: Product) {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      imageUrl: product.imageUrl,
      purchaseLink: product.purchaseLink,
      featured: product.featured,
      inStock: product.inStock,
    });
    setEditingId(product.id);
    setShowForm(true);
  }

  function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
      setProducts(getProducts());
      showSaved("Product deleted!");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const price = parseFloat(form.price);
    if (isNaN(price) || price < 0) {
      alert("Please enter a valid price.");
      return;
    }

    const productData = {
      name: form.name,
      description: form.description,
      price,
      category: form.category,
      imageUrl: form.imageUrl,
      purchaseLink: form.purchaseLink,
      featured: form.featured,
      inStock: form.inStock,
    };

    if (editingId) {
      updateProduct(editingId, productData);
      showSaved("Product updated!");
    } else {
      addProduct(productData);
      showSaved("Product added!");
    }

    setProducts(getProducts());
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function handleSaveConfig() {
    if (config) {
      saveConfig(config);
      showSaved("Settings saved!");
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Admin Header */}
      <header className="bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-brand-cream/60 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft size={16} />
                Back to Store
              </Link>
              <span className="text-brand-cream/30">|</span>
              <h1 className="text-lg font-display font-bold text-white">
                Store Admin
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Save Message Toast */}
      {saveMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg text-sm font-medium animate-pulse">
          {saveMessage}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === "products"
                ? "bg-brand-dark text-brand-cream"
                : "bg-white text-brand-medium hover:bg-brand-dark hover:text-brand-cream"
            }`}
          >
            <Package size={16} />
            Products ({products.length})
          </button>
          <Link
            href="/admin/orders"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all bg-white text-brand-medium hover:bg-brand-dark hover:text-brand-cream"
          >
            <ClipboardList size={16} />
            Order Log
          </Link>
          <Link
            href="/admin/chat"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all bg-white text-brand-medium hover:bg-brand-dark hover:text-brand-cream"
          >
            <MessageCircle size={16} />
            Live Chat
          </Link>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === "settings"
                ? "bg-brand-dark text-brand-cream"
                : "bg-white text-brand-medium hover:bg-brand-dark hover:text-brand-cream"
            }`}
          >
            <Settings size={16} />
            Store Settings
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            {!showForm ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-bold text-brand-dark">
                    Manage Products
                  </h2>
                  <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 bg-brand-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-medium transition-all"
                  >
                    <Plus size={16} />
                    Add Product
                  </button>
                </div>

                {products.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center">
                    <Package size={48} className="text-brand-light mx-auto mb-4" />
                    <p className="text-brand-medium text-lg mb-2">No products yet</p>
                    <p className="text-brand-light text-sm mb-6">
                      Add your first product to get started!
                    </p>
                    <button
                      onClick={handleAddNew}
                      className="inline-flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-xl font-semibold text-sm"
                    >
                      <Plus size={16} />
                      Add Your First Product
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-brand-cream flex-shrink-0">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon size={24} className="text-brand-light" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-brand-dark truncate">
                              {product.name}
                            </h3>
                            {product.featured && (
                              <span className="text-[10px] bg-brand-cream text-brand-dark px-2 py-0.5 rounded-full font-medium">
                                Featured
                              </span>
                            )}
                            {!product.inStock && (
                              <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                                Out of Stock
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-brand-light truncate">
                            {product.category} &middot; ${product.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {product.purchaseLink && product.purchaseLink !== "#" && (
                            <a
                              href={product.purchaseLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-brand-light hover:text-brand-dark transition-colors"
                              title="View purchase link"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 text-brand-light hover:text-blue-600 transition-colors"
                            title="Edit product"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-brand-light hover:text-red-600 transition-colors"
                            title="Delete product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* Product Form */
              <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-bold text-brand-dark">
                    {editingId ? "Edit Product" : "Add New Product"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                    }}
                    className="p-2 text-brand-light hover:text-brand-dark transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-brand-medium mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-cream bg-cream focus:outline-none focus:ring-2 focus:ring-brand-dark text-brand-dark"
                      placeholder="e.g. Lavender Serenity Candle"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-medium mb-1">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-cream bg-cream focus:outline-none focus:ring-2 focus:ring-brand-dark text-brand-dark resize-none"
                      placeholder="Describe your product..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-medium mb-1">
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        required
                        step="0.01"
                        min="0"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-cream bg-cream focus:outline-none focus:ring-2 focus:ring-brand-dark text-brand-dark"
                        placeholder="24.99"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-medium mb-1">
                        Category *
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) =>
                          setForm({ ...form, category: e.target.value as Product["category"] })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-cream bg-cream focus:outline-none focus:ring-2 focus:ring-brand-dark text-brand-dark"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-medium mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={form.imageUrl}
                      onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-cream bg-cream focus:outline-none focus:ring-2 focus:ring-brand-dark text-brand-dark"
                      placeholder="https://example.com/image.jpg"
                    />
                    <p className="text-xs text-brand-light mt-1">
                      Paste a direct link to a product image (from Unsplash, your website, etc.)
                    </p>
                    {form.imageUrl && (
                      <div className="mt-2 w-24 h-24 rounded-lg overflow-hidden border border-brand-cream">
                        <img
                          src={form.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-medium mb-1">
                      Purchase Link
                    </label>
                    <input
                      type="url"
                      value={form.purchaseLink}
                      onChange={(e) => setForm({ ...form, purchaseLink: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-cream bg-cream focus:outline-none focus:ring-2 focus:ring-brand-dark text-brand-dark"
                      placeholder="https://etsy.com/your-product or https://shopify.com/..."
                    />
                    <p className="text-xs text-brand-light mt-1">
                      Link to where customers can buy this product (Etsy, Shopify, Amazon, etc.)
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                        className="w-4 h-4 rounded border-brand-cream text-brand-dark focus:ring-brand-dark"
                      />
                      <span className="text-sm text-brand-medium">Featured product</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.inStock}
                        onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                        className="w-4 h-4 rounded border-brand-cream text-brand-dark focus:ring-brand-dark"
                      />
                      <span className="text-sm text-brand-medium">In stock</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-brand-medium transition-all"
                    >
                      <Save size={16} />
                      {editingId ? "Save Changes" : "Add Product"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingId(null);
                      }}
                      className="px-6 py-3 rounded-xl text-sm font-medium text-brand-light hover:text-brand-dark transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && config && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-display font-bold text-brand-dark mb-6">
              Store Settings
            </h2>

            <div className="bg-white rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-display font-semibold text-brand-dark mb-4">
                  Business Info
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-medium mb-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={config.businessName}
                      onChange={(e) =>
                        setConfig({ ...config, businessName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-cream bg-cream focus:outline-none focus:ring-2 focus:ring-brand-dark text-brand-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-medium mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={config.tagline}
                      onChange={(e) =>
                        setConfig({ ...config, tagline: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-cream bg-cream focus:outline-none focus:ring-2 focus:ring-brand-dark text-brand-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-medium mb-1">
                      About Text
                    </label>
                    <textarea
                      rows={4}
                      value={config.aboutText}
                      onChange={(e) =>
                        setConfig({ ...config, aboutText: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-cream bg-cream focus:outline-none focus:ring-2 focus:ring-brand-dark text-brand-dark resize-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-display font-semibold text-brand-dark mb-4">
                  Social Media Links
                </h3>
                <p className="text-sm text-brand-light mb-4">
                  Add your social media URLs. Leave blank to hide a link.
                </p>
                <div className="space-y-3">
                  {(
                    [
                      ["instagram", "Instagram URL"],
                      ["facebook", "Facebook URL"],
                      ["tiktok", "TikTok URL"],
                      ["pinterest", "Pinterest URL"],
                      ["youtube", "YouTube URL"],
                      ["twitter", "Twitter/X URL"],
                      ["website", "Other Website URL"],
                    ] as const
                  ).map(([key, label]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-brand-medium mb-1">
                        {label}
                      </label>
                      <input
                        type="url"
                        value={config.socialLinks[key]}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            socialLinks: {
                              ...config.socialLinks,
                              [key]: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-cream bg-cream focus:outline-none focus:ring-2 focus:ring-brand-dark text-brand-dark"
                        placeholder={`https://${key}.com/reactivatembs`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSaveConfig}
                className="flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-brand-medium transition-all"
              >
                <Save size={16} />
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
