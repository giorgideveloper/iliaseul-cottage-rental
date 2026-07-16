import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, Lock, User } from "lucide-react";
import { motion } from "motion/react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "შესვლა ვერ მოხდა");
        return;
      }

      localStorage.setItem("iliaseul_admin_token", data.token);
      localStorage.setItem("iliaseul_admin_username", data.username);
      navigate("/admin/dashboard");
    } catch {
      setError("სერვერთან კავშირი ვერ დამყარდა");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-emerald-900/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-900/60 border border-emerald-700/40 flex items-center justify-center mb-4 shadow-lg">
              <Shield size={32} className="text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-white font-serif">
              ადმინ პანელი
            </h1>
            <p className="text-stone-400 text-sm mt-1">
              Iliaseul Admin Dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs text-stone-400 uppercase tracking-widest mb-2">
                მომხმარებელი
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  placeholder="admin"
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl pl-9 pr-4 py-3 text-white text-sm placeholder:text-stone-600 focus:outline-none focus:border-emerald-600 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs text-stone-400 uppercase tracking-widest mb-2">
                პაროლი
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl pl-9 pr-10 py-3 text-white text-sm placeholder:text-stone-600 focus:outline-none focus:border-emerald-600 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-950/60 border border-red-800/60 rounded-xl px-4 py-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 tracking-wider text-sm mt-2"
            >
              {loading ? "მიმდინარეობს..." : "შესვლა"}
            </button>
          </form>

          {/* Back link */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-stone-500 hover:text-stone-300 text-xs transition-colors"
            >
              ← საიტზე დაბრუნება
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
