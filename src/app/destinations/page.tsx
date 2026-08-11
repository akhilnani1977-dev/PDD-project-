"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DESTINATIONS_DATA } from "@/data/mockData";
import { useAppStore } from "@/lib/store";
import TravelImage from "@/components/shared/TravelImage";
import { Search, Heart, Star, ArrowRight, Filter } from "lucide-react";

function DestinationsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get("search") || "";
  const initialRegion = searchParams?.get("region") || "All";

  const [query, setQuery] = useState(initialQuery);
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [selectedTag, setSelectedTag] = useState("All");

  const { toggleSaveDestination, isDestinationSaved } = useAppStore();

  const regions = ["All", "North India", "South India", "West India", "East India", "Northeast India"];
  const tags = ["All", "Heritage", "Mountains", "Beaches", "Nature", "Spiritual", "Culture", "Food", "Adventure"];

  const filteredDestinations = DESTINATIONS_DATA.filter((dest) => {
    const matchesQuery =
      dest.name.toLowerCase().includes(query.toLowerCase()) ||
      dest.state.toLowerCase().includes(query.toLowerCase()) ||
      dest.shortDescription.toLowerCase().includes(query.toLowerCase());

    const matchesRegion = selectedRegion === "All" || dest.region === selectedRegion;
    const matchesTag = selectedTag === "All" || dest.tags.includes(selectedTag);

    return matchesQuery && matchesRegion && matchesTag;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
            India Destination Directory
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Explore Extraordinary Destinations
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Discover royal palaces, tranquil backwaters, high-altitude passes, and pristine beaches.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md mb-10 space-y-4">
          {/* Search bar */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200">
            <Search className="w-5 h-5 text-emerald-600 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city name, state, or experience (e.g. Kerala, Jaipur)..."
              className="w-full bg-transparent text-slate-900 font-medium text-sm focus:outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
            {/* Region pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar pb-1">
              <span className="text-xs font-bold text-slate-400 shrink-0">Region:</span>
              {regions.map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedRegion === region
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>

            {/* Interest Tag pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar pb-1">
              <span className="text-xs font-bold text-slate-400 shrink-0">Type:</span>
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedTag === tag
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-semibold text-slate-600">
            Showing <span className="text-slate-900 font-bold">{filteredDestinations.length}</span> Indian destinations
          </p>
        </div>

        {/* Destination Cards Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto">
            <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No destinations found</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting your search query or filters.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedRegion("All");
                setSelectedTag("All");
              }}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => {
              const saved = isDestinationSaved(dest.id);

              return (
                <div
                  key={dest.id}
                  onClick={() => router.push(`/destinations/${dest.id}`)}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                      <TravelImage
                        src={dest.heroImage}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80 pointer-events-none" />

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleSaveDestination(dest.id);
                        }}
                        className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                          saved
                            ? "bg-rose-500 text-white"
                            : "bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
                      </button>

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold">
                          {dest.state}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-slate-900/80 text-amber-300 text-xs font-bold flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                          {dest.rating}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {dest.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {dest.tags.map((t) => (
                          <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Best Time</span>
                      <span className="text-xs font-bold text-slate-700 block">{dest.bestTimeToVisit}</span>
                    </div>

                    <span
                      className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DestinationsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading destinations...</div>}>
      <DestinationsContent />
    </Suspense>
  );
}
