"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import {
  Compass, Sparkles, MapPin, Star, ArrowRight, Send, Bot,
  Wallet, X, Mail, Lock, User, Map, Mountain, Waves,
  TreePine, Building2, Camera, ChevronDown
} from "lucide-react";
import Link from "next/link";

// --- 3D Globe ---
function RotatingGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => { if (meshRef.current) meshRef.current.rotation.y += delta * 0.15; });
  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <meshStandardMaterial color="#06B6D4" wireframe transparent opacity={0.25} emissive="#06B6D4" emissiveIntensity={0.6} />
    </Sphere>
  );
}

// --- Types ---
type DayPlan = { day: number; title: string; description: string };
type TripResult = { title: string; budget: string; destinations: string[]; days: DayPlan[] };

// --- Mock India Data ---
const destinations = [
  { id: 1, name: "Ladakh", state: "Jammu & Kashmir", rating: 4.9, category: "Hill Station", icon: Mountain, description: "The land of high passes, stunning lakes, and ancient monasteries.", image: "/images/ladakh.png" },
  { id: 2, name: "Kerala Backwaters", state: "Kerala", rating: 4.9, category: "Waterways", icon: Waves, description: "God's Own Country — tranquil houseboat cruises through lush canals.", image: "/images/kerala.png" },
  { id: 3, name: "Jaipur", state: "Rajasthan", rating: 4.7, category: "Heritage", icon: Building2, description: "The Pink City — majestic forts, royal palaces, and vibrant bazaars.", image: "/images/jaipur.png" },
  { id: 4, name: "Andaman Islands", state: "Andaman & Nicobar", rating: 4.8, category: "Beach", icon: Waves, description: "Pristine white-sand beaches and world-class scuba diving.", image: "/images/andaman.png" },
  { id: 5, name: "Hampi", state: "Karnataka", rating: 4.7, category: "Heritage", icon: Camera, description: "Ancient ruins of a medieval Hindu empire among surreal boulder landscapes.", image: "/images/hampi.png" },
  { id: 6, name: "Valley of Flowers", state: "Uttarakhand", rating: 4.8, category: "Nature", icon: TreePine, description: "A UNESCO World Heritage Site blanketed in alpine wildflowers.", image: "/images/hero.png" },
];

