"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Sparkles, MapPin, User, LogOut, Moon, Sun, ShoppingBag } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function NavbarClient({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { href: "/destinations", label: "Destinations", icon: <MapPin className="w-4 h-4" /> },
    { href: "/ai-planner", label: "AI Planner", icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 m-4 md:mx-auto md:max-w-6xl rounded-full bg-white dark:bg-organic-green-dark shadow-sm border border-gray-100 dark:border-white/10"
    >
      <Link href="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-organic-black text-white rounded-full flex items-center justify-center">
          <Compass className="w-5 h-5" />
        </div>
        <span className="text-xl font-black tracking-tight text-organic-black dark:text-white">Traverse</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 bg-gray-50 dark:bg-white/5 px-6 py-2 rounded-full">
        {navLinks.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 text-sm font-bold transition-colors text-gray-500 hover:text-organic-black dark:text-gray-300 dark:hover:text-white"
          >
            {icon} {label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {mounted && (
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-gray-200 transition-colors text-organic-black dark:text-white"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        )}

        <button className="relative w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-gray-200 transition-colors text-organic-black dark:text-white">
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-organic-black text-white rounded-full text-[10px] font-bold flex items-center justify-center">1</span>
        </button>

        {isLoggedIn ? (
          <>
            <Link
              href="/profile"
              className="px-5 py-2.5 text-sm font-bold text-organic-black dark:text-white rounded-full border-2 border-organic-black dark:border-white hover:bg-organic-black hover:text-white dark:hover:bg-white dark:hover:text-organic-black transition-all flex items-center gap-2"
            >
              <User className="w-4 h-4" /> Profile
            </Link>
            <form action="/api/auth/logout" method="POST" className="hidden" id="logoutForm"></form>
            <button
              onClick={async () => {
                document.cookie = "mock_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
                document.cookie = "auth-session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
                try {
                  const supabase = createClient();
                  await supabase.auth.signOut();
                } catch (err) {
                  console.error("Error signing out:", err);
                }
                window.location.href = "/auth/login";
              }}
              className="px-5 py-2.5 text-sm font-bold text-white bg-organic-black rounded-full hover:scale-105 transition-transform flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="px-5 py-2.5 text-sm font-bold text-organic-black dark:text-white hover:underline transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-5 py-2.5 text-sm font-bold text-white bg-organic-black rounded-full hover:scale-105 transition-transform flex items-center gap-2"
            >
              <User className="w-4 h-4" /> Get Started
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
}
