"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Lock, Compass } from "lucide-react";
import { login } from "../actions";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const success = searchParams.get('success');

  return (
    <form className="space-y-5" action={login}>
      {success && (
        <div className="p-3 mb-4 text-sm text-green-300 bg-emerald-950/40 border border-emerald-900/40 rounded-xl">
          {success}
        </div>
      )}
      {error && (
        <div className="p-3 mb-4 text-sm text-red-400 bg-red-950/50 border border-red-900/50 rounded-xl">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <label className="text-sm font-medium text-traverse-frost/80">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-traverse-frost/40" />
          <input 
            type="email" 
            name="email"
            required
            placeholder="voyager@traverse.ai" 
            className="w-full py-3 pl-12 pr-4 text-white placeholder-traverse-frost/30 transition-all bg-traverse-midnight/50 border rounded-xl border-traverse-frost/10 focus:border-traverse-cyan focus:outline-none focus:ring-1 focus:ring-traverse-cyan"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-traverse-frost/80">Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-traverse-frost/40" />
          <input 
            type="password" 
            name="password"
            required
            placeholder="••••••••" 
            className="w-full py-3 pl-12 pr-4 text-white placeholder-traverse-frost/30 transition-all bg-traverse-midnight/50 border rounded-xl border-traverse-frost/10 focus:border-traverse-cyan focus:outline-none focus:ring-1 focus:ring-traverse-cyan"
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded border-traverse-frost/20 bg-traverse-midnight/50 accent-traverse-cyan" />
          <span className="text-traverse-frost/70">Remember me</span>
        </label>
        <Link href="#" className="text-traverse-cyan hover:text-traverse-aurora transition-colors">Forgot Password?</Link>
      </div>

      <button type="submit" className="w-full flex justify-center items-center py-4 text-white font-bold rounded-xl bg-gradient-main hover:opacity-90 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] mt-4">
        Sign In <ArrowRight className="w-5 h-5 ml-2" />
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 pt-20 pb-12 relative overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-traverse-cyan/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-traverse-aurora/10 rounded-full blur-[100px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 sm:p-10 glass-panel rounded-3xl"
      >
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-2xl bg-traverse-ocean/50 border border-traverse-frost/10">
            <Compass className="w-8 h-8 text-traverse-cyan" />
          </div>
        </div>
        
        <h2 className="mb-2 text-3xl font-bold text-center text-white">Welcome Back</h2>
        <p className="mb-8 text-center text-traverse-frost/60">Enter your details to access your travel OS.</p>

        <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-2 border-traverse-cyan rounded-full border-t-transparent animate-spin"></div></div>}>
          <LoginForm />
        </Suspense>

        <p className="mt-8 text-center text-sm text-traverse-frost/60">
          New to Traverse? <Link href="/auth/signup" className="text-traverse-cyan hover:underline font-medium">Create an account</Link>
        </p>
      </motion.div>
    </div>
  );
}
