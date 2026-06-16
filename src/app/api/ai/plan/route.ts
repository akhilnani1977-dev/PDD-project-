import { NextResponse } from "next/server"

interface DayPlan {
  day: number
  title: string
  description: string
}

interface Itinerary {
  title: string
  destinations: string[]
  days: DayPlan[]
}

interface KnownPlace {
  name: string
  keywords: string[]
  itinerary: Itinerary
}

const KNOWN_PLACES: KnownPlace[] = [
  {
    name: "Rajasthan",
    keywords: ["rajasthan", "jaipur", "jodhpur", "udaipur", "pushkar"],
    itinerary: {
      title: "Royal Rajasthan Circuit",
      destinations: ["Jaipur", "Jodhpur", "Udaipur"],
      days: [
        { day: 1, title: "Arrive in Jaipur — The Pink City", description: "Check in, visit Hawa Mahal at dusk, and explore Johari Bazaar for gems and textiles." },
        { day: 2, title: "Amer Fort & City Palace", description: "Morning jeep ride up to Amer Fort, afternoon in City Palace and Jantar Mantar." },
        { day: 3, title: "Jaipur to Jodhpur — Blue City", description: "Scenic drive, visit Mehrangarh Fort and wander the cobalt blue alleyways of the old city." },
        { day: 4, title: "Jodhpur to Udaipur — Lake City", description: "Drive through the Aravalli hills, arrive at the shimmering shores of Lake Pichola." },
        { day: 5, title: "City Palace & Jagmandir Island", description: "Boat ride to Jagmandir island palace, sunset dinner at a rooftop overlooking Lake Pichola." },
      ],
    },
  },
  {
    name: "Kerala",
    keywords: ["kerala", "kochi", "munnar", "alleppey", "backwater", "cochin"],
    itinerary: {
      title: "Tropical Kerala Odyssey",
      destinations: ["Kochi", "Munnar", "Alleppey"],
      days: [
        { day: 1, title: "Historic Fort Kochi", description: "Explore the Dutch Palace, Chinese fishing nets, and the colorful Jewish Quarter." },
        { day: 2, title: "Munnar Tea Estates", description: "Drive through rolling tea gardens, visit Echo Point, and enjoy a sunset at Mattupetty Dam." },
        { day: 3, title: "Munnar to Alleppey Backwaters", description: "Travel through misty hills to board a luxury houseboat in Alleppey." },
        { day: 4, title: "Backwater Cruise", description: "Glide along serene canals, sample local cuisine, and watch village life float by." },
        { day: 5, title: "Alleppey Beach & Departure", description: "Relax on the coastline before heading to Kochi airport." },
      ],
    },
  },
  {
    name: "Goa",
    keywords: ["goa", "beach", "baga", "calangute", "palolem"],
    itinerary: {
      title: "Coastal Goa Escape",
      destinations: ["North Goa", "Panjim", "South Goa"],
      days: [
        { day: 1, title: "North Goa Beach Blitz", description: "Spend the day at Baga and Calangute enjoying water sports and seaside shacks." },
        { day: 2, title: "Old Goa Heritage", description: "Visit the Basilica of Bom Jesus, Se Cathedral, and the Latin Quarter of Fontainhas." },
        { day: 3, title: "Dudhsagar Waterfall Adventure", description: "Take a jeep safari through Bhagwan Mahavir Sanctuary to the cascading Dudhsagar Falls." },
        { day: 4, title: "South Goa Relaxation", description: "Unwind on Palolem and Agonda beaches with a sunset cruise." },
        { day: 5, title: "Spice Plantation & Departure", description: "Tour a spice estate before catching your flight home." },
      ],
    },
  },
  {
    name: "Kashmir",
    keywords: ["kashmir", "srinagar", "gulmarg", "pahalgam", "dal lake"],
    itinerary: {
      title: "Himalayan Kashmir Expedition",
      destinations: ["Srinagar", "Gulmarg", "Pahalgam"],
      days: [
        { day: 1, title: "Arrival in Srinagar", description: "Take a shikara ride on Dal Lake and explore the Mughal gardens." },
        { day: 2, title: "Gulmarg Meadows", description: "Ride the cable car to Apharwat Peak and wander alpine meadows." },
        { day: 3, title: "Pahalgam Valley", description: "Drive to Betaab Valley and Aru Valley, followed by riverside strolls." },
        { day: 4, title: "Local Culture & Markets", description: "Visit handicraft emporiums, try Wazwan cuisine, and shop for pashmina shawls." },
        { day: 5, title: "Srinagar Farewell", description: "Relax with a lakeside breakfast before departure." },
      ],
    },
  },
  {
    name: "Ladakh",
    keywords: ["ladakh", "leh", "pangong", "nubra", "khardung"],
    itinerary: {
      title: "Ladakh High Altitude Adventure",
      destinations: ["Leh", "Pangong Lake", "Nubra Valley"],
      days: [
        { day: 1, title: "Acclimatize in Leh", description: "Take it easy with a visit to Shanti Stupa and the Leh market." },
        { day: 2, title: "Monasteries & Culture", description: "Visit Hemis, Thiksey, and Shey gompas." },
        { day: 3, title: "Khardung La & Nubra Valley", description: "Cross the legendary pass and ride Bactrian camels in the sand dunes." },
        { day: 4, title: "Pangong Lake", description: "Watch the lake shift colors and camp under Himalayan stars." },
        { day: 5, title: "Return to Leh & Departure", description: "Drive back through Chang La and prepare for your flight." },
      ],
    },
  },
  {
    name: "Delhi",
    keywords: ["delhi", "new delhi", "india gate", "red fort"],
    itinerary: {
      title: "Classic Delhi Heritage Tour",
      destinations: ["Old Delhi", "New Delhi", "Mehrauli"],
      days: [
        { day: 1, title: "Historic Old Delhi", description: "Visit Red Fort, Jama Masjid, and eat street food at Chandni Chowk." },
        { day: 2, title: "Monuments of New Delhi", description: "See India Gate, Humayun's Tomb, and the Qutub Minar." },
        { day: 3, title: "Market Culture", description: "Shop in Connaught Place and Khan Market, and explore galleries." },
        { day: 4, title: "Spiritual & Museum Day", description: "Visit Lotus Temple, Akshardham, and the National Museum." },
        { day: 5, title: "Cuisine & Departure", description: "Enjoy a final culinary tour before heading to the airport." },
      ],
    },
  },
  {
    name: "Varanasi",
    keywords: ["varanasi", "banaras", "benares", "ganga aarti"],
    itinerary: {
      title: "Sacred Varanasi Experience",
      destinations: ["Assi Ghat", "Dashashwamedh Ghat", "Sarnath"],
      days: [
        { day: 1, title: "Evening Ganga Aarti", description: "Witness the moving ceremony at Dashashwamedh Ghat." },
        { day: 2, title: "Boat Ride & Ghats", description: "Take a sunrise boat ride and stroll through the old city." },
        { day: 3, title: "Sarnath Excursion", description: "Visit the Buddhist ruins and the Deer Park." },
        { day: 4, title: "Local Silk & Cuisine", description: "Watch silk weaving and sample Banarasi sweets." },
        { day: 5, title: "Spiritual Farewell", description: "Reflect by the river before departure." },
      ],
    },
  },
  {
    name: "Sikkim",
    keywords: ["sikkim", "gangtok", "darjeeling", "north east"],
    itinerary: {
      title: "Sikkim & Darjeeling Hill Retreat",
      destinations: ["Gangtok", "Darjeeling", "Lachung"],
      days: [
        { day: 1, title: "Gangtok Arrival", description: "Visit MG Marg and the Rumtek Monastery." },
        { day: 2, title: "Tsomgo Lake", description: "Ride to the turquoise high-altitude lake and enjoy yak rides." },
        { day: 3, title: "Darjeeling by Toy Train", description: "Take the scenic train and explore tea gardens." },
        { day: 4, title: "Tiger Hill Sunrise", description: "Wake early for views of Kanchenjunga and visit Himalayan Mountaineering Institute." },
        { day: 5, title: "Heritage & Departure", description: "See the Batasia Loop before heading home." },
      ],
    },
  },
  {
    name: "Mumbai",
    keywords: ["mumbai", "bombay", "gateway of india", "colaba"],
    itinerary: {
      title: "Mumbai City & Coastal Vibes",
      destinations: ["Colaba", "Juhu", "Bandra"],
      days: [
        { day: 1, title: "Heritage Walk", description: "Visit Gateway of India, the Taj Palace, and Kala Ghoda." },
        { day: 2, title: "Bollywood & Boulevard", description: "Explore Bandra's street art and walk Marine Drive." },
        { day: 3, title: "Elephanta Island", description: "Take a ferry to ancient cave temples." },
        { day: 4, title: "Street Food Tour", description: "Taste vada pav, pav bhaji, and kebabs across the city." },
        { day: 5, title: "Market Shopping", description: "Shop at Colaba Causeway and Crawford Market before departure." },
      ],
    },
  },
]

