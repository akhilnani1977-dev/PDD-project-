"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wallet, Send, Bot, MapPin } from "lucide-react";

type DayPlan = {
  day: number;
  title: string;
  description: string;
};

type TripResult = {
  title: string;
  budget: string;
  destinations: string[];
  days: DayPlan[];
};

export default function AIPlannerPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<null | TripResult>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    
    setIsGenerating(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate plan');
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      // Fallback result if API fails
      setResult({
        title: "Discover Incredible India",
        budget: "₹30,000",
        destinations: ["Delhi", "Agra", "Jaipur"],
        days: [
          { day: 1, title: "Arrive in Delhi", description: "Explore Old Delhi, Red Fort, and Chandni Chowk." },
          { day: 2, title: "Taj Mahal, Agra", description: "Pre-dawn drive to witness the Taj at sunrise." },
          { day: 3, title: "Agra Fort & Jaipur", description: "Explore Agra Fort, then drive to the Pink City." },
          { day: 4, title: "Amer Fort & Bazaars", description: "Morning fort visit, afternoon shopping." },
          { day: 5, title: "Departure", description: "Final breakfast, souvenirs, and safe travels home." },
        ]
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-8 max-w-5xl mx-auto relative">
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-traverse-aurora/10 blur-[150px] -z-10 rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-traverse-cyan/10 text-traverse-cyan">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-4">
          AI TRIP <span className="text-gradient">PLANNER</span>
        </h1>
        <p className="text-lg text-traverse-frost/70 max-w-2xl mx-auto">
          Describe your dream Indian vacation. Our AI will craft a personalized itinerary, calculate budgets, and find the best routes.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-panel p-2 rounded-3xl max-w-3xl mx-auto mb-16"
      >
        <form onSubmit={handleGenerate} className="relative flex items-center">
          <div className="absolute left-6 text-traverse-frost/40">
            <Bot className="w-6 h-6" />
          </div>
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., Plan a 5-day romantic trip to Rajasthan under ₹40,000..." 
            className="w-full py-6 pl-16 pr-32 text-lg text-white placeholder-traverse-frost/40 bg-transparent border-none focus:outline-none focus:ring-0"
            disabled={isGenerating}
          />
          <button 
            type="submit" 
            disabled={isGenerating || !prompt}
            className="absolute right-2 px-6 py-4 rounded-2xl bg-gradient-main text-white font-bold flex items-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isGenerating ? "Generating..." : "Plan Trip"}
            {!isGenerating && <Send className="w-4 h-4" />}
          </button>
        </form>
      </motion.div>

      {/* Loading State */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-16 h-16 border-4 border-traverse-cyan/20 border-t-traverse-cyan rounded-full animate-spin mb-6"></div>
            <p className="text-traverse-cyan font-medium animate-pulse">Analyzing millions of data points across India...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results State */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-8 md:p-12 rounded-3xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-8 border-b border-white/10">
              <h2 className="text-3xl font-bold text-white">{result.title}</h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-traverse-ocean text-traverse-frost">
                  <Wallet className="w-4 h-4 text-traverse-aurora" />
                  <span className="font-medium">{result.budget}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-traverse-ocean text-traverse-frost">
                  <MapPin className="w-4 h-4 text-traverse-cyan" />
                  <span className="font-medium">{result.destinations.join(" & ")}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 relative">
              {/* Timeline Line */}
              <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-traverse-cyan to-traverse-aurora"></div>
              
              {result.days.map((day: DayPlan, index: number) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  key={day.day} 
                  className="flex gap-6 relative"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-traverse-ocean border-2 border-traverse-cyan flex items-center justify-center z-10 text-white font-bold">
                    {day.day}
                  </div>
                  <div className="pt-2 pb-8">
                    <h3 className="text-xl font-bold text-white mb-2">{day.title}</h3>
                    <p className="text-traverse-frost/70">{day.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 flex justify-end">
               <button className="px-8 py-3 rounded-full bg-white text-traverse-midnight font-bold hover:bg-traverse-frost transition-colors">
                 Save Itinerary
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
