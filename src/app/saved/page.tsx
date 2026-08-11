"use client";

import { useState } from "react";
import { Bookmark, MapPin, Sparkles, Trash2 } from "lucide-react";
import Link from "next/link";

const SAVED_ITEMS = [
  {
    id: "s1",
    name: "Jaipur & Amer Fort",
    type: "Destination",
    category: "Heritage",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1492816041544-6c902f2a6a3e?w=800&q=80",
    destId: "3",
    state: "Rajasthan"
  },
  {
    id: "s2",
    name: "Kerala Backwaters & Houseboat",
    type: "Itinerary",
    category: "Nature",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    destId: "6",
    state: "Kerala"
  },
  {
    id: "s3",
    name: "Pangong Tso & Ladakh Circuit",
    type: "Itinerary",
    category: "Mountains",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800&q=80",
    destId: "8",
    state: "Ladakh"
  }
];

export default function SavedPage() {
  const [savedList, setSavedList] = useState(SAVED_ITEMS);

  const removeItem = (id: string) => {
    setSavedList(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300">
      
      {/* Glow background accent */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[280px] bg-[#0DBB7B]/10 blur-[140px] -z-10 rounded-full pointer-events-none" />

      {/* Header */}
      <div className="mb-10">
        <div className="badge-primary mb-3">
          <Bookmark className="w-3.5 h-3.5 text-[#0DBB7B]" /> Saved Hub
        </div>
        <h1 className="display-hero mb-3">
          Saved Trips & <span className="text-[#0DBB7B]">Wishlist</span>
        </h1>
        <p className="body-text max-w-xl">
          Quick access to your bookmarked AI itineraries, saved destinations, and personal travel bucket list.
        </p>
      </div>

      {savedList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {savedList.map((item) => (
            <div
              key={item.id}
              className="soft-card-hover p-0 overflow-hidden flex flex-col justify-between group border border-slate-200 dark:border-white/10"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-white/5">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <button
                    onClick={() => removeItem(item.id)}
                    title="Remove from saved"
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-rose-400 hover:bg-rose-500 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-xs font-black">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {item.state}
                  </div>
                </div>

                <div className="p-6">
                  <span className="badge-tag text-[10px] font-black uppercase tracking-wider mb-2 inline-block">
                    {item.type} · {item.category}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center gap-3">
                <Link
                  href={`/destinations/${item.destId}`}
                  className="flex-1 h-10 rounded-full bg-slate-100 dark:bg-white/10 text-xs font-extrabold text-slate-900 dark:text-white flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/20 transition-all border border-slate-200/50 dark:border-white/10"
                >
                  View Details
                </Link>
                <Link
                  href={`/ai-planner?prompt=${encodeURIComponent("Plan a trip to " + item.name)}`}
                  className="flex-1 h-10 rounded-full bg-emerald-500 text-black text-xs font-extrabold flex items-center justify-center gap-1 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Plan Trip
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="soft-card p-12 text-center max-w-md mx-auto space-y-4">
          <Bookmark className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-black text-slate-900 dark:text-white">Your wishlist is empty</h3>
          <p className="body-text text-sm">Explore destinations and click the bookmark button to save them here.</p>
          <Link href="/" className="btn-accent inline-flex h-10 px-5 text-xs">
            Explore Destinations
          </Link>
        </div>
      )}

    </div>
  );
}
