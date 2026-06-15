"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Compass, Sparkles, MapPin, User } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/destinations", label: "Destinations", icon: <MapPin className="w-4 h-4" />, color: "hover:text-traverse-cyan" },
    { href: "/ai-planner", label: "AI Planner", icon: <Sparkles className="w-4 h-4" />, color: "hover:text-traverse-aurora" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 m-4 rounded-2xl glass-panel"
    >
      <Link href="/" className="flex items-center gap-2">
        <Compass className="w-7 h-7 text-traverse-cyan" />
        <span className="text-xl font-black tracking-widest text-white uppercase">Traverse</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map(({ href, label, icon, color }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-1 text-sm font-medium transition-colors ${
              pathname === href
                ? "text-traverse-cyan"
                : `text-traverse-frost/80 ${color}`
            }`}
          >
            {icon} {label}
          </Link>
        ))}
      </div>

      <Link
        href="/auth/signup"
        className="px-5 py-2 text-sm font-bold text-white rounded-full bg-gradient-main hover:opacity-90 hover:scale-105 transition-all flex items-center gap-2"
      >
        <User className="w-4 h-4" /> Get Started
      </Link>
    </motion.nav>
  );
}
