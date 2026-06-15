import { NextResponse } from "next/server";

// Dynamic AI Trip Generator - Standalone, no external API keys needed

interface DayPlan {
  day: number;
  title: string;
  description: string;
}

interface Itinerary {
  title: string;
  destinations: string[];
  days: DayPlan[];
}

const PRE_BUILT_ITINERARIES: Record<string, Itinerary> = {
  rajasthan: {
    title: "Royal Rajasthan Circuit",
    destinations: ["Jaipur", "Jodhpur", "Udaipur"],
    days: [
      { day: 1, title: "Arrive in Jaipur — The Pink City", description: "Check in, visit Hawa Mahal at dusk, and explore Johari Bazaar for gems and textiles." },
      { day: 2, title: "Amer Fort & City Palace", description: "Morning jeep ride up to Amer Fort, afternoon in City Palace and Jantar Mantar." },
      { day: 3, title: "Jaipur to Jodhpur — Blue City", description: "Scenic drive, visit Mehrangarh Fort and wander the cobalt blue alleyways of the old city." },
      { day: 4, title: "Jodhpur to Udaipur — Lake City", description: "Drive through the Aravalli hills, arrive at the shimmering shores of Lake Pichola." },
      { day: 5, title: "City Palace & Jagmandir Island", description: "Boat ride to Jagmandir island palace, sunset dinner at a rooftop overlooking Lake Pichola." },
    ]
  },
  kerala: {
    title: "Tropical Kerala Odyssey",
    destinations: ["Kochi", "Munnar", "Alleppey"],
    days: [
      { day: 1, title: "Historic Fort Kochi", description: "Explore the Dutch Palace, Chinese fishing nets, and Jewish Quarter in Mattancherry." },
      { day: 2, title: "Munnar Tea Estates", description: "Morning drive through rolling tea gardens, visit the Tea Museum and trek to Eravikulam." },
      { day: 3, title: "Munnar to Alleppey Backwaters", description: "Drive through misty hills to the Venice of the East — board your luxury houseboat." },
      { day: 4, title: "Backwater Cruise", description: "Lazy morning gliding through palm-lined canals, cooking fresh fish curry onboard." },
      { day: 5, title: "Alleppey Beach & Departure", description: "Sunrise beach walk, visit Krishnapuram Palace, and depart from Kochi airport." },
    ]
  },
  goa: {
    title: "Coastal Goa Escape",
    destinations: ["North Goa", "Panjim", "South Goa"],
    days: [
      { day: 1, title: "North Goa Beach Blitz", description: "Hit Baga and Calangute beaches, water sports, and seafood shacks by the shore." },
      { day: 2, title: "Old Goa & Portuguese Heritage", description: "Visit the UNESCO Basilica of Bom Jesus and Se Cathedral, then Fontainhas Latin Quarter." },
      { day: 3, title: "Dudhsagar Waterfall Trek", description: "Full-day jeep safari through Bhagwan Mahavir Wildlife Sanctuary to the 4-tiered waterfall." },
      { day: 4, title: "Relaxed South Goa", description: "Palolem and Colva beaches — peaceful, dramatic cliffs and pristine sands." },
      { day: 5, title: "Spice Plantation & Departure", description: "Morning spice plantation tour with traditional lunch before heading to the airport." },
    ]
  },
  kashmir: {
    title: "Himalayan Kashmir Expedition",
    destinations: ["Srinagar", "Gulmarg", "Pahalgam"],
    days: [
      { day: 1, title: "Arrival in Srinagar", description: "Shikara ride on Dal Lake at sunset, stay on a traditional wooden houseboat." },
      { day: 2, title: "Mughal Gardens", description: "Visit Shalimar Bagh, Nishat Bagh, and Chashme Shahi — terraced gardens with mountain views." },
      { day: 3, title: "Gulmarg — Meadow of Flowers", description: "Cable car to Apharwat Peak at 13,400 ft, skiing or trekking in pristine alpine meadows." },
      { day: 4, title: "Pahalgam — Valley of Shepherds", description: "Drive to Betaab Valley and Aru Valley, horse rides beside rushing mountain streams." },
      { day: 5, title: "Srinagar Market & Departure", description: "Shop for pashmina shawls and walnut woodwork at Lal Chowk before flying home." },
    ]
  },
  ladakh: {
    title: "Ladakh High Altitude Adventure",
    destinations: ["Leh", "Pangong Lake", "Nubra Valley"],
    days: [
      { day: 1, title: "Arrive Leh — Acclimatize", description: "Rest day with gentle walk through Leh market, visit Shanti Stupa at sunset." },
      { day: 2, title: "Monasteries of Leh", description: "Thiksey, Hemis, and Namgyal Tsemo Gompa — ancient Buddhist art and panoramic views." },
      { day: 3, title: "Khardung La & Nubra Valley", description: "Cross one of the world's highest motorable passes, ride Bactrian camels in Hunder Desert." },
      { day: 4, title: "Pangong Tso Lake", description: "The iconic blue lake that shifts color from turquoise to sapphire to gold — an overnight camp." },
      { day: 5, title: "Return to Leh & Departure", description: "Morning drive back through the Chang La pass, catch flight from Kushok Bakula Rimpochhe Airport." },
    ]
  }
};

