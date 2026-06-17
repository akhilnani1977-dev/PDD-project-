import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

interface DayPlan {
  day: number;
  title: string;
  description: string;
  expenses: string;
  timing: string;
}

interface SmartData {
  title: string;
  budget: string;
  destinations: string[];
  days: DayPlan[];
  hotels: Array<{ name: string; rating: number; price: string }>;
  transport: Array<{ mode: string; cost: string }>;
  restaurants: Array<{ name: string; type: string }>;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { wizardData } = body;
    
    if (!wizardData) {
      return NextResponse.json({ error: "Missing wizard data" }, { status: 400 });
    }

    const { city, state, days, budget, travelers, tripType } = wizardData;

    // 1. Query real destination from Supabase
    let destinationId: number | null = null;
    let realCityName = city;
    
    const { data: destData } = await supabase
      .from("destinations")
      .select("id, name")
      .ilike("name", city)
      .limit(1);

    if (destData && destData.length > 0) {
      destinationId = destData[0].id;
      realCityName = destData[0].name;
    } else {
      // Fallback: search state to match any destination
      const { data: stateData } = await supabase
        .from("states")
        .select("id")
        .ilike("name", state)
        .limit(1);

      if (stateData && stateData.length > 0) {
        const { data: fallbackDest } = await supabase
          .from("destinations")
          .select("id, name")
          .eq("state_id", stateData[0].id)
          .limit(1);
        
        if (fallbackDest && fallbackDest.length > 0) {
          destinationId = fallbackDest[0].id;
          realCityName = fallbackDest[0].name;
        }
      }
    }

    // Dynamic price multiplier based on budget category
    const multiplier = budget === 'luxury' ? 4 : budget === 'premium' ? 2.5 : budget === 'standard' ? 1.5 : 1;
    const baseHotelPrice = 2000 * multiplier;

    // 2. Fetch Hotels
    let finalHotels: Array<{ name: string; rating: number; price: string }> = [];
    if (destinationId) {
      const { data: dbHotels } = await supabase
        .from("hotels")
        .select("name, rating, price_per_night_min, price_per_night_max, type")
        .eq("destination_id", destinationId)
        .limit(3);
      
      if (dbHotels && dbHotels.length > 0) {
        finalHotels = dbHotels.map(h => ({
          name: h.name,
          rating: Number(h.rating) || 4.2,
          price: `₹${Math.round(h.price_per_night_min).toLocaleString()}`
        }));
      }
    }
    
    // Fallback if no hotels found in DB
    if (finalHotels.length === 0) {
      finalHotels = [
        { name: `The ${realCityName} Grand Resort`, rating: 4.8, price: `₹${(baseHotelPrice * 1.5).toLocaleString()}` },
        { name: `${realCityName} Heritage Boutique`, rating: 4.5, price: `₹${baseHotelPrice.toLocaleString()}` },
        { name: `Central ${realCityName} Stay`, rating: 4.2, price: `₹${(baseHotelPrice * 0.7).toLocaleString()}` },
      ];
    }

    // 3. Fetch Restaurants
    let finalRestaurants: Array<{ name: string; type: string }> = [];
    if (destinationId) {
      const { data: dbRestaurants } = await supabase
        .from("restaurants")
        .select("name, cuisine_type, specialty")
        .eq("destination_id", destinationId)
        .limit(3);

      if (dbRestaurants && dbRestaurants.length > 0) {
        finalRestaurants = dbRestaurants.map(r => ({
          name: r.name,
          type: r.specialty ? `${r.cuisine_type} (${r.specialty})` : r.cuisine_type
        }));
      }
    }

    if (finalRestaurants.length === 0) {
      finalRestaurants = [
        { name: `Spice of ${state}`, type: "Authentic Local Cuisine" },
        { name: `The ${realCityName} Viewpoint`, type: "Fine Dining" },
        { name: "Backpacker's Cafe", type: "Casual Eats" },
      ];
    }

    // 4. Fetch Transport
    let finalTransport: Array<{ mode: string; cost: string }> = [];
    if (destinationId) {
      const { data: dbTransport } = await supabase
        .from("transportation")
        .select("mode, estimated_cost_min, estimated_cost_max, notes")
        .eq("destination_id", destinationId)
        .limit(2);

      if (dbTransport && dbTransport.length > 0) {
        finalTransport = dbTransport.map(t => ({
          mode: `${t.mode.charAt(0).toUpperCase() + t.mode.slice(1)} (${t.notes || "Local"})`,
          cost: `₹${Math.round(t.estimated_cost_min).toLocaleString()}`
        }));
      }
    }

    if (finalTransport.length === 0) {
      finalTransport = [
        { mode: "Flight / Airport Taxi", cost: `₹${(5000 * multiplier).toLocaleString()}` },
        { mode: "Local Cab (Daily)", cost: `₹${(1500 * multiplier).toLocaleString()}` },
      ];
    }

    // 5. Fetch Attractions for itinerary planning
    let dbAttractionsList: Array<{ name: string; description: string; duration_hours: number }> = [];
    if (destinationId) {
      const { data: dbAttractions } = await supabase
        .from("attractions")
        .select("name, description, duration_hours")
        .eq("destination_id", destinationId)
        .limit(6);
      
      if (dbAttractions) {
        dbAttractionsList = dbAttractions;
      }
    }

    // 6. Build Daily Schedule
    const finalDays: DayPlan[] = Array.from({ length: days }).map((_, i) => {
      const dayNum = i + 1;
      let title = `Exploring the heart of ${realCityName}`;
      let description = `A full day visiting the iconic landmarks of ${realCityName}. Enjoy guided tours and capture the essence of ${state}.`;
      
      if (i === 0) {
        title = `Arrival & Welcome to ${realCityName}`;
        description = `Arrive in ${realCityName}, check into your selected hotel, and spend the evening enjoying the local atmosphere.`;
        if (dbAttractionsList.length > 0) {
          description += ` If time permits, take a quick stroll to ${dbAttractionsList[0].name}.`;
        }
      } else if (i === days - 1) {
        title = `Farewell ${realCityName}`;
        description = `Final souvenir shopping in ${realCityName}'s famous markets before heading to your departure point.`;
      } else {
        // Distribute attractions dynamically among intermediate days
        const attractionIndex = (i - 1) % Math.max(1, dbAttractionsList.length);
        const attraction = dbAttractionsList[attractionIndex];
        if (attraction) {
          title = `Visit ${attraction.name}`;
          description = `Spend the day exploring ${attraction.name}. ${attraction.description} Plan for approximately ${attraction.duration_hours || 2} hours.`;
        }
      }

      return {
        day: dayNum,
        title,
        description,
        timing: i === 0 ? "Afternoon onwards" : "9:00 AM - 6:00 PM",
        expenses: `₹${(1500 * multiplier * travelers).toLocaleString()}`
      };
    });

    const itinerary: SmartData = {
      title: `${tripType} Escape to ${realCityName}`,
      budget: budget.toUpperCase(),
      destinations: [realCityName, state],
      hotels: finalHotels,
      transport: finalTransport,
      restaurants: finalRestaurants,
      days: finalDays
    };

    return NextResponse.json({ itinerary });
  } catch (error) {
    console.error("AI Planner Database Error:", error);
    return NextResponse.json(
      { error: "Failed to generate intelligent itinerary" },
      { status: 500 }
    );
  }
}
