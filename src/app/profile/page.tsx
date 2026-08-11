"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { DESTINATIONS_DATA } from "@/data/mockData";
import TravelImage from "@/components/shared/TravelImage";
import {
  Briefcase,
  Heart,
  Hotel,
  Sliders,
  IndianRupee,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Check,
  Send,
  ArrowRight,
  Mail,
  User,
  Phone,
  ExternalLink,
  ChevronDown
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const {
    user,
    setUser,
    savedDestinationIds,
    toggleSaveDestination,
    trips,
    removeTrip,
    addToast
  } = useAppStore();

  // Active section state
  const [activeSection, setActiveSection] = useState<string>("support");

  // Form states
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState("+91 98765 43210");
  
  // Preferences
  const [selectedStyles, setSelectedStyles] = useState<string[]>(user.travelPreferences || ["Adventure", "Heritage", "Food"]);
  const [budgetTier, setBudgetTier] = useState<"Backpacker" | "Budget" | "Comfort" | "Premium" | "Luxury">(user.budgetPreference || "Comfort");
  const [dailyBudget, setDailyBudget] = useState<number>(3500);

  // Notification toggles
  const [pushNotifs, setPushNotifs] = useState(user.notificationsEnabled ?? true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [tripReminders, setTripReminders] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  // Support form state
  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Saved destinations list
  const savedDestinations = DESTINATIONS_DATA.filter((d) => savedDestinationIds.includes(d.id));

  // Favourite hotels mock list
  const favouriteHotels = [
    DESTINATIONS_DATA[0].whereToStay[0],
    DESTINATIONS_DATA[0].whereToStay[1],
    DESTINATIONS_DATA[1].whereToStay[0],
    DESTINATIONS_DATA[2].whereToStay[0],
  ];

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    // Clear cookies explicitly on client side
    document.cookie = "auth-session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "mock_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    
    addToast("Logged out successfully", "info");
    router.push("/auth/login");
    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 150);
  };

  const toggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user,
      name,
      email,
    });
    addToast("Account details updated successfully!", "success");
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user,
      travelPreferences: selectedStyles,
      budgetPreference: budgetTier,
    });
    addToast("Travel preferences saved!", "success");
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user,
      notificationsEnabled: pushNotifs,
    });
    addToast("Notification preferences updated!", "success");
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    addToast("Support ticket submitted! We will get back to you within 2 hours.", "success");
    setSupportSubject("");
    setSupportMessage("");
  };

  const availableStyles = [
    "Adventure",
    "Relaxation",
    "Culture",
    "Nature",
    "Food",
    "Spiritual",
    "Photography",
    "Nightlife",
    "Family",
    "Heritage",
    "Mountains",
    "Beaches"
  ];

  const sections = [
    { id: "trips", label: "My Trips", icon: Briefcase, count: trips.length },
    { id: "saved", label: "Saved Destinations", icon: Heart, count: savedDestinationIds.length },
    { id: "hotels", label: "Favourite Hotels", icon: Hotel, count: favouriteHotels.length },
    { id: "preferences", label: "Travel Preferences", icon: Sliders },
    { id: "budget", label: "Budget Preferences", icon: IndianRupee },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Account Settings", icon: Settings },
    { id: "support", label: "Help & Support", icon: HelpCircle },
  ];

  const faqs = [
    {
      q: "How does Traverse AI trip planning work?",
      a: "Traverse AI analyzes your budget, preferred dates, travellers, and interest tags to curate a day-by-day itinerary with verified attractions, hotels, and local food spots in seconds."
    },
    {
      q: "How do I edit my saved itinerary schedule?",
      a: "Navigate to 'My Trips', click on your trip to open the timeline view, and use the 'Add Activity', 'Change', or 'Remove' controls on any day slot."
    },
    {
      q: "Can I share my itinerary with travel companions?",
      a: "Yes! Simply open your trip or destination detail page and click the Share icon in the top right header to copy a shareable link."
    },
    {
      q: "What is the cancellation and refund policy for stays?",
      a: "Free cancellation is available up to 48 hours prior to check-in on most partner stays. Check individual stay policies on the hotel preview modal."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 pb-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile User Banner Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-emerald-100 shadow-md shrink-0 bg-emerald-600 text-white flex items-center justify-center font-extrabold text-2xl">
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user.name.charAt(0)
            )}
          </div>

          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{user.name}</h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">{user.email}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
              {selectedStyles.map((pref) => (
                <span
                  key={pref}
                  className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200"
                >
                  {pref}
                </span>
              ))}
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                {budgetTier} Tier
              </span>
            </div>
          </div>
        </div>

        {/* Section Navigation & Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Sidebar Menu (Matches Reference Design Screenshot) */}
          <div className="md:col-span-4 bg-white rounded-3xl p-3 border border-slate-200/90 shadow-sm space-y-1">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const active = activeSection === sec.id;

              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full p-3.5 rounded-[20px] flex items-center justify-between text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    active
                      ? "bg-[#0b1329] text-white shadow-md"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className={`w-4 h-4 ${active ? "text-emerald-400" : "text-emerald-600"}`} />
                    <span>{sec.label}</span>
                  </div>

                  {sec.count !== undefined ? (
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        active
                          ? "bg-slate-800 text-slate-200"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {sec.count}
                    </span>
                  ) : (
                    <ChevronRight className={`w-4 h-4 ${active ? "text-slate-300" : "text-slate-400"}`} />
                  )}
                </button>
              );
            })}

            {/* Logout Action Button */}
            <div className="pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full p-3.5 rounded-[20px] flex items-center justify-between text-xs sm:text-sm font-bold text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <LogOut className="w-4 h-4 text-rose-600" />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Section Active Content Panel */}
          <div className="md:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm min-h-[480px]">
            {/* 1. MY TRIPS SECTION */}
            {activeSection === "trips" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">My Trips</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Manage your planned itineraries and travel trips.</p>
                  </div>
                  <Link
                    href="/plan"
                    className="px-4 py-2 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-sm hover:bg-emerald-700 transition-all"
                  >
                    + Create New Trip
                  </Link>
                </div>

                {trips.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <Briefcase className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-semibold">No planned trips yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {trips.map((t) => (
                      <div
                        key={t.id}
                        className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all"
                      >
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                            <TravelImage src={t.coverImage} alt={t.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-slate-900">{t.title}</h4>
                            <p className="text-xs text-slate-500">{t.dates} • {t.travellersCount} Travellers</p>
                            <span className="text-xs font-extrabold text-emerald-700 block mt-0.5">
                              Budget: ₹{t.budget.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                          <Link
                            href={`/trips/${t.id}`}
                            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-1"
                          >
                            <span>View</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeTrip(t.id)}
                            className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 2. SAVED DESTINATIONS SECTION */}
            {activeSection === "saved" && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-extrabold text-slate-900">Saved Destinations</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Your bookmarked Indian destinations wishlist.</p>
                </div>

                {savedDestinations.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <Heart className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-semibold">Wishlist is empty</p>
                    <Link href="/destinations" className="text-xs text-emerald-600 font-bold underline mt-2 block">
                      Explore Destinations
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {savedDestinations.map((dest) => (
                      <div key={dest.id} className="p-3.5 rounded-2xl border border-slate-200 flex items-center gap-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                          <TravelImage src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 truncate">{dest.name}</h4>
                          <p className="text-xs text-slate-500">{dest.state}</p>
                          <span className="text-xs font-bold text-emerald-700 block mt-0.5">{dest.avgBudgetRange}</span>
                        </div>
                        <div className="flex flex-col gap-1.5 shrink-0">
                          <Link
                            href={`/destinations/${dest.id}`}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => toggleSaveDestination(dest.id)}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                          >
                            <Heart className="w-3.5 h-3.5 fill-current" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. FAVOURITE HOTELS SECTION */}
            {activeSection === "hotels" && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-extrabold text-slate-900">Favourite Hotels</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Stays and resorts saved for your upcoming journeys.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favouriteHotels.map((h) => (
                    <div key={h.id} className="p-3.5 rounded-2xl border border-slate-200 flex items-center gap-3">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                        <TravelImage src={h.image} alt={h.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate">{h.name}</h4>
                        <p className="text-xs text-slate-500 truncate">{h.location}</p>
                        <span className="text-xs font-bold text-emerald-700 block mt-0.5">₹{h.pricePerNight.toLocaleString("en-IN")}/night</span>
                      </div>
                      <Link
                        href="/hotels"
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shrink-0"
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. TRAVEL PREFERENCES SECTION */}
            {activeSection === "preferences" && (
              <form onSubmit={handleSavePreferences} className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-extrabold text-slate-900">Travel Preferences</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Customize your travel style so Traverse AI gives better recommendations.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Preferred Travel Styles</label>
                  <div className="flex flex-wrap gap-2">
                    {availableStyles.map((style) => {
                      const isSelected = selectedStyles.includes(style);
                      return (
                        <button
                          key={style}
                          type="button"
                          onClick={() => toggleStyle(style)}
                          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? "bg-emerald-600 text-white shadow-xs"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                          <span>{style}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Save Preferences
                  </button>
                </div>
              </form>
            )}

            {/* 5. BUDGET PREFERENCES SECTION */}
            {activeSection === "budget" && (
              <form onSubmit={handleSavePreferences} className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-extrabold text-slate-900">Budget Preferences</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Set your default budget tier and daily spending limits.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Budget Tier</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(["Backpacker", "Budget", "Comfort", "Premium", "Luxury"] as const).map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setBudgetTier(tier)}
                        className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                          budgetTier === tier
                            ? "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-xs font-bold block">{tier}</span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          {tier === "Backpacker" && "Under ₹10k"}
                          {tier === "Budget" && "₹10k – ₹20k"}
                          {tier === "Comfort" && "₹20k – ₹50k"}
                          {tier === "Premium" && "₹50k – ₹100k"}
                          {tier === "Luxury" && "₹100k+"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">Target Daily Spend</label>
                    <span className="text-xs font-extrabold text-emerald-700">₹{dailyBudget.toLocaleString("en-IN")}/day</span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={25000}
                    step={500}
                    value={dailyBudget}
                    onChange={(e) => setDailyBudget(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Save Budget Settings
                  </button>
                </div>
              </form>
            )}

            {/* 6. NOTIFICATIONS SECTION */}
            {activeSection === "notifications" && (
              <form onSubmit={handleSaveNotifications} className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-extrabold text-slate-900">Notification Settings</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Choose how and when Traverse alerts you.</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Push Notifications</span>
                      <span className="text-[11px] text-slate-500">Real-time alerts on your active trips</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={pushNotifs}
                      onChange={(e) => setPushNotifs(e.target.checked)}
                      className="w-5 h-5 accent-emerald-600 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Price Drop Alerts</span>
                      <span className="text-[11px] text-slate-500">Notify when saved hotels drop in price</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={priceAlerts}
                      onChange={(e) => setPriceAlerts(e.target.checked)}
                      className="w-5 h-5 accent-emerald-600 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Trip Reminders</span>
                      <span className="text-[11px] text-slate-500">Get reminders 24 hours before trip departure</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={tripReminders}
                      onChange={(e) => setTripReminders(e.target.checked)}
                      className="w-5 h-5 accent-emerald-600 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Weekly Newsletter</span>
                      <span className="text-[11px] text-slate-500">Receive top destination guides every Sunday</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                      className="w-5 h-5 accent-emerald-600 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Update Notifications
                  </button>
                </div>
              </form>
            )}

            {/* 7. ACCOUNT SETTINGS SECTION */}
            {activeSection === "settings" && (
              <form onSubmit={handleSaveAccount} className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-extrabold text-slate-900">Account Settings</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Manage your personal account credentials.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-emerald-600" /> Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-emerald-600" /> Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => addToast("Password reset link sent to your email!", "info")}
                    className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    Reset Password
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {/* 8. HELP & SUPPORT SECTION */}
            {activeSection === "support" && (
              <div className="space-y-8">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-extrabold text-slate-900">Help & Support Center</h3>
                  <p className="text-xs text-slate-500 mt-0.5">We are here to assist with your India travel plans 24/7.</p>
                </div>

                {/* FAQ Accordion */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">Frequently Asked Questions</h4>
                  <div className="space-y-3">
                    {faqs.map((faq, idx) => {
                      const isOpen = openFaq === idx;
                      return (
                        <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                            className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between bg-slate-50/50 hover:bg-slate-100/60 transition-all cursor-pointer"
                          >
                            <span>{faq.q}</span>
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                          </button>
                          {isOpen && (
                            <div className="p-4 bg-white border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Contact Support Form */}
                <form onSubmit={handleSupportSubmit} className="p-5 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4">
                  <h4 className="text-sm font-extrabold text-slate-900">Contact Support Team</h4>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={supportSubject}
                      onChange={(e) => setSupportSubject(e.target.value)}
                      placeholder="e.g. Question about my Kerala trip..."
                      className="w-full p-3 rounded-2xl bg-white border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                    <textarea
                      rows={3}
                      value={supportMessage}
                      onChange={(e) => setSupportMessage(e.target.value)}
                      placeholder="Describe how we can help you..."
                      className="w-full p-3 rounded-2xl bg-white border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Ticket</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
