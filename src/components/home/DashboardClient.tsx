"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sparkles, MapPin, User, Search, Heart, Settings, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";
import TravelWizard from "@/components/wizard/TravelWizard";

interface Destination {
  id: string;
  name: string;
  description: string;
  rating: number;
  hero_image_url: string;
  states: { name: string } | null;
}

interface DashboardClientProps {
  userEmail: string;
  userFullName: string;
  destinations: Destination[];
}

export default function DashboardClient({ userEmail, userFullName, destinations }: DashboardClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showWizard, setShowWizard] = useState(false);

  // Filter destinations based on search query
  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (dest.states?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative transition-colors duration-300">
      
      {/* Glow background accent */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-emerald-500/10 dark:bg-emerald-400/5 blur-[120px] -z-10 rounded-full pointer-events-none" />

      {/* Greeting and Header Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12"
      >
        {/* Welcome Card */}
        <div className="lg:col-span-2 soft-card flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="badge-green mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Voyager Dashboard
            </div>
            <h1 className="display-title mb-4">
              Namaste, <br />
              <span className="text-emerald-700 dark:text-emerald-400">{userFullName}</span> 🌿
            </h1>
            <p className="body-text max-w-xl">
              Explore curated Indian destinations, manage your personal travel passport, or build a custom AI itinerary in seconds.
            </p>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <button 
              onClick={() => setShowWizard(prev => !prev)}
              className="btn-primary"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              {showWizard ? "Close Travel Wizard" : "Plan with AI Wizard"}
            </button>
            
            <Link 
              href="/destinations"
              className="btn-secondary"
            >
              <Compass className="w-4 h-4" /> Explore All Destinations
            </Link>
          </div>
        </div>

        {/* User Stats Card */}
        <div className="bg-organic-black dark:bg-white/10 text-white p-8 rounded-[2rem] shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10 pointer-events-none">
            <Compass className="w-48 h-48 text-white" />
          </div>
          
          <div>
            <div className="flex items-center gap-3.5 mb-8">
              <div className="w-12 h-12 rounded-full bg-white/20 dark:bg-white/20 flex items-center justify-center shadow-inner">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="overflow-hidden">
                <h3 className="font-black text-lg leading-tight truncate">{userFullName}</h3>
                <p className="text-xs text-gray-300 dark:text-gray-300 font-semibold truncate">{userEmail}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/10">
                <div className="text-3xl font-black">3</div>
                <div className="caption-text text-gray-300 mt-1">Saved Trips</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/10">
                <div className="text-3xl font-black">5</div>
                <div className="caption-text text-gray-300 mt-1">Wishlist</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/15 flex justify-between items-center text-xs font-bold">
            <Link href="/profile" className="hover:underline flex items-center gap-1.5 text-white/90">
              View Passport <Eye className="w-3.5 h-3.5" />
            </Link>
            <Link href="/settings" className="hover:underline flex items-center gap-1.5 text-white/90">
              Settings <Settings className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Embedded Wizard Section */}
      <AnimatePresence>
        {showWizard && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden mb-12"
          >
            <div className="soft-card border-emerald-500/20">
              <TravelWizard />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search & Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="section-title">Featured Destinations</h2>
          <p className="body-text text-sm mt-1">Handpicked travel spots across India with high ratings.</p>
        </div>

        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search city or state..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-standard w-full pl-11"
          />
        </div>
      </div>

      {/* Destinations Grid */}
      <AnimatePresence mode="wait">
        {filteredDestinations.length > 0 ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredDestinations.map((dest, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={dest.id}
                className="soft-card-hover group p-0 overflow-hidden flex flex-col justify-between border border-slate-200/80 dark:border-white/10"
              >
                <div>
                  {/* Card Image Cover */}
                  <div className="h-56 relative w-full overflow-hidden bg-slate-100 dark:bg-white/5">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-108 transition-transform duration-700 ease-out"
                      style={{ backgroundImage: `url(${dest.hero_image_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Rating Pill */}
                    <div className="absolute top-4 right-4 bg-white/95 dark:bg-black/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-organic-black dark:text-white flex items-center gap-1 shadow-md border border-white/20 dark:border-white/10">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      <span>{dest.rating}</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6">
                    <div className="badge-tag mb-3">
                      <MapPin className="w-3 h-3 text-emerald-500" />
                      <span>{dest.states?.name || "India"}</span>
                    </div>
                    <h3 className="text-xl font-black text-organic-black dark:text-white mb-2 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {dest.name}
                    </h3>
                    <p className="body-text text-sm line-clamp-2">
                      {dest.description}
                    </p>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="px-6 pb-6 pt-4 flex justify-between items-center border-t border-slate-100 dark:border-white/5 mt-auto gap-3">
                  <Link 
                    href={`/destinations/${dest.id}`}
                    className="flex-1 h-10 rounded-full bg-slate-100 dark:bg-white/10 text-xs font-extrabold text-organic-black dark:text-white flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/20 transition-all border border-slate-200/50 dark:border-white/10"
                  >
                    Details
                  </Link>
                  
                  <Link 
                    href={`/ai-planner?prompt=${encodeURIComponent('Plan a trip to ' + dest.name)}`}
                    className="flex-1 h-10 rounded-full bg-organic-black text-white dark:bg-emerald-500 dark:text-black text-xs font-extrabold flex items-center justify-center gap-1 hover:scale-[1.03] transition-all shadow-md dark:shadow-[0_4px_20px_rgba(16,185,129,0.3)]"
                  >
                    Plan Trip <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="soft-card p-12 text-center max-w-md mx-auto"
          >
            <Compass className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4 animate-spin-slow" />
            <h3 className="text-lg font-black text-organic-black dark:text-white mb-2">No destinations found</h3>
            <p className="body-text text-sm mb-6">We couldn&apos;t find any destination matching &quot;{searchQuery}&quot;.</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="btn-primary mx-auto h-10 px-5 text-xs"
            >
              Clear Search
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
