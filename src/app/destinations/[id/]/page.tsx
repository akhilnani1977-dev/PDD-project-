import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { MapPin, Star, Calendar, Clock, Wallet, Info, Camera, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: destination, error } = await supabase
    .from('destinations')
    .select(`
      *,
      states ( name )
    `)
    .eq('id', id)
    .single();

  if (error || !destination) {
    // Check if it's one of our fallback IDs from destinations/page.tsx
    // For a real production app, we'd handle this more robustly
    return notFound();
  }

  return (
    <div className="min-h-screen bg-traverse-midnight relative overflow-hidden">
      {/* Hero Header */}
      <div className="relative h-[60vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.hero_image_url || '/images/hero.png'})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-traverse-midnight via-traverse-midnight/40 to-transparent" />
        </div>

        <div className="absolute top-32 left-4 sm:left-8 z-10">
          <Link href="/destinations" className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-white hover:bg-white/10 transition-all mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Explore
          </Link>

          <div className="flex items-center gap-2 text-traverse-cyan font-bold mb-2 tracking-wider uppercase">
            <MapPin className="w-4 h-4" /> {destination.states?.name || 'India'}
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">{destination.name}</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 text-traverse-aurora bg-traverse-aurora/10 px-3 py-1 rounded-full border border-traverse-aurora/20">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold">{destination.rating} Rating</span>
            </div>
            <div className="flex items-center gap-1 text-traverse-cyan bg-traverse-cyan/10 px-3 py-1 rounded-full border border-traverse-cyan/20">
              <Wallet className="w-4 h-4" />
              <span className="font-bold">₹{destination.budget_estimate_per_day}/day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-traverse-cyan" /> Overview
            </h2>
            <p className="text-lg text-traverse-frost/70 leading-relaxed">
              {destination.description}
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-3xl border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-traverse-cyan/10 text-traverse-cyan">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white">Best Time to Visit</h3>
              </div>
              <p className="text-traverse-frost/60">{destination.best_time_to_visit || 'Year-round'}</p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-traverse-aurora/10 text-traverse-aurora">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white">Recommended Duration</h3>
              </div>
              <p className="text-traverse-frost/60">3-5 Days Recommended</p>
            </div>
          </section>

          {/* This would be a dynamic component for attractions if we had data */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Camera className="w-6 h-6 text-traverse-cyan" /> Must-See Attractions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass-panel p-4 rounded-2xl flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-xl bg-traverse-ocean flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-traverse-cyan/20 to-traverse-aurora/20 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-traverse-frost/20" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Iconic Spot {i}</h4>
                    <p className="text-xs text-traverse-frost/40">Heritage & Sightseeing</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-8 rounded-3xl border border-traverse-cyan/20 sticky top-32">
            <h3 className="text-xl font-bold text-white mb-6">Ready to visit?</h3>
            <p className="text-traverse-frost/60 text-sm mb-8">
              Let our AI build a perfect itinerary for your trip to {destination.name}.
            </p>

            <Link
              href={`/ai-planner?prompt=${encodeURIComponent('Plan a trip to ' + destination.name)}`}
              className="w-full py-4 rounded-2xl bg-gradient-main text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] mb-4"
            >
              Generate AI Itinerary
            </Link>

            <button className="w-full py-4 rounded-2xl border border-traverse-frost/10 text-white font-bold hover:bg-white/5 transition-all">
              Save to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
