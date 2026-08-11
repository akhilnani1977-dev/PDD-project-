"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DESTINATIONS_DATA } from "@/data/mockData";
import { useAppStore, PlannedTrip } from "@/lib/store";
import {
  Sparkles,
  Compass,
  Bus,
  Train,
  Plane,
  Car,
  ArrowRight,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";

function PlanTripWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedDest = searchParams?.get("destination") || "";
  const { addTrip } = useAppStore();

  const [step, setStep] = useState(1);

  // Form State
  const [tripType, setTripType] = useState<"single" | "multiple">("single");
  const [selectedDestination, setSelectedDestination] = useState(preselectedDest || "Kerala");
  const [startDate, setStartDate] = useState("2026-09-10");
  const [endDate, setEndDate] = useState("2026-09-15");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [budget, setBudget] = useState(20000);
  const [budgetTier, setBudgetTier] = useState<"Backpacker" | "Budget" | "Comfort" | "Premium" | "Luxury">("Comfort");
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["Relaxation", "Culture"]);
  const [transportMode, setTransportMode] = useState<string>("Flight");

  const stylesList = [
    { name: "Adventure", icon: "🏕️" },
    { name: "Relaxation", icon: "🏖️" },
    { name: "Culture", icon: "🏛️" },
    { name: "Nature", icon: "🌿" },
    { name: "Food", icon: "🍛" },
    { name: "Spiritual", icon: "🛕" },
    { name: "Photography", icon: "📸" },
    { name: "Nightlife", icon: "🎉" },
    { name: "Family", icon: "👨‍👩‍👧‍👦" },
  ];

  const transportOptions = [
    { name: "Flight", icon: Plane, desc: "Fastest option for long distances" },
    { name: "Train", icon: Train, desc: "Scenic Indian Railways experience" },
    { name: "Bus", icon: Bus, desc: "Budget friendly Volvo sleeper buses" },
    { name: "Car / Taxi", icon: Car, desc: "Private road trip flexibility" },
    { name: "Local Transport", icon: Compass, desc: "Metro, auto & public transit" },
  ];

  const handleStyleToggle = (styleName: string) => {
    if (selectedStyles.includes(styleName)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== styleName));
    } else {
      setSelectedStyles([...selectedStyles, styleName]);
    }
  };

  const handleCreateTrip = () => {
    const destObj = DESTINATIONS_DATA.find(
      (d) => d.name.toLowerCase() === selectedDestination.toLowerCase()
    ) || DESTINATIONS_DATA[0];

    const newTripId = `trip-${Date.now()}`;
    const totalPeople = adults + children;

    // Calculate intelligent budget breakdown
    const accommodation = Math.round(budget * 0.4);
    const transport = Math.round(budget * 0.25);
    const food = Math.round(budget * 0.2);
    const activities = Math.round(budget * 0.1);
    const miscellaneous = Math.round(budget * 0.05);

    const newTrip: PlannedTrip = {
      id: newTripId,
      destinationId: destObj.id,
      title: `${selectedDestination} ${stylesList.find(s => selectedStyles.includes(s.name))?.name || "Escape"}`,
      dates: `${startDate} – ${endDate}`,
      travellersCount: totalPeople,
      budget: budget,
      status: "Upcoming",
      progressPercentage: 10,
      coverImage: destObj.heroImage,
      daysCount: 5,
      budgetBreakdown: {
        accommodation,
        transport,
        food,
        activities,
        miscellaneous,
      },
      itineraryDays: [
        {
          dayNumber: 1,
          title: `Arrival in ${destObj.name}`,
          activities: [
            {
              id: "act-1",
              time: "09:00 AM",
              title: `Arrival at ${destObj.name} airport/station`,
              location: destObj.name,
              duration: "1.5 Hours",
              estimatedCost: 800,
              image: destObj.heroImage,
              travelTime: "30 mins",
            },
            {
              id: "act-2",
              time: "10:30 AM",
              title: `Check-in at ${destObj.whereToStay[0]?.name || "Heritage Hotel"}`,
              location: destObj.name,
              duration: "1 Hour",
              estimatedCost: 0,
              image: destObj.whereToStay[0]?.image || destObj.heroImage,
              travelTime: "20 mins",
            },
            {
              id: "act-3",
              time: "01:00 PM",
              title: `Traditional Lunch — ${destObj.localFood[0]?.name || "Local Feast"}`,
              location: destObj.localFood[0]?.popularSpot || "City Center",
              duration: "1.5 Hours",
              estimatedCost: 600,
              image: destObj.localFood[0]?.image || destObj.heroImage,
              travelTime: "15 mins",
            },
            {
              id: "act-4",
              time: "03:00 PM",
              title: `Explore ${destObj.topExperiences[0]?.name || "City Palace"}`,
              location: destObj.topExperiences[0]?.name || "Main Square",
              duration: "2.5 Hours",
              estimatedCost: 300,
              image: destObj.topExperiences[0]?.image || destObj.heroImage,
              travelTime: "15 mins",
            },
            {
              id: "act-5",
              time: "06:00 PM",
              title: "Sunset Promenade & Evening Bazaar Walk",
              location: `${destObj.name} Old Town`,
              duration: "2 Hours",
              estimatedCost: 200,
              image: destObj.gallery[0] || destObj.heroImage,
              travelTime: "10 mins",
            },
            {
              id: "act-6",
              time: "08:00 PM",
              title: "Dinner & Cultural Performance",
              location: `${destObj.name} Restaurant`,
              duration: "2 Hours",
              estimatedCost: 900,
              image: destObj.heroImage,
              travelTime: "15 mins",
            },
          ],
        },
      ],
    };

    addTrip(newTrip);
    router.push(`/trips/${newTripId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Step Header */}
        <div className="mb-10 text-center">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
            Trip Builder
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Build your perfect trip
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Step {step} of 6 — {step === 1 ? "Destination" : step === 2 ? "Dates" : step === 3 ? "Travellers" : step === 4 ? "Budget" : step === 5 ? "Travel Style" : "Transport"}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-2 rounded-full mt-6 overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Wizard Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
          {/* STEP 1: DESTINATION */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Step 1 — Destination</h3>
                <p className="text-xs text-slate-500 mt-1">Select your preferred travel destination in India.</p>
              </div>

              {/* Single vs Multiple selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTripType("single")}
                  className={`p-3.5 rounded-2xl border text-xs font-bold text-center transition-all ${
                    tripType === "single"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                      : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  Single Destination
                </button>
                <button
                  type="button"
                  onClick={() => setTripType("multiple")}
                  className={`p-3.5 rounded-2xl border text-xs font-bold text-center transition-all ${
                    tripType === "multiple"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                      : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  Multiple Destinations
                </button>
              </div>

              {/* Destination Dropdown / Cards */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Select Destination:</label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full p-3.5 rounded-2xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-600"
                >
                  {DESTINATIONS_DATA.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.state})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: DATES */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Step 2 — Travel Dates</h3>
                <p className="text-xs text-slate-500 mt-1">When are you planning to travel?</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-3.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-3.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TRAVELLERS */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Step 3 — Travellers</h3>
                <p className="text-xs text-slate-500 mt-1">How many people are going on this trip?</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">Adults</span>
                    <span className="text-xs text-slate-500">Age 13+</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-8 h-8 rounded-full bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
                    >
                      -
                    </button>
                    <span className="text-base font-extrabold w-6 text-center">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="w-8 h-8 rounded-full bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">Children</span>
                    <span className="text-xs text-slate-500">Age 0–12</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-8 h-8 rounded-full bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
                    >
                      -
                    </button>
                    <span className="text-base font-extrabold w-6 text-center">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren(children + 1)}
                      className="w-8 h-8 rounded-full bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: BUDGET */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Step 4 — Budget</h3>
                <p className="text-xs text-slate-500 mt-1">Set your total target trip budget (INR ₹).</p>
              </div>

              {/* Slider */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500">Total Budget:</span>
                  <span className="text-2xl font-extrabold text-emerald-700">
                    ₹{budget.toLocaleString("en-IN")}
                  </span>
                </div>

                <input
                  type="range"
                  min={5000}
                  max={100000}
                  step={2500}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />

                <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-2">
                  <span>₹5,000</span>
                  <span>₹50,000</span>
                  <span>₹1,00,000+</span>
                </div>
              </div>

              {/* Tier options */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(["Backpacker", "Budget", "Comfort", "Premium", "Luxury"] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setBudgetTier(tier)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all border text-center ${
                      budgetTier === tier
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: TRAVEL STYLE */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Step 5 — Travel Style</h3>
                <p className="text-xs text-slate-500 mt-1">Select one or more travel styles you prefer.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {stylesList.map((style) => {
                  const selected = selectedStyles.includes(style.name);
                  return (
                    <button
                      key={style.name}
                      type="button"
                      onClick={() => handleStyleToggle(style.name)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                        selected
                          ? "border-emerald-600 bg-emerald-50 text-slate-900 font-bold"
                          : "border-slate-200 bg-white text-slate-600 font-medium hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-xl">{style.icon}</span>
                      <span className="text-xs sm:text-sm">{style.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: TRANSPORT */}
          {step === 6 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Step 6 — Transport Mode</h3>
                <p className="text-xs text-slate-500 mt-1">How would you prefer to travel?</p>
              </div>

              <div className="space-y-3">
                {transportOptions.map((t) => {
                  const Icon = t.icon;
                  const selected = transportMode === t.name;

                  return (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => setTransportMode(t.name)}
                      className={`w-full p-4 rounded-2xl border flex items-center justify-between text-left transition-all ${
                        selected
                          ? "border-emerald-600 bg-emerald-50 text-slate-900"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${selected ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-sm font-bold block">{t.name}</span>
                          <span className="text-xs text-slate-500">{t.desc}</span>
                        </div>
                      </div>
                      {selected && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 6 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-7 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCreateTrip}
                className="px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xl transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Create My Trip</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlanTripPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading planner...</div>}>
      <PlanTripWizardContent />
    </Suspense>
  );
}