// Helper to extract a probable destination from the prompt
function extractDestination(prompt: string): string {
  const lower = prompt.toLowerCase();
  // Strip common words to find the city
  const stripped = lower
    .replace(/plan a trip to/g, "")
    .replace(/days in/g, "")
    .replace(/itinerary for/g, "")
    .replace(/romantic/g, "")
    .replace(/family/g, "")
    .replace(/budget/g, "")
    .replace(/luxury/g, "")
    .replace(/trip/g, "")
    .replace(/tour/g, "")
    .replace(/under ₹\d+/g, "")
    .replace(/[0-9]+/g, "")
    .trim();
  
  // Clean up punctuation
  const cleanStr = stripped.replace(/[^\w\s]/gi, '').split(' ').filter(word => word.length > 2);
  
  if (cleanStr.length > 0) {
    // Return the last capitalized word as the destination (e.g. Chennai)
    const dest = cleanStr[cleanStr.length - 1];
    return dest.charAt(0).toUpperCase() + dest.slice(1);
  }
  return "India";
}

function generateDynamicItinerary(destination: string) {
  return {
    title: `Discover ${destination}`,
    destinations: [destination, `Greater ${destination} Area`],
    days: [
      { day: 1, title: `Arrival in ${destination}`, description: `Arrive and check into your accommodation. Spend the evening exploring the local markets and enjoying authentic regional cuisine.` },
      { day: 2, title: `Cultural & Historic Tour of ${destination}`, description: `A full day guided tour covering the most iconic historical landmarks, monuments, and cultural hotspots of the city.` },
      { day: 3, title: `Nature & Scenic Escapes`, description: `Step away from the city bustle to explore nearby natural attractions, scenic viewpoints, or coastal areas around ${destination}.` },
      { day: 4, title: `Local Experiences & Shopping`, description: `Dive deep into the local culture. Visit artisan workshops, try a traditional cooking class, and shop for unique souvenirs.` },
      { day: 5, title: `Farewell ${destination}`, description: `Enjoy a relaxed morning with a traditional breakfast before heading to the airport/station for your departure.` },
    ]
  };
}

function getBudget(prompt: string): string {
  const lower = prompt.toLowerCase();
  const budgetMatch = lower.match(/₹?\s*(\d[\d,]*)\s*(?:k|thousand)?/);
  if (budgetMatch) return "₹" + parseInt(budgetMatch[1].replace(/,/g, "")).toLocaleString("en-IN");
  if (lower.includes("luxury") || lower.includes("premium")) return "₹" + (75000 + Math.floor(Math.random() * 50000)).toLocaleString("en-IN");
  if (lower.includes("budget") || lower.includes("cheap")) return "₹" + (12000 + Math.floor(Math.random() * 8000)).toLocaleString("en-IN");
  return "₹" + (25000 + Math.floor(Math.random() * 30000)).toLocaleString("en-IN");
}

function getItinerary(prompt: string) {
  const lower = prompt.toLowerCase();
  
  // Check pre-built highly detailed itineraries first
  if (lower.includes("rajasthan") || lower.includes("jaipur") || lower.includes("jodhpur") || lower.includes("udaipur")) return PRE_BUILT_ITINERARIES.rajasthan;
  if (lower.includes("kerala") || lower.includes("kochi") || lower.includes("munnar") || lower.includes("backwater")) return PRE_BUILT_ITINERARIES.kerala;
  if (lower.includes("goa") || lower.includes("beach") || lower.includes("coastal")) return PRE_BUILT_ITINERARIES.goa;
  if (lower.includes("kashmir") || lower.includes("srinagar") || lower.includes("gulmarg")) return PRE_BUILT_ITINERARIES.kashmir;
  if (lower.includes("ladakh") || lower.includes("leh") || lower.includes("pangong")) return PRE_BUILT_ITINERARIES.ladakh;
  
  // If no pre-built matches, generate a dynamic one based on the requested location
  const destination = extractDestination(prompt);
  return generateDynamicItinerary(destination);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body?.prompt;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const itinerary = getItinerary(prompt);
    const budget = getBudget(prompt);

    // Simulate thinking delay to feel like real AI
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({
      title: itinerary.title,
      budget,
      destinations: itinerary.destinations,
      days: itinerary.days,
    });

  } catch (error) {
    console.error("AI Planning Error:", error);
    return NextResponse.json({ error: "Failed to generate itinerary. Please try again." }, { status: 500 });
  }
}
