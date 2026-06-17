"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sparkles, MapPin, User, Search, Heart, Settings, Eye } from "lucide-react";
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
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto relative bg-organic-light dark:bg-organic-green-dark transition-colors duration-300">
      
      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-full h-[40vh] bg-organic-green/5 dark:bg-organic-green/10 blur-[120px] -z-10 rounded-full pointer-events-none" />

      {/* Greeting and Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
      >
        {/* Welcome message */}
        <div className="lg:col-span-2 bg-white dark:bg-white/5 p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 dark:border-white/10 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-organic-green/10 text-organic-green font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Voyager Dashboard
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-organic-black dark:text-white leading-tight mb-4">
              Namaste, <br />
              <span className="text-organic-green">{userFullName}</span>! 🌿
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-semibold max-w-lg">
              Explore recommendations, manage your saved itineraries, or request a custom itinerary for your next trip.
            </p>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <button 
              onClick={() => setShowWizard(prev => !prev)}
              className="px-6 py-3.5 bg-organic-black dark:bg-white text-white dark:text-organic-black rounded-full font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer text-sm"
            >
              <Sparkles className="w-4 h-4 text-organic-green" />
              {showWizard ? "Close Travel Wizard" : "Plan with Travel Wizard"}
            </button>
            
            <Link 
              href="/destinations"
              className="px-6 py-3.5 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 text-organic-black dark:text-white rounded-full font-bold transition-colors flex items-center gap-2 text-sm"
            >
              <Compass className="w-4 h-4" /> Explore Destinations
            </Link>
          </div>
        </div>

        {/* User stats widget */}
        <div className="bg-organic-green text-white p-8 rounded-[2.5rem] shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10">
            <Compass className="w-48 h-48" />
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">{userFullName}</h3>
                <p className="text-xs text-white/70 font-semibold">{userEmail}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-black">3</div>
                <div className="text-xs font-bold text-white/80 uppercase tracking-wider">Saved Itineraries</div>
              </div>
              <div>
                <div className="text-3xl font-black">2</div>
                <div className="text-xs font-bold text-white/80 uppercase tracking-wider">Favorite Locations</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/20 flex justify-between items-center text-xs font-bold">
            <Link href="/profile" className="hover:underline flex items-center gap-1">
              View Passport <Eye className="w-3.5 h-3.5" />
            </Link>
            <Link href="/settings" className="hover:underline flex items-center gap-1">
              Settings <Settings className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Embedded Wizard Toggle */}
      <AnimatePresence>
        {showWizard && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden mb-12"
          >
            <div className="bg-white dark:bg-white/5 p-4 rounded-[2.5rem] border border-organic-green/20">
              <TravelWizard />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Filters Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-black text-organic-black dark:text-white">Featured Destinations</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mt-1">Carefully curated hot spots based on traveler reviews.</p>
        </div>

        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search destination..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3.5 pl-12 pr-4 text-sm text-organic-black dark:text-white bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-organic-green"
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredDestinations.map((dest, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={dest.id}
                className="group bg-white dark:bg-white/5 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 dark:border-white/10 overflow-hidden relative"
              >
                {/* Hero Image */}
                <div className="h-56 relative w-full overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${dest.hero_image_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Rating Tag */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-organic-black dark:text-white flex items-center gap-1 shadow-sm">
                    <Heart className="w-3.5 h-3.5 text-organic-accent fill-organic-accent" />
                    <span>{dest.rating}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center gap-1 text-organic-green font-bold text-xs uppercase tracking-wider mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{dest.states?.name || "India"}</span>
                  </div>
                  <h3 className="text-xl font-black text-organic-black dark:text-white mb-2 leading-tight">
                    {dest.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold line-clamp-2 mb-6">
                    {dest.description}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-white/10">
                    <Link 
                      href={`/destinations/${dest.id}`}
                      className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-organic-black dark:text-white rounded-full text-xs font-bold transition-colors"
                    >
                      View Details
                    </Link>
                    
                    <Link 
                      href={`/ai-planner?prompt=${encodeURIComponent('Plan a trip to ' + dest.name)}`}
                      className="px-5 py-2.5 bg-organic-black dark:bg-white text-white dark:text-organic-black rounded-full text-xs font-bold hover:scale-105 transition-transform"
                    >
                      Plan Trip
                    </Link>
                  </div>
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
            className="bg-white dark:bg-white/5 p-12 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-white/10 text-center max-w-md mx-auto"
          >
            <Compass className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-spin-slow" />
            <h3 className="text-lg font-black text-organic-black dark:text-white mb-2">No results found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">We couldn&apos;t find any destinations matching &quot;{searchQuery}&quot;.</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-6 px-5 py-2.5 bg-organic-black text-white text-xs font-bold rounded-full cursor-pointer"
            >
              Clear Search
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
