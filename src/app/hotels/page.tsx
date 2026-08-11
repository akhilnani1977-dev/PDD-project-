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
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

function HotelsContent() {
  const searchParams = useSearchParams();
  const initialDest = searchParams?.get("destination") || "";

  const todayStr = new Date().toISOString().split("T")[0];
  const defaultCheckoutStr = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split("T")[0];
  })();

  const [query, setQuery] = useState(initialDest);
  const [selectedType, setSelectedType] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"recommended" | "lowest" | "rating">("recommended");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  // Real App Hotel Search Filters
  const [checkInDate, setCheckInDate] = useState(todayStr);
  const [checkOutDate, setCheckOutDate] = useState(defaultCheckoutStr);
  const [guestsCount, setGuestsCount] = useState(2);

  const { addToast } = useAppStore();

  // Date validation rules
  const isPastCheckIn = checkInDate < todayStr;
  const isCheckOutBeforeCheckIn = checkOutDate <= checkInDate;
  const isHotelDateInvalid = isPastCheckIn || isCheckOutBeforeCheckIn;

  // Calculate nights
  const calculateNights = () => {
    const d1 = new Date(checkInDate);
    const d2 = new Date(checkOutDate);
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    return isNaN(diffDays) || diffDays <= 0 ? 1 : diffDays;
  };

  const nights = calculateNights();

  const handleCheckInChange = (newDate: string) => {
    setCheckInDate(newDate);
    if (checkOutDate <= newDate) {
      const d = new Date(newDate);
      d.setDate(d.getDate() + 2);
      setCheckOutDate(d.toISOString().split("T")[0]);
    }
  };

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
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
            Stay Discovery
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Find Your Ideal Accommodation
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Explore handpicked heritage havelis, luxury beach resorts, and boutique stays across India.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-md mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="md:col-span-2 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200">
              <Search className="w-5 h-5 text-emerald-600 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search city, state, or stay name (e.g. Jaipur, Zostel)..."
                className="w-full bg-transparent text-slate-900 font-semibold text-sm focus:outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Check-in Date */}
            <div className="flex items-center gap-2 px-3.5 py-3 bg-slate-50 rounded-2xl border border-slate-200">
              <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="w-full">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Check-In</span>
                <input
                  type="date"
                  min={todayStr}
                  value={checkInDate}
                  onChange={(e) => handleCheckInChange(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Check-out Date */}
            <div className="flex items-center gap-2 px-3.5 py-3 bg-slate-50 rounded-2xl border border-slate-200">
              <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="w-full">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Check-Out</span>
                <input
                  type="date"
                  min={checkInDate || todayStr}
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Date Validation Alert Badges */}
          {isPastCheckIn && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-800 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Check-in date cannot be in the past. Please select today or a future date.</span>
            </div>
          )}

          {isCheckOutBeforeCheckIn && !isPastCheckIn && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-800 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Check-out date must be after check-in date ({checkInDate}). Please select a valid checkout date.</span>
            </div>
          )}

          {/* Filter Pills & Sorting */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3 border-t border-slate-100">
            {/* Category Pills */}
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

            {/* Guest Count & Sorting */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-bold text-slate-700">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>Guests:</span>
                <button
                  type="button"
                  onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                  className="w-5 h-5 rounded-full bg-white text-slate-700 font-extrabold flex items-center justify-center hover:bg-slate-200 cursor-pointer"
                >
                  -
                </button>
                <span className="w-4 text-center">{guestsCount}</span>
                <button
                  type="button"
                  onClick={() => setGuestsCount(guestsCount + 1)}
                  className="w-5 h-5 rounded-full bg-white text-slate-700 font-extrabold flex items-center justify-center hover:bg-slate-200 cursor-pointer"
                >
                  +
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "recommended" | "lowest" | "rating")}
                className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="lowest">Sort: Lowest Price</option>
                <option value="rating">Sort: Highest Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-semibold text-slate-600">
            Showing <span className="text-slate-900 font-bold">{filtered.length}</span> stays for {nights} Night{nights > 1 ? "s" : ""} ({guestsCount} Guest{guestsCount > 1 ? "s" : ""})
          </p>
        </div>

        {/* Stays Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No stays found</h3>
            <p className="text-xs text-slate-500 mt-1">Try searching for a different destination or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((hotel) => (
              <div
                key={hotel.id + hotel.name}
                onClick={() => setSelectedHotel(hotel)}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <TravelImage
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold shadow-sm">
                      {hotel.type}
                    </span>
                    <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-slate-900/80 text-amber-300 text-xs font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                      {hotel.rating} ({hotel.reviewsCount})
                    </span>
                  </div>

                  <div className="p-5">
                    <span className="text-[10px] font-extrabold uppercase text-emerald-600 block">
                      {hotel.destinationName}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-0.5 group-hover:text-emerald-700 transition-colors">
                      {hotel.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {hotel.location} • {hotel.distanceFromCenter}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {hotel.amenities.map((a) => (
                        <span key={a} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Per Night</span>
                    <span className="text-lg font-extrabold text-slate-900">
                      ₹{hotel.pricePerNight.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <span
                    className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
                  >
                    View Details
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Hotel Reserve Modal */}
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

              {/* Reservation Breakdown */}
              <div className="my-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Stay Dates:</span>
                  <span className="font-bold text-slate-900">{checkInDate} to {checkOutDate}</span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Duration & Guests:</span>
                  <span className="font-bold text-slate-900">{nights} Night{nights > 1 ? "s" : ""} • {guestsCount} Guest{guestsCount > 1 ? "s" : ""}</span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium border-t border-slate-200 pt-2">
                  <span>Total Estimated Stay Cost:</span>
                  <span className="font-extrabold text-emerald-700 text-sm">
                    ₹{(selectedHotel.pricePerNight * nights).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedHotel(null)}
                  className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isHotelDateInvalid}
                  onClick={() => {
                    if (isHotelDateInvalid) return;
                    addToast(`Reserved ${selectedHotel.name} for ${nights} nights!`, "success");
                    setSelectedHotel(null);
                  }}
                  className={`flex-1 py-3 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 ${
                    isHotelDateInvalid
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Reservation</span>
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
