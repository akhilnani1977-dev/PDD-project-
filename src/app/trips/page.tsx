"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { DESTINATIONS_DATA } from "@/data/mockData";
import TravelImage from "@/components/shared/TravelImage";
import {
  Briefcase,
  Calendar,
  Users,
  ArrowRight,
  PlusCircle,
  Heart,
  Trash2,
  Sparkles
} from "lucide-react";

export default function MyTripsPage() {
  const { trips, savedDestinationIds, removeTrip, toggleSaveDestination } = useAppStore();
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Completed" | "Saved">("Upcoming");

  const filteredTrips = trips.filter((t) => t.status === activeTab);

  const savedDestinationsList = DESTINATIONS_DATA.filter((d) =>
    savedDestinationIds.includes(d.id)
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Trip Dashboard</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">My Trips</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Manage your planned itineraries, saved wishlists, and travel history.</p>
          </div>

          <Link
            href="/plan"
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Trip</span>
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-8">
          {(["Upcoming", "Completed", "Saved"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab} {tab === "Saved" ? `(${savedDestinationIds.length})` : `(${trips.filter(t => t.status === tab).length})`}
            </button>
          ))}
        </div>

        {/* TAB 1 & 2: UPCOMING / COMPLETED TRIPS */}
        {activeTab !== "Saved" && (
          <div>
            {filteredTrips.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto">
                <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900">No {activeTab.toLowerCase()} trips found</h3>
                <p className="text-xs text-slate-500 mt-1">Start planning your next Indian adventure now!</p>
                <Link
                  href="/plan"
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-2xl shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Build a Trip</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                        <TravelImage
                          src={trip.coverImage}
                          alt={trip.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 text-white text-xs font-bold">
                          {trip.daysCount} Days
                        </span>

                        <button
                          type="button"
                          onClick={() => removeTrip(trip.id)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-rose-600 hover:text-white text-slate-700 transition-all shadow-md cursor-pointer"
                          title="Remove Trip"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-5">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {trip.title}
                        </h3>

                        <div className="space-y-1.5 mt-3 text-xs text-slate-600">
                          <p className="flex items-center gap-1.5 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                            {trip.dates}
                          </p>
                          <p className="flex items-center gap-1.5 font-medium">
                            <Users className="w-3.5 h-3.5 text-emerald-600" />
                            {trip.travellersCount} Travellers
                          </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4 pt-3 border-t border-slate-100">
                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
                            <span>Planning Progress</span>
                            <span className="text-emerald-700">{trip.progressPercentage}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-600 h-full rounded-full transition-all"
                              style={{ width: `${trip.progressPercentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Budget</span>
                        <span className="text-lg font-extrabold text-slate-900 block">
                          ₹{trip.budget.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <Link
                        href={`/trips/${trip.id}`}
                        className="px-4 py-2 rounded-2xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Trip</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SAVED DESTINATIONS */}
        {activeTab === "Saved" && (
          <div>
            {savedDestinationsList.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto">
                <Heart className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900">Your wishlist is empty</h3>
                <p className="text-xs text-slate-500 mt-1">Bookmark destinations while discovering India.</p>
                <Link
                  href="/destinations"
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-2xl shadow-sm cursor-pointer"
                >
                  <span>Explore Destinations</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedDestinationsList.map((dest) => (
                  <div key={dest.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 p-4 shadow-sm flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                      <TravelImage src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold text-slate-900 truncate">{dest.name}</h4>
                      <p className="text-xs text-slate-500">{dest.state}</p>
                      <span className="text-xs font-extrabold text-emerald-700 block mt-1">
                        {dest.avgBudgetRange}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <Link
                        href={`/destinations/${dest.id}`}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleSaveDestination(dest.id)}
                        className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs cursor-pointer"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
