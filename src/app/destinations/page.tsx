import { createClient } from '@/utils/supabase/server';
import { MapPin, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Destination {
  id: string;
  name: string;
  description: string;
  rating: number;
  hero_image_url: string;
  states: { name: string } | { name: string }[] | null;
}

// Fallback data when DB is not seeded
const FALLBACK_DESTINATIONS: Destination[] = [
  { id: "1", name: "Ladakh", description: "The land of high passes, stunning lakes, and ancient monasteries perched in the clouds.", rating: 4.9, hero_image_url: "https://images.unsplash.com/photo-1626014303706-0b190f898394?w=800&q=80", states: { name: "Jammu & Kashmir" } },
  { id: "2", name: "Kerala Backwaters", description: "God's Own Country — tranquil houseboat cruises through lush palm-lined canals.", rating: 4.9, hero_image_url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80", states: { name: "Kerala" } },
  { id: "3", name: "Jaipur", description: "The Pink City — majestic forts, royal palaces, and vibrant bazaars of Rajasthan.", rating: 4.7, hero_image_url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80", states: { name: "Rajasthan" } },
  { id: "4", name: "Andaman Islands", description: "Pristine white-sand beaches, crystal waters, and world-class scuba diving paradise.", rating: 4.8, hero_image_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80", states: { name: "Andaman & Nicobar" } },
  { id: "5", name: "Hampi", description: "Ancient ruins of a medieval Hindu empire among surreal boulder-strewn landscapes.", rating: 4.7, hero_image_url: "https://images.unsplash.com/photo-1590123715937-4d5b3e794b11?w=800&q=80", states: { name: "Karnataka" } },
  { id: "6", name: "Valley of Flowers", description: "A UNESCO World Heritage Site blanketed in vibrant alpine wildflowers every monsoon.", rating: 4.8, hero_image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", states: { name: "Uttarakhand" } },
  { id: "7", name: "Varanasi", description: "One of the world's oldest living cities — spiritual ghats, ancient temples, Ganga aarti.", rating: 4.8, hero_image_url: "https://images.unsplash.com/photo-1561361058-c24e0d9e4b35?w=800&q=80", states: { name: "Uttar Pradesh" } },
  { id: "8", name: "Coorg", description: "The Scotland of India — misty hills, coffee plantations, and cascading waterfalls.", rating: 4.7, hero_image_url: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=80", states: { name: "Karnataka" } },
  { id: "9", name: "Rann of Kutch", description: "The world's largest salt desert transforms into a shimmering white expanse under moonlight.", rating: 4.6, hero_image_url: "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=800&q=80", states: { name: "Gujarat" } },
];

export default async function DestinationsPage() {
  const supabase = await createClient();

  // Try to fetch from DB; gracefully fall back to static data
  const { data: dbDestinations } = await supabase
    .from('destinations')
    .select(`id, name, description, rating, hero_image_url, states ( name )`)
    .order('rating', { ascending: false });

  const destinations: Destination[] = (dbDestinations && dbDestinations.length > 0)
    ? dbDestinations as Destination[]
    : FALLBACK_DESTINATIONS;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-8 max-w-7xl mx-auto relative">
      <div className="absolute top-20 left-0 w-full h-[50vh] bg-traverse-cyan/5 blur-[150px] -z-10 rounded-full pointer-events-none" />

      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-black mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          EXPLORE <span className="text-gradient">INDIA</span>
        </h1>
        <p className="text-xl text-traverse-frost/70 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          Discover incredible destinations across the subcontinent. From the snow-capped Himalayas to the tropical beaches of the south.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest, index) => (
          <Link
            href={`/?prompt=${encodeURIComponent('Plan a trip to ' + dest.name)}`}
            key={dest.id}
            className="group cursor-pointer rounded-3xl overflow-hidden glass-panel flex flex-col h-[450px] relative animate-in fade-in zoom-in-95 duration-500 fill-mode-both"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100"
              style={{ backgroundImage: `url(${dest.hero_image_url || '/images/hero.png'})` }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-traverse-midnight via-traverse-midnight/80 to-transparent" />

            <div className="relative z-10 flex flex-col justify-end h-full p-8">
              <div className="flex items-center gap-2 mb-2 text-traverse-cyan font-semibold">
                <MapPin className="w-4 h-4" />
                {Array.isArray(dest.states) ? dest.states[0]?.name : dest.states?.name || 'India'}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{dest.name}</h3>
              <p className="text-traverse-frost/80 mb-4 line-clamp-2">{dest.description}</p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <div className="flex items-center gap-1 text-traverse-aurora">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold">{dest.rating}</span>
                </div>
                <div className="flex items-center text-sm font-medium text-white group-hover:text-traverse-cyan transition-colors">
                  View Details <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
