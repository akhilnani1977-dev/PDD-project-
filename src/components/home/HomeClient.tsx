"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DESTINATIONS_DATA, REGIONS_DATA, CATEGORIES_DATA } from "@/data/mockData";
import { useAppStore } from "@/lib/store";
import TravelImage from "@/components/shared/TravelImage";
import {
  Search,
  Heart,
  ArrowRight,
  Star,
  Compass,
  Calendar,
  Sparkles,
  Hotel,
  MapPin,
  Bookmark,
  ShieldCheck,
  Headphones,
  Award,
  Users,
  Bot
} from "lucide-react";

export default function HomeClient() {
  const router = useRouter();
  const { toggleSaveDestination, isDestinationSaved } = useAppStore();
  
  const [heroSearch, setHeroSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      const match = DESTINATIONS_DATA.find((d) =>
        d.name.toLowerCase().includes(heroSearch.toLowerCase().trim())
      );
      if (match) {
        router.push(`/destinations/${match.id}`);
      } else {
        router.push(`/destinations?search=${encodeURIComponent(heroSearch.trim())}`);
      }
    }
  };

  const filteredDestinations = selectedCategory === "all"
    ? DESTINATIONS_DATA
    : DESTINATIONS_DATA.filter((d) =>
        d.tags.some((t) => t.toLowerCase() === selectedCategory.toLowerCase())
      );

  const heroExamples = ["Goa", "Kerala", "Jaipur", "Hampi", "Ladakh", "Kashmir"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[580px] lg:min-h-[640px] flex items-center bg-slate-900 overflow-hidden py-12 lg:py-16">
        {/* Background Image of Mountain Scenery with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <TravelImage
            src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=1920&q=85"
            alt="Mountain Landscape Background"
            className="w-full h-full object-cover opacity-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-slate-950/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline, Search Pill, Popular Tags */}
          <div className="lg:col-span-7 text-white space-y-6">
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                Discover India. <br />
                <span className="text-emerald-400">Your Way.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 font-normal max-w-xl mt-4 leading-relaxed">
                Explore incredible destinations, create personalized itineraries, and journey through India like never before.
              </p>
            </div>

            {/* Search Input Bar Pill */}
            <form
              onSubmit={handleHeroSearch}
              className="w-full max-w-lg bg-white p-2 rounded-full shadow-2xl flex items-center justify-between gap-2 border border-slate-200"
            >
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Where do you want to go?"
                className="w-full bg-transparent text-slate-900 font-medium text-sm sm:text-base focus:outline-none placeholder:text-slate-400 px-5 py-2"
              />
              <button
                type="submit"
                className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md transition-all cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            {/* Popular Searches Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-200 pt-2">
              <span className="font-semibold text-slate-300">Popular Searches:</span>
              {heroExamples.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => {
                    setHeroSearch(ex);
                    router.push(`/destinations/${ex.toLowerCase()}`);
                  }}
                  className="px-3.5 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/20 font-medium text-xs backdrop-blur-md transition-all cursor-pointer"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: "Plan Your Perfect Trip" White Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 text-slate-900 space-y-5">
              <h2 className="text-xl font-bold text-center text-slate-900 tracking-tight">
                Plan Your Perfect Trip
              </h2>

              <div className="space-y-4 pt-1">
                {/* Step 1 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Choose Destination</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Pick your dream place</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Add Details</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Dates, travellers, budget & more</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">AI Itinerary</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Get your personalized plan</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Hotel className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Explore & Book</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Hotels, activities and more</p>
                  </div>
                </div>
              </div>

              <Link
                href="/plan"
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Plan My Trip</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FLOATING CATEGORIES BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-200/80">
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 text-center">
            {CATEGORIES_DATA.filter((c) => c.id !== "all").map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(active ? "all" : cat.id)}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl transition-all cursor-pointer ${
                    active
                      ? "bg-emerald-50 text-emerald-700 font-bold border border-emerald-200"
                      : "hover:bg-slate-100 text-slate-700 font-medium"
                  }`}
                >
                  <span className="text-2xl mb-1">{cat.icon}</span>
                  <span className="text-xs font-semibold">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. EXPLORE INDIA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Explore India</h2>
            <p className="text-sm text-slate-500 mt-1">Handpicked destinations just for you</p>
          </div>
          <Link
            href="/plan"
            className="flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <span>Plan Custom Trip</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDestinations.map((dest) => {
            const saved = isDestinationSaved(dest.id);

            return (
              <div
                key={dest.id}
                onClick={() => router.push(`/destinations/${dest.id}`)}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Image & Badges */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <TravelImage
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-70 pointer-events-none" />

                  {/* Top-left State Pill */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold shadow-sm">
                    {dest.state}
                  </span>

                  {/* Top-right Save Button */}
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
                    aria-label="Save Destination"
                  >
                    <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
                  </button>

                  {/* Bottom Rating Pill */}
                  <div className="absolute bottom-4 left-4 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 text-xs font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                      {dest.rating} ({dest.popularityScore * 12}+)
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
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

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Best Time</span>
                      <span className="text-xs font-bold text-slate-700">{dest.bestTimeToVisit}</span>
                    </div>

                    <span
                      className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. EXPLORE INDIA BY REGION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Explore India by Region</h2>
          <p className="text-sm text-slate-500 mt-1">Discover destinations across incredible regions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {REGIONS_DATA.map((region) => (
            <div
              key={region.id}
              onClick={() => router.push(`/destinations?region=${encodeURIComponent(region.name)}`)}
              className="group relative h-72 rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-5 cursor-pointer"
            >
              {/* Background Image */}
              <TravelImage
                src={region.image}
                alt={region.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

              <div className="relative z-10 text-white flex flex-col justify-between h-full">
                <div />
                <div>
                  <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                    {region.name}
                  </h3>
                  <p className="text-[11px] text-slate-200 mt-1 line-clamp-2 leading-relaxed opacity-90">
                    {region.statesList.join(", ")}
                  </p>

                  <div className="mt-3 flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-md transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. AI TRAVEL ASSISTANT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-emerald-50/80 rounded-3xl p-8 sm:p-10 border border-emerald-100 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left info */}
          <div className="flex items-center gap-5 max-w-lg">
            <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-600/30">
              <Bot className="w-9 h-9 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
                <span>AI Travel Assistant</span>
                <span className="text-amber-500">🪄</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Your personal travel companion to plan, guide and inspire your journey across India.
              </p>
            </div>
          </div>

          {/* Right prompt pills & button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => router.push("/ai-planner")}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 shadow-2xs text-center cursor-pointer"
              >
                Plan a weekend trip
              </button>
              <button
                type="button"
                onClick={() => router.push("/ai-planner")}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 shadow-2xs text-center cursor-pointer"
              >
                Best places for couples
              </button>
              <button
                type="button"
                onClick={() => router.push("/ai-planner")}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 shadow-2xs text-center cursor-pointer"
              >
                Trips under ₹10,000
              </button>
              <button
                type="button"
                onClick={() => router.push("/ai-planner")}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 shadow-2xs text-center cursor-pointer"
              >
                Family vacation ideas
              </button>
            </div>

            <Link
              href="/ai-planner"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Chat with AI</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. PLAN SMARTER, TRAVEL BETTER FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Plan Smarter, Travel Better</h2>
          <p className="text-sm text-slate-500 mt-1">Everything you need to plan the perfect trip</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Smart Itinerary</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              AI-powered day by day plans tailored for you.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Budget Planner</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Plan your trip within budget with clarity.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Hotel className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Stay Options</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              From budget stays to luxury hotels.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Top Experiences</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Handpicked activities and local experiences.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
              <Bookmark className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Travel Guide</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Tips, transport, weather and safety info.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Save & Organize</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Save places and trips you love.
            </p>
          </div>
        </div>
      </section>

      {/* 7. TRUST BADGES FOOTER BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-emerald-50/60 rounded-3xl p-6 border border-emerald-100 shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Trusted by 50K+ Travelers</h4>
                <p className="text-[11px] text-slate-500">Real reviews from real travelers</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Best Price Guarantee</h4>
                <p className="text-[11px] text-slate-500">Get the best deals always</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">24/7 Travel Support</h4>
                <p className="text-[11px] text-slate-500">We&apos;re here for you anytime</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Secure & Reliable</h4>
                <p className="text-[11px] text-slate-500">Your data is always safe</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
