"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { DESTINATIONS_DATA } from "@/data/mockData";
import { useAppStore } from "@/lib/store";
import TravelImage from "@/components/shared/TravelImage";
import {
  Heart,
  Star,
  MapPin,
  Calendar,
  IndianRupee,
  Sparkles,
  Share2,
} from "lucide-react";

export default function DestinationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const destId = resolvedParams.id;

  const { toggleSaveDestination, isDestinationSaved, addToast } = useAppStore();

  const dest = DESTINATIONS_DATA.find((d) => d.id.toLowerCase() === destId.toLowerCase()) || DESTINATIONS_DATA[0];
  const saved = isDestinationSaved(dest.id);

  // Hotel state & sorting (Lowest Price -> Highest Price default)
  const [hotelSort, setHotelSort] = useState<"lowest" | "highest" | "rating">("lowest");
  const [selectedHotelFilter] = useState<string>("All");

  let hotels = [...dest.whereToStay];
  if (selectedHotelFilter !== "All") {
    hotels = hotels.filter((h) => h.type === selectedHotelFilter);
  }

  if (hotelSort === "lowest") {
    hotels.sort((a, b) => a.pricePerNight - b.pricePerNight);
  } else if (hotelSort === "highest") {
    hotels.sort((a, b) => b.pricePerNight - a.pricePerNight);
  } else if (hotelSort === "rating") {
    hotels.sort((a, b) => b.rating - a.rating);
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast("Destination link copied to clipboard!", "success");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      {/* 1. HERO BANNER */}
      <section className="relative w-full h-[480px] sm:h-[540px] overflow-hidden bg-slate-900">
        <TravelImage
          src={dest.heroImage}
          alt={dest.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

        {/* Floating Actions Header */}
        <div className="absolute top-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between z-20">
          <Link
            href="/destinations"
            className="px-4 py-2 rounded-full bg-white/80 hover:bg-white text-slate-900 text-xs font-bold backdrop-blur-md transition-all flex items-center gap-1 shadow-md cursor-pointer"
          >
            ← Back to Destinations
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-900 backdrop-blur-md transition-all shadow-md cursor-pointer"
            title="Share Destination"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Details */}
        <div className="absolute bottom-10 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-white pointer-events-none">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-extrabold shadow-sm">
              {dest.state}, India
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-xs font-bold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              {dest.rating} Rating
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-2">
            {dest.name}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-200 font-medium mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span><strong>Best time:</strong> {dest.bestTimeToVisit}</span>
            </div>
            <div className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-amber-400" />
              <span><strong>Average trip:</strong> {dest.avgBudgetRange}</span>
            </div>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-wrap items-center gap-3 pointer-events-auto">
            <Link
              href={`/plan?destination=${encodeURIComponent(dest.name)}`}
              className="px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Plan a Trip</span>
            </Link>

            <button
              type="button"
              onClick={() => toggleSaveDestination(dest.id)}
              className={`px-6 py-3.5 rounded-2xl font-extrabold text-sm backdrop-blur-md transition-all flex items-center gap-2 border cursor-pointer ${
                saved
                  ? "bg-rose-600 text-white border-rose-500"
                  : "bg-white/20 hover:bg-white/30 text-white border-white/30"
              }`}
            >
              <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
              <span>{saved ? "Saved to Wishlist" : "Save Destination"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-3">About {dest.name}</h2>
          <p className="text-slate-600 text-base leading-relaxed">{dest.about}</p>
        </div>
      </section>

      {/* 3. TOP EXPERIENCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Must Visit Landmarks</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Top Experiences in {dest.name}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dest.topExperiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-100">
                  <TravelImage src={exp.image} alt={exp.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 text-amber-300 text-xs font-bold">
                    ⭐ {exp.rating}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900">{exp.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{exp.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-2 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-400">Entry Fee:</span>
                  <span className="font-bold text-slate-900">{exp.entryFee}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-400">Hours:</span>
                  <span className="font-medium text-slate-700">{exp.openingHours}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-400">Duration:</span>
                  <span className="font-medium text-slate-700">{exp.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHERE TO STAY (Hotels sorted Lowest -> Highest) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Accommodations</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Where to Stay</h2>
          </div>

          {/* Sort controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400">Sort by:</span>
            <select
              value={hotelSort}
              onChange={(e) => setHotelSort(e.target.value as "lowest" | "highest" | "rating")}
              className="px-3.5 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="lowest">Lowest Price → Highest Price</option>
              <option value="highest">Highest Price → Lowest Price</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-100">
                  <TravelImage src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 text-white text-xs font-extrabold">
                    {hotel.type}
                  </span>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/90 text-slate-900 text-xs font-bold">
                    ⭐ {hotel.rating} ({hotel.reviewsCount})
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900">{hotel.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {hotel.location} • {hotel.distanceFromCenter}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {hotel.amenities.map((a) => (
                      <span key={a} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Per night</span>
                  <span className="text-lg font-extrabold text-slate-900 block">
                    ₹{hotel.pricePerNight.toLocaleString("en-IN")}
                  </span>
                </div>

                <Link
                  href={`/hotels?destination=${encodeURIComponent(dest.name)}`}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all cursor-pointer"
                >
                  View Stay
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LOCAL FOOD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Culinary Delights</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Local Food Specialties</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dest.localFood.map((food) => (
            <div key={food.id} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-36 rounded-2xl overflow-hidden mb-3 bg-slate-100">
                  <TravelImage src={food.image} alt={food.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{food.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${food.isVegetarian ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
                    {food.isVegetarian ? "Veg" : "Non-Veg"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{food.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-400 block font-medium">Famous Spot:</span>
                <span className="font-bold text-slate-800">{food.popularSpot}</span>
                <span className="text-emerald-700 font-extrabold block mt-1">{food.priceRange}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TRAVEL TIPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Essential Travel Tips for {dest.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dest.travelTips.map((tip, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                  {tip.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">{tip.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
