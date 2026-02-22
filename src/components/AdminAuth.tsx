"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { AdminPasswordProvider } from "@/lib/admin-context";

const ADMIN_PASSWORD = "Starseed888#";

interface AdminAuthProps {
  children: React.ReactNode;
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAdminPassword(password);
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-brand-dark rounded-full flex items-center justify-center">
              <Lock size={28} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-display font-bold text-brand-dark text-center mb-2">
            Admin Access
          </h1>
          <p className="text-sm text-brand-light text-center mb-6">
            Enter the admin password to continue
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter password"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-brand-cream bg-cream focus:outline-none focus:ring-2 focus:ring-brand-dark text-brand-dark"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-light hover:text-brand-dark transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-brand-dark text-white py-3 rounded-xl font-semibold text-sm uppercase tracking-wider hover:bg-brand-medium transition-all"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminPasswordProvider password={adminPassword}>{children}</AdminPasswordProvider>;
}
