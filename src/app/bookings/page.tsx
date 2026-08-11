"use client";

import { useState } from "react";
import {
  Plane, Hotel, Bus, Train, Car, Shield, Ticket, Search,
  Calendar, MapPin, User, CheckCircle2, Download
} from "lucide-react";

const ACTIVE_BOOKINGS = [
  {
    id: "TRV-FL-8821",
    type: "Flight",
    title: "IndiGo 6E-204 · Delhi (DEL) to Goa (GOI)",
    dates: "Oct 14, 2025 · 08:30 AM",
    status: "Confirmed",
    price: "₹6,450",
    details: "Seat 12A · Non-stop (2h 30m)",
    icon: Plane,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80"
  },
  {
    id: "TRV-HT-3920",
    type: "Hotel",
    title: "Taj Lake Palace · Udaipur",
    dates: "Nov 02–05, 2025 · 3 Nights",
    status: "Confirmed",
    price: "₹38,000",
    details: "Luxury Lake View Suite · Breakfast Included",
    icon: Hotel,
    image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=600&q=80"
  }
];

const PAST_BOOKINGS = [
  {
    id: "TRV-TR-1029",
    type: "Train",
    title: "Vande Bharat Express · Delhi to Jaipur",
    dates: "Jan 12, 2025",
    status: "Completed",
    price: "₹1,450",
    details: "Executive Chair Car",
    icon: Train,
  },
  {
    id: "TRV-HT-0021",
    type: "Hotel",
    title: "Munnar Tea Country Resort",
    dates: "Dec 18–21, 2024",
    status: "Completed",
    price: "₹14,200",
    details: "Valley View Cottage",
    icon: Hotel,
  }
];

type BookingTab = "flights" | "hotels" | "buses" | "trains" | "cars" | "insurance";

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<BookingTab>("flights");
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const handleDownloadInvoice = (id: string) => {
    setDownloadedId(id);
    setTimeout(() => setDownloadedId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[280px] bg-[#0DBB7B]/10 blur-[140px] -z-10 rounded-full pointer-events-none" />

      {/* Page Header */}
      <div className="mb-8">
        <div className="badge-primary mb-3">
          <Ticket className="w-3.5 h-3.5 text-[#0DBB7B]" /> Commercial Booking Engine
        </div>
        <h1 className="display-hero mb-3">
          Bookings & <span className="text-[#0DBB7B]">Reservations</span>
        </h1>
        <p className="body-text max-w-2xl">
          Search and book flights, hotels, trains, buses, car rentals, and travel insurance with AI best-rate guarantee.
        </p>
      </div>

      {/* Booking Category Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none border-b border-slate-200 dark:border-white/10">
        {[
          { id: "flights" as BookingTab, label: "Flights", icon: Plane },
          { id: "hotels" as BookingTab, label: "Hotels & Stays", icon: Hotel },
          { id: "trains" as BookingTab, label: "Trains (IRCTC)", icon: Train },
          { id: "buses" as BookingTab, label: "Buses & Coaches", icon: Bus },
          { id: "cars" as BookingTab, label: "Rental Cars", icon: Car },
          { id: "insurance" as BookingTab, label: "Travel Insurance", icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-full text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                  : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Booking Search Box */}
      <div className="soft-card p-6 sm:p-8 mb-12 border border-slate-200 dark:border-white/10">
        <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Search className="w-4 h-4 text-emerald-500" />
          Search Best Rates for {activeTab.toUpperCase()}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">From / Origin</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                defaultValue="New Delhi (DEL)"
                className="input-standard w-full pl-10 text-xs font-bold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">To / Destination</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                defaultValue="Goa (GOI)"
                className="input-standard w-full pl-10 text-xs font-bold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">Departure Date</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                className="input-standard w-full pl-10 text-xs font-bold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">Travelers & Class</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select className="input-standard w-full pl-10 text-xs font-bold bg-transparent">
                <option>1 Adult · Economy</option>
                <option>2 Adults · Economy</option>
                <option>Family (2A + 2C)</option>
                <option>Business Class</option>
              </select>
            </div>
          </div>
        </div>

        <button className="btn-accent w-full sm:w-auto h-12 px-8 text-sm">
          <Search className="w-4 h-4" /> Find Best Fare Deals
        </button>
      </div>

      {/* Active & Confirmed Bookings Section */}
      <div className="space-y-6">
        <h2 className="section-title flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Active Reservations & Tickets
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ACTIVE_BOOKINGS.map((booking) => (
            <div
              key={booking.id}
              className="soft-card p-6 border border-slate-200 dark:border-white/10 flex flex-col justify-between"
            >
              <div className="flex items-start gap-4 mb-4">
                {booking.image && (
                  <div
                    className="w-20 h-20 rounded-2xl bg-cover bg-center shrink-0 border border-slate-200 dark:border-white/10"
                    style={{ backgroundImage: `url(${booking.image})` }}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                      {booking.status}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{booking.id}</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white truncate">{booking.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{booking.dates}</p>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">{booking.details}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Paid Amount</span>
                  <strong className="text-base font-black text-slate-900 dark:text-white">{booking.price}</strong>
                </div>

                <button
                  onClick={() => handleDownloadInvoice(booking.id)}
                  className="h-10 px-4 rounded-full bg-slate-100 dark:bg-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-500" />
                  {downloadedId === booking.id ? "Invoice Downloaded!" : "Download PDF Ticket"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Booking History */}
      <div className="mt-12 space-y-4">
        <h2 className="text-xl font-black text-slate-900 dark:text-white">Past Booking History</h2>
        <div className="space-y-3">
          {PAST_BOOKINGS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-emerald-500 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">{p.title}</h4>
                    <span className="text-[11px] text-slate-400">{p.dates} · {p.details}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">{p.price}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{p.id}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
