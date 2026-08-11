"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/shared/Logo";
import { useAppStore } from "@/lib/store";
import { Search, Bell, Heart, Sparkles, ChevronDown } from "lucide-react";

export default function NavbarClient() {
  const pathname = usePathname();
  const { user, setSearchOpen, notifications, markNotificationRead, clearAllNotifications, savedDestinationIds } = useAppStore();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { label: "Discover", href: "/" },
    { label: "Destinations", href: "/destinations", hasDropdown: true },
    { label: "Plan Trip", href: "/plan", hasDropdown: true },
    { label: "AI Assistant", href: "/ai-planner", isAi: true },
    { label: "My Trips", href: "/trips", hasDropdown: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <Logo size={38} />

        {/* Center: Desktop Global Navigation */}
        <nav aria-label="Global Navigation" className="hidden lg:flex items-center gap-1 xl:gap-3">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                  isActive
                    ? link.isAi
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-emerald-700 font-extrabold"
                    : link.isAi
                    ? "text-emerald-700 hover:bg-emerald-50 font-extrabold"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 font-semibold"
                }`}
              >
                {link.isAi && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                <span>{link.label}</span>
                {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
              </Link>
            );
          })}
        </nav>

        {/* Right side: Search Bar Input, Heart Wishlist, Notifications, Profile Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Global Search Bar Input */}
          <div
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-slate-100/90 hover:bg-slate-200/70 border border-slate-200 text-slate-500 text-xs font-medium transition-all cursor-pointer w-44 sm:w-56"
          >
            <input
              type="text"
              readOnly
              placeholder="Search destinations, places..."
              className="bg-transparent border-none text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none w-full cursor-pointer"
            />
            <Search className="w-4 h-4 text-slate-500 shrink-0" />
          </div>

          {/* Saved Destinations Heart Link */}
          <Link
            href="/trips"
            className="relative p-2 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-rose-600 transition-colors"
            title="Saved Wishlist"
          >
            <Heart className="w-4 h-4" />
            {savedDestinationIds.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-rose-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">
                {savedDestinationIds.length}
              </span>
            )}
          </Link>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-600 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <button
                      type="button"
                      onClick={clearAllNotifications}
                      className="text-xs text-slate-500 hover:text-slate-700 underline cursor-pointer"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="mt-3 space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 py-6 text-center">No new notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-3 rounded-xl transition-all cursor-pointer border ${
                          n.read
                            ? "bg-slate-50 border-slate-100 text-slate-600"
                            : "bg-emerald-50/60 border-emerald-100 text-slate-900 font-medium"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-bold text-slate-900">{n.title}</p>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <Link
            href="/profile"
            className="flex items-center p-0.5 rounded-full hover:ring-2 hover:ring-emerald-500 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center overflow-hidden text-xs shadow-sm">
              {user.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user.name.charAt(0)
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