const stats = [
  { label: "Destinations", value: "500+" },
  { label: "Indian States", value: "28+6" },
  { label: "AI Itineraries", value: "10K+" },
  { label: "Happy Travellers", value: "50K+" },
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tripResult, setTripResult] = useState<TripResult | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialPrompt = params.get('prompt');
    if (initialPrompt) {
      setPrompt(initialPrompt);
      // Auto-scroll to planner
      setTimeout(() => {
        document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  const handlePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    setIsGenerating(true);
    setTripResult(null);
    
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
      
      setTripResult(data);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">

      {/* ── SECTION 1: HERO ── */}
      <section id="home" className="relative flex flex-col items-center justify-center min-h-screen pt-24 pb-16 overflow-hidden">
        {/* 3D Globe Background */}
        <div className="absolute inset-0 -z-10">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <RotatingGlobe />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
          </Canvas>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-traverse-midnight/40 via-transparent to-traverse-midnight pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-traverse-aurora/15 rounded-full blur-[150px] -z-20 pointer-events-none" />

        <div className="z-10 flex flex-col items-center text-center px-4 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center px-5 py-2 mb-8 text-sm font-semibold border rounded-full text-traverse-cyan border-traverse-cyan/30 glass-panel">
            <span className="w-2 h-2 mr-2 rounded-full bg-traverse-cyan animate-pulse" />
            AI-Powered Travel Intelligence — India Only
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-6 leading-none">
            DISCOVER <br /><span className="text-gradient">YOUR INDIA</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="text-xl text-traverse-frost/70 max-w-2xl mb-12">
            A futuristic AI travel OS — plan trips, discover hidden gems, and explore all 28 states & 8 union territories with cinematic intelligence.
          </motion.p>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4 mb-20">
            <button onClick={() => document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center px-8 py-4 text-lg font-bold text-white rounded-full bg-gradient-main hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all">
              Plan My Trip <Sparkles className="w-5 h-5 ml-2" />
            </button>
            <button onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center px-8 py-4 text-lg font-bold text-white rounded-full border border-traverse-frost/20 glass-panel hover:bg-traverse-frost/10 hover:scale-105 transition-all">
              Explore India <Map className="w-5 h-5 ml-2" />
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
            {stats.map((s) => (
              <div key={s.label} className="glass-panel rounded-2xl p-4 text-center">
                <div className="text-3xl font-black text-gradient">{s.value}</div>
                <div className="text-sm text-traverse-frost/60 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-traverse-frost/40" />
        </div>
      </section>

      {/* ── SECTION 2: DESTINATIONS ── */}
      <section id="destinations" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="absolute left-0 w-full h-[60vh] bg-traverse-aurora/5 blur-[150px] -z-10 rounded-full pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <div className="inline-flex items-center px-4 py-1 mb-4 text-sm border rounded-full text-traverse-cyan border-traverse-cyan/30 glass-panel">
            <MapPin className="w-3 h-3 mr-2" /> Top Destinations
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-4">
            EXPLORE <span className="text-gradient">INDIA</span>
          </h2>
          <p className="text-xl text-traverse-frost/60 max-w-2xl">
            Hand-curated destinations from Kashmir to Kanyakumari. Every terrain, every culture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <motion.div key={dest.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => {
                setPrompt(`Plan a 5-day trip to ${dest.name}`);
                document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' });
                // Automatically generate if possible (optional, but just setting the prompt and scrolling is great)
              }}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer glass-panel">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-90"
                style={{ backgroundImage: `url(${dest.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-traverse-midnight via-traverse-midnight/60 to-transparent" />

              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-bold rounded-full glass-panel text-traverse-cyan border border-traverse-cyan/30">
                  {dest.category}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-1 text-traverse-cyan text-sm font-semibold">
                  <MapPin className="w-3 h-3" /> {dest.state}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{dest.name}</h3>
                <p className="text-traverse-frost/70 text-sm mb-4 line-clamp-2">{dest.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-traverse-aurora">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-sm">{dest.rating}</span>
                  </div>
                  <div className="flex items-center text-sm text-white group-hover:text-traverse-cyan transition-colors font-medium">
                    Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: AI PLANNER ── */}
      <section id="planner" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-traverse-cyan/10 blur-[150px] -z-10 rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 mb-6 rounded-2xl bg-traverse-cyan/10 text-traverse-cyan">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-4">
              AI TRIP <span className="text-gradient">PLANNER</span>
            </h2>
            <p className="text-xl text-traverse-frost/60 max-w-2xl mx-auto">
              Describe your dream Indian vacation. Our AI crafts a personalized itinerary with budgets, routes, and hidden gems.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="glass-panel p-2 rounded-3xl mb-12">
            <form onSubmit={handlePlan} className="relative flex items-center">
              <div className="absolute left-6 text-traverse-frost/40"><Bot className="w-6 h-6" /></div>
              <input type="text" value={prompt} onChange={e => setPrompt(e.target.value)} disabled={isGenerating}
                placeholder="E.g., Plan a 5-day romantic trip to Rajasthan under ₹40,000..."
                className="w-full py-6 pl-16 pr-36 text-lg text-white placeholder-traverse-frost/40 bg-transparent border-none focus:outline-none" />
              <button type="submit" disabled={isGenerating || !prompt}
                className="absolute right-2 px-6 py-4 rounded-2xl bg-gradient-main text-white font-bold flex items-center gap-2 hover:opacity-90 disabled:opacity-40 transition-all">
                {isGenerating ? "Thinking..." : "Generate"} <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

          {/* Suggested Prompts */}
          {!tripResult && !isGenerating && (
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {["5 days in Goa under ₹20,000", "Trek to Valley of Flowers", "Family trip to Kerala backwaters", "Heritage tour of Rajasthan"].map(s => (
                <button key={s} onClick={() => setPrompt(s)}
                  className="px-4 py-2 text-sm rounded-full glass-panel border border-traverse-frost/10 text-traverse-frost/70 hover:border-traverse-cyan hover:text-traverse-cyan transition-all">
                  {s}
                </button>
              ))}
            </div>
          )}

          <AnimatePresence>
            {isGenerating && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center py-16">
                <div className="w-16 h-16 border-4 border-traverse-cyan/20 border-t-traverse-cyan rounded-full animate-spin mb-6" />
                <p className="text-traverse-cyan animate-pulse font-medium">Analyzing India travel data & crafting your journey...</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {tripResult && (
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-8 md:p-12 rounded-3xl">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-8 border-b border-white/10">
                  <h3 className="text-3xl font-bold text-white">{tripResult.title}</h3>
                  <div className="flex gap-3 flex-wrap">
                    <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-traverse-ocean text-traverse-frost">
                      <Wallet className="w-4 h-4 text-traverse-aurora" /> {tripResult.budget}
                    </span>
                    <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-traverse-ocean text-traverse-frost">
                      <MapPin className="w-4 h-4 text-traverse-cyan" /> {tripResult.destinations.join(" → ")}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 relative">
                  <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-traverse-cyan to-traverse-aurora" />
                  {tripResult.days.map((d, i) => (
                    <motion.div key={d.day} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                      className="flex gap-6 pb-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-traverse-ocean border-2 border-traverse-cyan flex items-center justify-center font-bold text-white z-10">
                        {d.day}
                      </div>
                      <div className="pt-2">
                        <h4 className="text-lg font-bold text-white mb-1">{d.title}</h4>
                        <p className="text-traverse-frost/70 text-sm">{d.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 flex justify-end gap-4">
                  <button onClick={() => setTripResult(null)} className="px-6 py-3 rounded-full glass-panel border border-traverse-frost/20 text-traverse-frost hover:bg-traverse-frost/10 transition-all font-medium">
                    Reset
                  </button>
                  <button onClick={() => setAuthMode("signup")} className="px-8 py-3 rounded-full bg-gradient-main text-white font-bold hover:opacity-90 transition-all">
                    Save Itinerary
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── SECTION 4: CTA / AUTH ── */}
      <section id="join" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-traverse-aurora/15 blur-[120px] rounded-full" />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center glass-panel p-12 md:p-20 rounded-3xl border border-traverse-aurora/20">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm border rounded-full text-traverse-aurora border-traverse-aurora/30 glass-panel">
            <Compass className="w-3 h-3 mr-2" /> Your AI Travel Passport
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            START YOUR <span className="text-gradient">JOURNEY</span>
          </h2>
          <p className="text-xl text-traverse-frost/60 mb-10 max-w-2xl mx-auto">
            Join 50,000+ travellers exploring India with AI. Save itineraries, track expenses, and unlock premium features.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setAuthMode("signup")}
              className="px-10 py-5 text-xl font-black text-white rounded-full bg-gradient-main hover:scale-105 hover:shadow-[0_0_60px_rgba(124,58,237,0.6)] transition-all">
              Create Free Account
            </button>
            <button onClick={() => setAuthMode("login")}
              className="px-10 py-5 text-xl font-bold text-white rounded-full border border-traverse-frost/20 glass-panel hover:bg-traverse-frost/10 hover:scale-105 transition-all">
              Sign In
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-8 border-t border-traverse-frost/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-traverse-cyan" />
            <span className="text-xl font-black tracking-widest text-white">TRAVERSE</span>
            <span className="text-traverse-frost/40 text-sm ml-2">AI Travel OS for India</span>
          </div>
          <p className="text-traverse-frost/40 text-sm">© 2025 Traverse. Built with Next.js 15 + Supabase.</p>
        </div>
      </footer>

      {/* ── AUTH MODAL ── */}
      <AnimatePresence>
        {authMode && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-traverse-midnight/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
              className="w-full max-w-md glass-panel rounded-3xl p-8 relative border border-traverse-frost/10">
              <button onClick={() => setAuthMode(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-traverse-frost/10 transition-colors">
                <X className="w-5 h-5 text-traverse-frost/60" />
              </button>

              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-traverse-ocean/50 border border-traverse-frost/10">
                  <Compass className={`w-8 h-8 ${authMode === "login" ? "text-traverse-cyan" : "text-traverse-aurora"}`} />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-center mb-1">{authMode === "login" ? "Welcome Back" : "Join Traverse"}</h2>
              <p className="text-center text-traverse-frost/60 mb-8 text-sm">{authMode === "login" ? "Enter your details to continue." : "Create your AI travel passport."}</p>

              <form action={authMode === "signup" ? signup : login} className="space-y-4">
                {authMode === "signup" && (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-traverse-frost/40" />
                    <input type="text" name="full_name" placeholder="Full Name"
                      className="w-full py-3 pl-12 pr-4 text-white placeholder-traverse-frost/30 bg-traverse-midnight/50 border rounded-xl border-traverse-frost/10 focus:border-traverse-aurora focus:outline-none" />
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-traverse-frost/40" />
                  <input type="email" name="email" placeholder="voyager@traverse.ai"
                    className={`w-full py-3 pl-12 pr-4 text-white placeholder-traverse-frost/30 bg-traverse-midnight/50 border rounded-xl border-traverse-frost/10 focus:outline-none ${authMode === "login" ? "focus:border-traverse-cyan" : "focus:border-traverse-aurora"}`} />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-traverse-frost/40" />
                  <input type="password" name="password" placeholder="••••••••"
                    className={`w-full py-3 pl-12 pr-4 text-white placeholder-traverse-frost/30 bg-traverse-midnight/50 border rounded-xl border-traverse-frost/10 focus:outline-none ${authMode === "login" ? "focus:border-traverse-cyan" : "focus:border-traverse-aurora"}`} />
                </div>
                <button type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-main text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all mt-2">
                  {authMode === "login" ? "Sign In" : "Create Account"} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <p className="text-center text-sm text-traverse-frost/50 mt-6">
                {authMode === "login" ? "New here? " : "Already have an account? "}
                <button onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
                  className={`font-medium underline ${authMode === "login" ? "text-traverse-cyan" : "text-traverse-aurora"}`}>
                  {authMode === "login" ? "Create account" : "Sign in"}
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
