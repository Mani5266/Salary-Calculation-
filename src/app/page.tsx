"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import dynamic from "next/dynamic";

const HomeContent = dynamic(() => import("@/components/HomeContent"), {
  ssr: false,
});

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--bg-base)]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-xl bg-[var(--accent)] opacity-20 animate-ping" />
            <div className="relative w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-[var(--text-muted)] font-medium">Loading Salary Agent...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <HomeContent />;
  }

  return <LoginPage />;
}

function LoginPage() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    if (mode === "login") {
      const { error: err } = await signIn(email, password);
      if (err) setError(err);
    } else {
      const { error: err } = await signUp(email, password);
      if (err) {
        setError(err);
      } else {
        setSuccess("Account created! Check your email to confirm, then sign in.");
        setMode("login");
      }
    }

    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* ─── Left Panel (Dark / Branding) ─── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between bg-[#0B0F19]">
        {/* Background decorative shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#2563EB]/8 to-transparent" />
          <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#3B82F6]/5 to-transparent" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-gradient-to-tl from-[#2563EB]/4 to-transparent" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full px-14 py-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center shadow-lg shadow-[var(--accent)]/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">On Easy</span>
          </div>

          {/* Hero area */}
          <div className="flex-1 flex flex-col justify-center -mt-10">
            <div className="mb-8">
              <h2 className="text-[2.75rem] leading-[1.1] font-bold text-white tracking-tight max-w-md">
                Smart Salary<br />Calculations
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-[#7B8BA8] max-w-sm">
                Compute accurate salary structures, generate payslips, and get instant answers to payroll questions.
              </p>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 mb-10">
              {[
                { value: "16", label: "XLSX Formulas" },
                { value: "100%", label: "Compliance" },
                { value: "<1s", label: "Computation" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-white font-mono">{stat.value}</p>
                  <p className="text-[11px] text-[#5A6A84] uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Feature list */}
            <div className="space-y-3.5">
              {[
                { icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z", text: "CTC Structuring & Breakdown" },
                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", text: "Statutory Compliance (EPF, ESI, PT)" },
                { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", text: "Professional Payslip Generation" },
              ].map((feature) => (
                <div key={feature.text} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:bg-[var(--accent)]/10 group-hover:border-[var(--accent)]/20 transition-colors">
                    <svg className="w-4 h-4 text-[#7B8BA8] group-hover:text-[var(--accent)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                    </svg>
                  </div>
                  <span className="text-[14px] text-[#94A3B8] font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-[12px] text-[#3D4A63]">
            &copy; {new Date().getFullYear()} On Easy. Built with Next.js.
          </p>
        </div>
      </div>

      {/* ─── Right Panel (White / Auth Form) ─── */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12 lg:px-16">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo (visible only on small screens) */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-lg bg-[#0F1629] flex items-center justify-center">
              <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <span className="text-lg font-bold text-[#1A1F36] tracking-tight">On Easy</span>
          </div>

          {/* Heading */}
          <h1 className="text-[1.75rem] font-bold text-[#0F1629] leading-tight">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-[14px] text-[#64748B]">
            {mode === "login"
              ? "Enter your credentials to access the dashboard."
              : "Fill in your details to get started."}
          </p>

          {/* Login / Sign Up toggle */}
          <div className="mt-7 flex rounded-lg bg-[#F1F5F9] p-1">
            <button
              type="button"
              onClick={() => { setMode("login"); setError(""); setSuccess(""); }}
              className={`flex-1 py-2.5 text-[13px] font-semibold rounded-md transition-all duration-200 ${
                mode === "login"
                  ? "bg-white text-[#0F1629] shadow-sm"
                  : "text-[#64748B] hover:text-[#475569]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode("signup"); setError(""); setSuccess(""); }}
              className={`flex-1 py-2.5 text-[13px] font-semibold rounded-md transition-all duration-200 ${
                mode === "signup"
                  ? "bg-white text-[#0F1629] shadow-sm"
                  : "text-[#64748B] hover:text-[#475569]"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="auth-input"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="auth-input pr-11"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#94A3B8] hover:text-[#475569] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2.5 text-[13px] text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-4 py-3">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {error}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2.5 text-[13px] text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg px-4 py-3">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-lg bg-[#0F1629] text-white text-[14px] font-semibold transition-all duration-200 hover:bg-[#1A2744] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Footer note */}
          <p className="mt-8 text-center text-[12px] text-[#94A3B8]">
            Powered by Supabase Auth
          </p>
        </div>
      </div>
    </div>
  );
}