function extractDestination(prompt: string): string {
  const lower = prompt.toLowerCase()
  const known = KNOWN_PLACES.find((place) =>
    place.keywords.some((keyword) => lower.includes(keyword))
  )

  if (known) {
    return known.name
  }

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
    .trim()

  const cleanStr = stripped.replace(/[^\w\s]/gi, '').split(' ').filter((word) => word.length > 2)

  if (cleanStr.length > 0) {
    const dest = cleanStr[cleanStr.length - 1]
    return dest.charAt(0).toUpperCase() + dest.slice(1)
  }

  return "India"
}

function generateDynamicItinerary(destination: string) {
  return {
    title: `Discover ${destination}`,
    destinations: [destination, `Greater ${destination} Area`],
    days: [
      { day: 1, title: `Arrival in ${destination}`, description: `Check into your accommodation and enjoy a relaxed evening discovering local flavors.` },
      { day: 2, title: `${destination} Highlights`, description: `Tour the city's most iconic landmarks, cultural sites, and historic neighborhoods.` },
      { day: 3, title: `Local Living`, description: `Experience markets, artisan districts, and hidden local favorites.` },
      { day: 4, title: `Nearby Escape`, description: `Take a scenic day trip outside ${destination} to a hill station, temple town, or waterfront village.` },
      { day: 5, title: `Farewell ${destination}`, description: `Finish with a relaxed breakfast, last-minute shopping, and departure.` },
    ],
  }
}

