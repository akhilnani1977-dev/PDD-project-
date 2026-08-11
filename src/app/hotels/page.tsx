"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { DESTINATIONS_DATA, Hotel } from "@/data/mockData";
import { useAppStore } from "@/lib/store";
import TravelImage from "@/components/shared/TravelImage";
import {
  Search,
  Star,
  MapPin,
  X,
} from "lucide-react";

function HotelsContent() {
  const searchParams = useSearchParams();
  const initialDest = searchParams?.get("destination") || "";

  const [query, setQuery] = useState(initialDest);
  const [selectedType, setSelectedType] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"recommended" | "lowest" | "rating">("recommended");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const { addToast } = useAppStore();

  const allHotels = DESTINATIONS_DATA.flatMap((d) =>
    d.whereToStay.map((h) => ({ ...h, destinationName: d.name }))
  );

  const filtered = allHotels.filter((h) => {
    const matchesQuery =
      !query ||
      h.name.toLowerCase().includes(query.toLowerCase()) ||
      h.location.toLowerCase().includes(query.toLowerCase()) ||
      h.destinationName.toLowerCase().includes(query.toLowerCase());

    const matchesType = selectedType === "All" || h.type === selectedType;

    return matchesQuery && matchesType;
  });

  if (sortBy === "lowest") {
    filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
  } else if (sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const typesList = ["All", "Luxury Resort", "Heritage Hotel", "Boutique", "Comfort", "Backpacker Hostel"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
            Hotel Discovery
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Where are you staying?
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Explore handpicked heritage havelis, luxury beach resorts, and cozy boutique stays in India.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md mb-10 space-y-4">
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200">
            <Search className="w-5 h-5 text-emerald-600 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Where are you staying? Search city or hotel name..."
              className="w-full bg-transparent text-slate-900 font-semibold text-sm focus:outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-slate-100">
            {/* Hotel Types */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <span className="text-xs font-bold text-slate-400 shrink-0">Type:</span>
              {typesList.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedType === type
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-slate-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "recommended" | "lowest" | "rating")}
                className="px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="lowest">Lowest Price</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((hotel) => (
            <div
              key={hotel.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                  <TravelImage
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 text-white text-xs font-extrabold shadow-sm">
                    {hotel.type}
                  </span>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/90 text-slate-900 text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                    {hotel.rating} ({hotel.reviewsCount})
                  </span>
                </div>

                <div className="p-5">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                    {hotel.destinationName}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mt-0.5">
                    {hotel.name}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    {hotel.location} • {hotel.distanceFromCenter}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {hotel.amenities.map((a) => (
                      <span key={a} className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Price per night</span>
                  <span className="text-xl font-extrabold text-slate-900 block">
                    ₹{hotel.pricePerNight.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-slate-400">Total 3-night: ₹{(hotel.pricePerNight * 3).toLocaleString("en-IN")}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedHotel(hotel)}
                  className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  View Hotel
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View Hotel Modal */}
        {selectedHotel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 p-6 relative">
              <button
                type="button"
                onClick={() => setSelectedHotel(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="h-48 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <TravelImage src={selectedHotel.image} alt={selectedHotel.name} className="w-full h-full object-cover" />
              </div>

              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                {selectedHotel.type}
              </span>

              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{selectedHotel.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{selectedHotel.location} • {selectedHotel.distanceFromCenter}</p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-semibold">Nightly Rate</span>
                  <span className="text-2xl font-extrabold text-slate-900 block">
                    ₹{selectedHotel.pricePerNight.toLocaleString("en-IN")}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    addToast(`Reserved ${selectedHotel.name} successfully!`, "success");
                    setSelectedHotel(null);
                  }}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
                >
                  Book Stay Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function HotelsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading stays...</div>}>
      <HotelsContent />
    </Suspense>
  );
}
