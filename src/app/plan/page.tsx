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
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

function PlanTripWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedDest = searchParams?.get("destination") || "";
  const { addTrip, addToast } = useAppStore();

  const [step, setStep] = useState(1);

  // Compute today's ISO date string (YYYY-MM-DD)
  const todayStr = new Date().toISOString().split("T")[0];

  // Helper for default +5 days end date
  const getDefaultEndDate = (start: string) => {
    const d = new Date(start);
    d.setDate(d.getDate() + 5);
    return d.toISOString().split("T")[0];
  };

  // Form State
  const [tripType, setTripType] = useState<"single" | "multiple">("single");
  const [selectedDestination, setSelectedDestination] = useState(preselectedDest || "Kerala");
  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(getDefaultEndDate(todayStr));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [budget, setBudget] = useState(20000);
  const [budgetTier, setBudgetTier] = useState<"Backpacker" | "Budget" | "Comfort" | "Premium" | "Luxury">("Comfort");
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["Relaxation", "Culture"]);
  const [transportMode, setTransportMode] = useState<string>("Flight");

  // Date Validation Flags
  const isPastStartDate = startDate < todayStr;
  const isEndDateBeforeStart = endDate < startDate;
  const isStep2DateInvalid = isPastStartDate || isEndDateBeforeStart;

  const handleStartDateChange = (newStart: string) => {
    setStartDate(newStart);
    // If end date becomes earlier than new start date, auto-adjust end date
    if (endDate < newStart) {
      setEndDate(getDefaultEndDate(newStart));
    }
  };

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
          ],
        },
      ],
    };

    addTrip(newTrip);
    addToast(`Trip "${newTrip.title}" planned successfully!`, "success");
    router.push(`/trips/${newTripId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 pb-24 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
            Trip Wizard
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Plan Your Perfect India Experience
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Customized itineraries, instant cost breakdown, and live travel recommendations.
          </p>
        </div>

        {/* Wizard Step Progress Indicator */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between relative">
            {[1, 2, 3, 4, 5, 6].map((s) => {
              const active = step === s;
              const completed = step > s;

              return (
                <div key={s} className="flex flex-col items-center relative z-10">
                  <button
                    type="button"
                    onClick={() => {
                      if (s < step || !isStep2DateInvalid) setStep(s);
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold transition-all cursor-pointer ${
                      completed
                        ? "bg-emerald-600 text-white"
                        : active
                        ? "bg-slate-900 text-white ring-4 ring-slate-100"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {completed ? "✓" : s}
                  </button>
                  <span className="text-[10px] font-bold text-slate-500 mt-1 hidden sm:block">
                    {s === 1
                      ? "Destination"
                      : s === 2
                      ? "Dates"
                      : s === 3
                      ? "Travellers"
                      : s === 4
                      ? "Budget"
                      : s === 5
                      ? "Style"
                      : "Transport"}
                  </span>
                </div>
              );
            })}
            {/* Progress Bar background line */}
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-100 -z-0" />
          </div>
        </div>

        {/* Step Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl">
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
                  className={`p-3.5 rounded-2xl border text-xs font-bold text-center transition-all cursor-pointer ${
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
                  className={`p-3.5 rounded-2xl border text-xs font-bold text-center transition-all cursor-pointer ${
                    tripType === "multiple"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                      : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  Multiple Destinations
                </button>
              </div>

              {/* Destination Dropdown */}
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

          {/* STEP 2: DATES WITH STRICT VALIDATION */}
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
                    min={todayStr}
                    value={startDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    className={`w-full p-3.5 rounded-2xl border text-sm font-semibold text-slate-900 focus:outline-none transition-colors ${
                      isPastStartDate
                        ? "border-rose-500 bg-rose-50/50"
                        : "border-slate-200 focus:border-emerald-600"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">End Date</label>
                  <input
                    type="date"
                    min={startDate || todayStr}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={`w-full p-3.5 rounded-2xl border text-sm font-semibold text-slate-900 focus:outline-none transition-colors ${
                      isEndDateBeforeStart
                        ? "border-rose-500 bg-rose-50/50"
                        : "border-slate-200 focus:border-emerald-600"
                    }`}
                  />
                </div>
              </div>

              {/* INLINE DATE VALIDATION ERRORS */}
              {isPastStartDate && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-rose-800 text-xs font-semibold">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Start date cannot be in the past. Please select today or a future date.</span>
                </div>
              )}

              {isEndDateBeforeStart && !isPastStartDate && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-rose-800 text-xs font-semibold">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>End date cannot be earlier than start date ({startDate}). Please pick a valid end date.</span>
                </div>
              )}
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
                      className="w-8 h-8 rounded-full bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-base font-extrabold w-6 text-center">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="w-8 h-8 rounded-full bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
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
                      className="w-8 h-8 rounded-full bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-base font-extrabold w-6 text-center">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren(children + 1)}
                      className="w-8 h-8 rounded-full bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
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
                <h3 className="text-xl font-bold text-slate-900">Step 4 — Budget Category</h3>
                <p className="text-xs text-slate-500 mt-1">Select your estimated budget preference.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(["Backpacker", "Budget", "Comfort", "Premium", "Luxury"] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => {
                        setBudgetTier(tier);
                        if (tier === "Backpacker") setBudget(8000);
                        else if (tier === "Budget") setBudget(14000);
                        else if (tier === "Comfort") setBudget(20000);
                        else if (tier === "Premium") setBudget(40000);
                        else setBudget(80000);
                      }}
                      className={`p-3.5 rounded-2xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        budgetTier === tier
                          ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-600">Total Estimated Budget:</span>
                    <span className="text-emerald-700 text-base">₹{budget.toLocaleString("en-IN")}</span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={150000}
                    step={1000}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: TRAVEL STYLE */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Step 5 — Travel Style</h3>
                <p className="text-xs text-slate-500 mt-1">What kind of experiences do you enjoy?</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {stylesList.map((style) => {
                  const selected = selectedStyles.includes(style.name);
                  return (
                    <button
                      key={style.name}
                      type="button"
                      onClick={() => handleStyleToggle(style.name)}
                      className={`p-3.5 rounded-2xl border flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                        selected
                          ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-lg">{style.icon}</span>
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
                      className={`w-full p-4 rounded-2xl border flex items-center justify-between text-left transition-all cursor-pointer ${
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
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
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
                disabled={step === 2 && isStep2DateInvalid}
                onClick={() => {
                  if (step === 2 && isStep2DateInvalid) return;
                  setStep(step + 1);
                }}
                className={`px-7 py-3 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center gap-1.5 ${
                  step === 2 && isStep2DateInvalid
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                }`}
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCreateTrip}
                className="px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xl transition-all flex items-center gap-2 cursor-pointer"
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
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading trip planner...</div>}>
      <PlanTripWizardContent />
    </Suspense>
  );
}
