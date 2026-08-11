"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { DESTINATIONS_DATA } from "@/data/mockData";
import TravelImage from "@/components/shared/TravelImage";
import { Search, X, MapPin, Hotel, ArrowRight, Sparkles } from "lucide-react";

export default function SmartSearchModal() {
  const { isSearchOpen, setSearchOpen, searchQuery, setSearchQuery } = useAppStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  if (!isSearchOpen) return null;

  const q = searchQuery.toLowerCase().trim();

  const filteredDestinations = q
    ? DESTINATIONS_DATA.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.state.toLowerCase().includes(q) ||
          d.region.toLowerCase().includes(q) ||
          d.shortDescription.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q))
      )
    : DESTINATIONS_DATA.slice(0, 4);

  const matchingExperiences = q
    ? DESTINATIONS_DATA.flatMap((d) =>
        d.topExperiences
          .filter((exp) => exp.name.toLowerCase().includes(q) || exp.description.toLowerCase().includes(q))
          .map((exp) => ({ ...exp, destName: d.name, destId: d.id }))
      )
    : [];

  const matchingHotels = q
    ? DESTINATIONS_DATA.flatMap((d) =>
        d.whereToStay
          .filter((h) => h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q))
          .map((h) => ({ ...h, destName: d.name, destId: d.id }))
      )
    : [];

  const quickPills = ["Goa", "Kerala", "Jaipur", "Hampi", "Manali", "Kashmir", "Ladakh", "Luxury Hotels"];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-600 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destinations, places, hotels, or food (e.g. Jaipur, beaches)..."
            className="w-full bg-transparent text-slate-900 text-sm sm:text-base font-medium focus:outline-none placeholder:text-slate-400"
            autoFocus
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          <span className="text-slate-400 font-medium shrink-0">Popular:</span>
          {quickPills.map((pill) => (
            <button
              key={pill}
              type="button"
              onClick={() => setSearchQuery(pill)}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 text-slate-600 font-medium transition-all shrink-0 cursor-pointer"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Search Results Container */}
        <div className="p-4 overflow-y-auto space-y-6">
          {/* Destinations Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Destinations
              </h4>
              <span className="text-xs font-medium text-slate-400">{filteredDestinations.length} found</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredDestinations.map((dest) => (
                <Link
                  key={dest.id}
                  href={`/destinations/${dest.id}`}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <TravelImage
                      src={dest.heroImage}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 truncate">
                      {dest.name}
                    </h5>
                    <p className="text-xs text-slate-500 truncate">{dest.state}</p>
                    <span className="text-[11px] font-semibold text-emerald-600">
                      {dest.avgBudgetRange}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Attractions / Experiences matching query */}
          {matchingExperiences.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Attractions & Experiences
              </h4>
              <div className="space-y-2">
                {matchingExperiences.slice(0, 3).map((exp) => (
                  <Link
                    key={exp.id}
                    href={`/destinations/${exp.destId}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                      <TravelImage src={exp.image} alt={exp.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-900">{exp.name}</p>
                      <p className="text-[11px] text-slate-500">{exp.destName} • {exp.entryFee}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Hotels matching query */}
          {matchingHotels.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Hotel className="w-3.5 h-3.5 text-sky-500" />
                Stays & Hotels
              </h4>
              <div className="space-y-2">
                {matchingHotels.slice(0, 3).map((h) => (
                  <Link
                    key={h.id}
                    href={`/hotels`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                      <TravelImage src={h.image} alt={h.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-900">{h.name}</p>
                      <p className="text-[11px] text-slate-500">{h.location} • ₹{h.pricePerNight.toLocaleString("en-IN")}/night</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Search by city, landmark, or activity</span>
          <span className="font-semibold text-emerald-700">Traverse Discovery</span>
        </div>
      </div>
    </div>
  );
}
