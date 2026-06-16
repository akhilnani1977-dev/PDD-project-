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

const FALLBACK_DESTINATIONS: Destination[] = [
  {
    id: "1",
    name: "Delhi",
    description: "The capital city where monumental heritage, modern dining, and vibrant bazaars blend seamlessly.",
    rating: 4.8,
    hero_image_url: "https://images.unsplash.com/photo-1557199055-bbc4e4a96f33?w=1200&q=80",
    states: { name: "Delhi" },
  },
  {
    id: "2",
    name: "Agra",
    description: "Home of the Taj Mahal and Mughal masterpieces, perfect for romantic and cultural travelers.",
    rating: 4.9,
    hero_image_url: "https://images.unsplash.com/photo-1523729199759-1a57d66db7c9?w=1200&q=80",
    states: { name: "Uttar Pradesh" },
  },
  {
    id: "3",
    name: "Jaipur",
    description: "The Pink City famous for its palaces, forts, and colorful markets in Rajasthan.",
    rating: 4.8,
    hero_image_url: "https://images.unsplash.com/photo-1492816041544-6c902f2a6a3e?w=1200&q=80",
    states: { name: "Rajasthan" },
  },
  {
    id: "4",
    name: "Udaipur",
    description: "A lakeside city of royal palaces, romantic boat rides, and sunset views over Lake Pichola.",
    rating: 4.9,
    hero_image_url: "https://images.unsplash.com/photo-1506976785307-8732e854ad59?w=1200&q=80",
    states: { name: "Rajasthan" },
  },
  {
    id: "5",
    name: "Goa",
    description: "Sun-kissed beaches, vibrant nightlife, and Portuguese heritage along India’s western coast.",
    rating: 4.7,
    hero_image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    states: { name: "Goa" },
  },
  {
    id: "6",
    name: "Kerala Backwaters",
    description: "Float through tranquil canals, lush palms, and scenic village life on a traditional houseboat.",
    rating: 4.9,
    hero_image_url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80",
    states: { name: "Kerala" },
  },
  {
    id: "7",
    name: "Andaman Islands",
    description: "Crystal-clear waters, coral reefs, and serene beaches ideal for diving and island escapes.",
    rating: 4.8,
    hero_image_url: "https://images.unsplash.com/photo-1512100356356-2b7d4bf7c6f1?w=1200&q=80",
    states: { name: "Andaman & Nicobar" },
  },
  {
    id: "8",
    name: "Leh",
    description: "High-altitude desert landscapes, ancient monasteries, and dramatic lakes in Ladakh.",
    rating: 4.9,
    hero_image_url: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1200&q=80",
    states: { name: "Ladakh" },
  },
  {
    id: "9",
    name: "Rishikesh",
    description: "The yoga capital on the Ganges, with white-water rafting, ashrams, and Himalayan views.",
    rating: 4.8,
    hero_image_url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
    states: { name: "Uttarakhand" },
  },
  {
    id: "10",
    name: "Shimla",
    description: "A charming hill station with colonial architecture, pine forests, and scenic mountain walks.",
    rating: 4.7,
    hero_image_url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80",
    states: { name: "Himachal Pradesh" },
  },
  {
    id: "11",
    name: "Munnar",
    description: "Tea-covered hills, misty valleys, and serene waterfalls in South India’s hill country.",
    rating: 4.9,
    hero_image_url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80",
    states: { name: "Kerala" },
  },
  {
    id: "12",
    name: "Hampi",
    description: "Ancient temple ruins and surreal boulder landscapes from the Vijayanagara Empire.",
    rating: 4.7,
    hero_image_url: "https://images.unsplash.com/photo-1520202112919-377b7b3a515b?w=1200&q=80",
    states: { name: "Karnataka" },
  },
  {
    id: "13",
    name: "Varanasi",
    description: "Spiritual ghats, temple rituals, and sunrise boat rides on the sacred Ganges.",
    rating: 4.8,
    hero_image_url: "https://images.unsplash.com/photo-1528256964615-74f99f49b3f0?w=1200&q=80",
    states: { name: "Uttar Pradesh" },
  },
  {
    id: "14",
    name: "Coorg",
    description: "Coffee plantations, lush valleys, and peaceful waterfalls in Karnataka’s hill country.",
    rating: 4.8,
    hero_image_url: "https://images.unsplash.com/photo-1495812311035-8d319f0d9b10?w=1200&q=80",
    states: { name: "Karnataka" },
  },
  {
    id: "15",
    name: "Khajuraho",
    description: "UNESCO temple complex famous for its intricately carved sculptures and history.",
    rating: 4.6,
    hero_image_url: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=1200&q=80",
    states: { name: "Madhya Pradesh" },
  },
  {
    id: "16",
    name: "Rann of Kutch",
    description: "A surreal white salt desert that transforms into a moonlit wonderland in winter.",
    rating: 4.7,
    hero_image_url: "https://images.unsplash.com/photo-1528640931797-64ff081972c3?w=1200&q=80",
    states: { name: "Gujarat" },
  },
  {
    id: "17",
    name: "Amritsar",
    description: "Home to the Golden Temple, Punjabi hospitality, and soul-stirring evening prayers.",
    rating: 4.8,
    hero_image_url: "https://images.unsplash.com/photo-1505672678657-cc7037095e6b?w=1200&q=80",
    states: { name: "Punjab" },
  },
  {
    id: "18",
    name: "Pondicherry",
    description: "French colonial charm, seaside promenades, and pastel streets on India’s east coast.",
    rating: 4.6,
    hero_image_url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80",
    states: { name: "Puducherry" },
  },
];

export default async function DestinationsPage() {
  const supabase = await createClient();

  const { data: dbDestinations } = await supabase
    .from('destinations')
    .select(`id, name, description, rating, hero_image_url, states ( name )`)
    .order('rating', { ascending: false });

  const destinations: Destination[] =
    dbDestinations && dbDestinations.length > 0
      ? (dbDestinations as Destination[])
      : FALLBACK_DESTINATIONS;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-8 max-w-7xl mx-auto relative">
      <div className="absolute top-20 left-0 w-full h-[50vh] bg-traverse-cyan/5 blur-[150px] -z-10 rounded-full pointer-events-none" />

      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-black mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          EXPLORE <span className="text-gradient">INDIA</span>
        </h1>
        <p className="text-xl text-traverse-frost/70 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          Discover the top Indian destinations backed by realistic imagery and authentic travel inspiration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest, index) => (
          <Link
            href={`/?prompt=${encodeURIComponent('Plan a trip to ' + dest.name)}`}
            key={dest.id}
            className="group cursor-pointer rounded-3xl overflow-hidden glass-panel flex flex-col h-112.5 relative animate-in fade-in zoom-in-95 duration-500 fill-mode-both"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100"
              style={{ backgroundImage: `url(${dest.hero_image_url || '/images/hero.png'})` }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-traverse-midnight via-traverse-midnight/80 to-transparent" />

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