function getBudget(prompt: string) {
  const lower = prompt.toLowerCase()
  const budgetMatch = lower.match(/₹?\s*(\d[\d,]*)\s*(?:k|thousand)?/)

  if (budgetMatch) {
    return "₹" + parseInt(budgetMatch[1].replace(/,/g, "")).toLocaleString("en-IN")
  }

  if (lower.includes("luxury") || lower.includes("premium")) {
    return "₹" + (75000 + Math.floor(Math.random() * 50000)).toLocaleString("en-IN")
  }

  if (lower.includes("budget") || lower.includes("cheap")) {
    return "₹" + (12000 + Math.floor(Math.random() * 8000)).toLocaleString("en-IN")
  }

  return "₹" + (25000 + Math.floor(Math.random() * 30000)).toLocaleString("en-IN")
}

function getItinerary(prompt: string) {
  const lower = prompt.toLowerCase()
  const known = KNOWN_PLACES.find((place) =>
    place.keywords.some((keyword) => lower.includes(keyword))
  )

  if (known) {
    return known.itinerary
  }

  return generateDynamicItinerary(extractDestination(prompt))
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const prompt = body?.prompt

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const trimmedPrompt = prompt.trim()
    if (!trimmedPrompt) {
      return NextResponse.json({ error: "Prompt cannot be empty" }, { status: 400 })
    }

    if (trimmedPrompt.length < 3) {
      return NextResponse.json({ error: "Prompt must be at least 3 characters" }, { status: 400 })
    }

    if (trimmedPrompt.length > 500) {
      return NextResponse.json({ error: "Prompt must be less than 500 characters" }, { status: 400 })
    }

    const itinerary = getItinerary(trimmedPrompt)
    const budget = getBudget(trimmedPrompt)

    await new Promise((resolve) => setTimeout(resolve, 1200))

    return NextResponse.json({
      title: itinerary.title,
      budget,
      destinations: itinerary.destinations,
      days: itinerary.days,
    })
  } catch (error) {
    console.error("AI Planning Error:", error)
    return NextResponse.json({ error: "Failed to generate itinerary. Please try again." }, { status: 500 })
  }
}
