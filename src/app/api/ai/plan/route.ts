import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

// Helper to generate dynamic destination details
function generateItineraryData(params: {
  destinationInput: string;
  travelersInput?: string;
  budgetCategoryInput?: string;
  customBudgetInput?: number;
  durationInput?: number;
  datesInput?: string;
  interestsInput?: string[];
  transportInput?: string;
  hotelPrefInput?: string;
  foodPrefInput?: string;
}) {
  const destName = params.destinationInput || "Jaipur";
  const duration = params.durationInput || 3;
  const travelers = params.travelersInput || "2 People";
  
  let travelersMultiplier = 1;
  if (travelers.includes("Solo")) travelersMultiplier = 1;
  else if (travelers.includes("2")) travelersMultiplier = 2;
  else if (travelers.includes("Family")) travelersMultiplier = 4;
  else if (travelers.includes("Group")) travelersMultiplier = 7;

  const budgetCat = params.budgetCategoryInput || "Standard";
  let baseBudgetPerDay = 4000;
  if (budgetCat.includes("Budget") || budgetCat.includes("5,000")) baseBudgetPerDay = 2500;
  else if (budgetCat.includes("Standard") || budgetCat.includes("10,000")) baseBudgetPerDay = 5500;
  else if (budgetCat.includes("Premium") || budgetCat.includes("25,000")) baseBudgetPerDay = 10000;
  else if (budgetCat.includes("Luxury") || budgetCat.includes("50,000")) baseBudgetPerDay = 22000;

  if (params.customBudgetInput && params.customBudgetInput > 0) {
    baseBudgetPerDay = Math.round(params.customBudgetInput / duration / travelersMultiplier);
  }

  const totalCost = baseBudgetPerDay * duration * travelersMultiplier;
  const transportCost = Math.round(totalCost * 0.22);
  const hotelCost = Math.round(totalCost * 0.40);
  const foodCost = Math.round(totalCost * 0.20);
  const entryCost = Math.round(totalCost * 0.08);
  const shoppingCost = Math.round(totalCost * 0.05);
  const emergencyCost = Math.round(totalCost * 0.05);

  const imagesMap: Record<string, string[]> = {
    jaipur: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"
    ],
    goa: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
    ],
    kerala: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80"
    ],
    ladakh: [
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"
    ],
    varanasi: [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80"
    ],
    udaipur: [
      "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80"
    ],
    hampi: [
      "https://images.unsplash.com/photo-1600100397608-f010e423b963?auto=format&fit=crop&w=800&q=80"
    ]
  };

  const normalizedKey = destName.toLowerCase().replace(/[^a-z]/g, "");
  const fallbackImages = imagesMap[normalizedKey] || [
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
  ];

  // Base prices for hotels per night (ensure SORTED LOWEST TO HIGHEST by default!)
  const baseHotelPrice = Math.round(hotelCost / duration / travelersMultiplier);
  
  const rawHotels = [
    {
      id: "h1",
      name: `Zostel & Backpacker Hub ${destName}`,
      image: fallbackImages[0],
      distance: "0.8 km from city center",
      pricePerNight: Math.max(950, Math.round(baseHotelPrice * 0.45)),
      rating: 4.6,
      reviewsCount: 840,
      valueCategory: "budget" as const,
      familyFriendly: false,
      freeBreakfast: true,
      freeWifi: true,
      parking: false,
      swimmingPool: false,
      address: `12 Heritage Lane, Near Old Market, ${destName}`,
      phone: "+91 98765 43210"
    },
    {
      id: "h2",
      name: `${destName} Heritage Residency & Suites`,
      image: fallbackImages[1] || fallbackImages[0],
      distance: "1.4 km from main square",
      pricePerNight: Math.round(baseHotelPrice * 0.85),
      rating: 4.5,
      reviewsCount: 420,
      valueCategory: "standard" as const,
      familyFriendly: true,
      freeBreakfast: true,
      freeWifi: true,
      parking: true,
      swimmingPool: true,
      address: `45 Royal Palace Road, ${destName}`,
      phone: "+91 98765 43211"
    },
    {
      id: "h3",
      name: `Grand Palace Resort & Spa ${destName}`,
      image: fallbackImages[2] || fallbackImages[0],
      distance: "2.5 km from lakefront",
      pricePerNight: Math.round(baseHotelPrice * 1.6),
      rating: 4.9,
      reviewsCount: 1150,
      valueCategory: "luxury" as const,
      familyFriendly: true,
      freeBreakfast: true,
      freeWifi: true,
      parking: true,
      swimmingPool: true,
      address: `1 Lakeview Boulevard, ${destName}`,
      phone: "+91 98765 43212"
    }
  ];

  // Strictly sort hotels LOWEST PRICE FIRST!
  const sortedHotels = rawHotels.sort((a, b) => a.pricePerNight - b.pricePerNight).map(h => ({
    ...h,
    priceFormatted: `₹${h.pricePerNight.toLocaleString()}`
  }));

  const attractions = [
    {
      id: "att1",
      name: `${destName} Iconic Palace & Fort`,
      image: fallbackImages[0],
      distance: "1.2 km",
      openingHours: "9:00 AM – 5:30 PM",
      entryFee: "₹100 / Person (Indians), ₹500 (Foreigners)",
      timeRequired: "2.5 Hours",
      bestVisitingTime: "8:30 AM (Before crowds arrive)",
      description: `Spectacular architectural marvel showcasing rich heritage and stunning panoramic viewpoints of ${destName}.`,
      rating: 4.8
    },
    {
      id: "att2",
      name: `${destName} Old Town Heritage Bazaar`,
      image: fallbackImages[1] || fallbackImages[0],
      distance: "0.5 km",
      openingHours: "10:00 AM – 9:00 PM",
      entryFee: "Free Entry",
      timeRequired: "2 Hours",
      bestVisitingTime: "5:00 PM – 8:00 PM",
      description: "Vibrant local market brimming with authentic handicrafts, spices, street snacks, and traditional attire.",
      rating: 4.7
    },
    {
      id: "att3",
      name: `Sunset Point & Lake Overlook ${destName}`,
      image: fallbackImages[2] || fallbackImages[0],
      distance: "3.1 km",
      openingHours: "6:00 AM – 7:00 PM",
      entryFee: "₹50 Boat / Parking fee",
      timeRequired: "1.5 Hours",
      bestVisitingTime: "5:30 PM (Golden Hour)",
      description: "Serene scenic spot ideal for photography, peaceful evening walks, and watching memorable sunsets.",
      rating: 4.9
    }
  ];

  const restaurants = [
    {
      id: "r1",
      name: `Royal Thali & Local Kitchen`,
      rating: 4.8,
      averageCost: "₹400 for two",
      cuisine: "Authentic Regional Thali",
      distance: "0.6 km",
      openNow: true,
      vegetarianOptions: true,
      familyFriendly: true,
      phone: "+91 98111 22334"
    },
    {
      id: "r2",
      name: `The Rooftop Garden Café`,
      rating: 4.6,
      averageCost: "₹800 for two",
      cuisine: "Continental & Fusion Beats",
      distance: "1.1 km",
      openNow: true,
      vegetarianOptions: true,
      familyFriendly: true,
      phone: "+91 98111 22335"
    },
    {
      id: "r3",
      name: `Old Town Street Food Corner`,
      rating: 4.9,
      averageCost: "₹150 for two",
      cuisine: "Local Street Food & Desserts",
      distance: "0.3 km",
      openNow: true,
      vegetarianOptions: true,
      familyFriendly: true,
      phone: "+91 98111 22336"
    }
  ];

  const localTransport = [
    { mode: "Metro / City Rail", estimatedFare: "₹20 – ₹50 / Ride", travelTime: "15-20 Mins", tip: "Fastest way to bypass main traffic congestion." },
    { mode: "Electric Auto Rickshaw", estimatedFare: "₹50 – ₹120 / Ride", travelTime: "10-15 Mins", tip: "Negotiate fare or request meter before starting." },
    { mode: "Scooter / Bike Rental", estimatedFare: "₹450 – ₹600 / Day", travelTime: "Flexible", tip: "Ideal for solo travelers & couples seeking independence." },
    { mode: "Private Taxi / App Cab", estimatedFare: "₹1,500 – ₹2,200 / Full Day", travelTime: "Flexible", tip: "Best for families with luggage and elderly travelers." }
  ];

  // Daily Itinerary Builder
  const dailyItinerary = Array.from({ length: duration }).map((_, index) => {
    const dayNum = index + 1;
    return {
      day: dayNum,
      theme: index === 0 ? `Arrival & Welcome to ${destName}` : index === duration - 1 ? `Souvenirs & Farewell ${destName}` : `Deep Exploration of ${destName}`,
      activities: [
        {
          time: "08:30 AM",
          title: `Breakfast at Local Favorite Spot`,
          category: "Food" as const,
          distance: "0.4 km",
          estimatedCost: "₹200",
          travelTime: "10 mins walk",
          description: `Kickstart Day ${dayNum} with traditional hot breakfast and freshly brewed local chai.`
        },
        {
          time: "10:00 AM",
          title: attractions[index % attractions.length].name,
          category: "Attraction" as const,
          distance: attractions[index % attractions.length].distance,
          estimatedCost: attractions[index % attractions.length].entryFee,
          travelTime: "15 mins ride",
          description: attractions[index % attractions.length].description
        },
        {
          time: "01:30 PM",
          title: `Authentic Lunch at ${restaurants[index % restaurants.length].name}`,
          category: "Food" as const,
          distance: restaurants[index % restaurants.length].distance,
          estimatedCost: restaurants[index % restaurants.length].averageCost,
          travelTime: "10 mins walk",
          description: "Sample signature regional dishes and refreshing local beverages."
        },
        {
          time: "04:30 PM",
          title: index === 0 ? "Check-in & Evening Leisure Walk" : `Explore ${attractions[(index + 1) % attractions.length].name}`,
          category: index === 0 ? ("Hotel" as const) : ("Attraction" as const),
          distance: "1.5 km",
          estimatedCost: "₹100",
          travelTime: "15 mins",
          description: "Enjoy leisure time, capture photographs during golden hour, and browse local artisan stalls."
        },
        {
          time: "08:00 PM",
          title: "Dinner & Cultural Evening",
          category: "Food" as const,
          distance: "0.8 km",
          estimatedCost: "₹500",
          travelTime: "10 mins",
          description: "Relax at a atmospheric rooftop restaurant with live local music or folk dance performances."
        }
      ]
    };
  });

  return {
    title: `${params.interestsInput?.join(" & ") || "Exploration"} Journey to ${destName}`,
    destination: destName,
    state: "India",
    durationDays: duration,
    travelersCount: travelersMultiplier,
    travelersLabel: travelers,
    budgetCategory: budgetCat,
    totalBudgetFormatted: `₹${totalCost.toLocaleString()}`,
    datesFormatted: params.datesInput || "Upcoming Dates",
    
    budgetBreakdown: {
      transport: transportCost,
      hotels: hotelCost,
      food: foodCost,
      entryTickets: entryCost,
      shopping: shoppingCost,
      emergencyBuffer: emergencyCost,
      totalCost: totalCost,
      currency: "₹"
    },

    moneySaverTips: [
      `Stay at ${sortedHotels[0].name} to save up to ₹${Math.round(baseHotelPrice * 0.6).toLocaleString()} on accommodation.`,
      `Use Metro & Auto Rickshaws instead of private taxis to slash transit expenses by ~40%.`,
      `Book monument tickets online via official portal to avoid queue charges and get instant ₹10–₹25 discounts.`
    ],
    mainSavingsHighlight: `You can save approximately ₹${Math.round(totalCost * 0.25).toLocaleString()} by using city metro transport and booking early morning entry passes!`,

    hotels: sortedHotels,
    attractions,
    restaurants,
    localTransport,
    dailyItinerary,

    localGuide: {
      customs: [
        "Remove footwear before entering temples, shrines, and private heritage homes.",
        "Dress respectfully when visiting religious monuments.",
        "Use your right hand for receiving food, items, and paying cash."
      ],
      safetyTips: [
        "Keep digital copies of your Govt ID on your phone.",
        "Prefer bottled drinking water or filtered RO stations.",
        "Agree on taxi/auto fare before boarding if no meter is available."
      ],
      photoSpots: [
        `Sunset Point overlooking ${destName}'s skyline at 5:30 PM`,
        `Main Heritage Fort gateway during morning light (8:00 AM)`,
        `Old Bazaar colorful textile alleys`
      ],
      hiddenGems: [
        `Quiet stepwell 15 minutes away from the main tourist crowds`,
        `Local family-run bakery operating since 1954`
      ],
      scamAlerts: [
        "Beware of unverified guides offering 'exclusive private palace access' without official badges.",
        "Politely decline unsolicited gemstone or handicraft shopping tours with steep commissions."
      ],
      weatherAdvice: "Pleasant mornings & warm afternoons. Carry sunglasses, sunscreen, and lightweight cotton clothes.",
      packingChecklist: [
        "Comfortable walking shoes",
        "Sunscreen & UV Sunglasses",
        "Portable Power Bank (10,000+ mAh)",
        "Reusable Water Bottle",
        "Light jacket for air-conditioned rooms/cool evenings"
      ],
      emergencyContacts: {
        hospitals: [
          { name: `${destName} Civil & Multispecialty Hospital`, distance: "1.8 km", phone: "102 / +91 141 234567" }
        ],
        policeStations: [
          { name: `Central Tourist Police Station ${destName}`, distance: "0.9 km", phone: "112 / +91 141 222333" }
        ],
        atms: [
          { name: "SBI & HDFC 24x7 ATM Hub", distance: "0.2 km" }
        ],
        pharmacies: [
          { name: "24x7 Apollo Pharmacy", distance: "0.4 km", phone: "+91 98999 11223" }
        ]
      }
    },

    personalizedRecommendations: [
      `This itinerary is optimal for ${travelers.toLowerCase()} looking for a balance of heritage, comfort, and high value.`,
      `Increasing your budget by ₹2,500 lets you upgrade to a heritage boutique stay closer to the central attractions.`,
      `Visiting popular monuments before 9:00 AM saves up to 45 minutes of waiting time in ticket lines.`,
      `Traveling by train or shared cab reduces carbon footprint and cuts overall transport spend by ~30%.`
    ]
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, wizardData } = body;

    let destination = "Jaipur";
    let duration = 3;
    let travelers = "2 People";
    let budgetCategory = "Standard";
    let customBudget = 0;
    let dates = "";
    let interests: string[] = ["Historical Places", "Food"];
    let transport = "Train";
    let hotelPref = "Budget Hotel";
    let foodPref = "Vegetarian";

    if (wizardData) {
      destination = wizardData.city || wizardData.destination || "Jaipur";
      duration = Number(wizardData.days || wizardData.duration) || 3;
      travelers = wizardData.travelers || "2 People";
      budgetCategory = wizardData.budgetCategory || wizardData.budget || "Standard";
      customBudget = Number(wizardData.customBudget) || 0;
      dates = wizardData.dates || "";
      interests = wizardData.interests || ["Historical Places", "Food"];
      transport = wizardData.transport || "Train";
      hotelPref = wizardData.hotelPref || "Budget Hotel";
      foodPref = wizardData.foodPref || "Local Cuisine";
    } else if (prompt && typeof prompt === 'string') {
      const lower = prompt.toLowerCase();
      if (lower.includes("goa")) destination = "Goa";
      else if (lower.includes("kerala")) destination = "Kerala";
      else if (lower.includes("ladakh") || lower.includes("leh")) destination = "Ladakh";
      else if (lower.includes("varanasi")) destination = "Varanasi";
      else if (lower.includes("udaipur")) destination = "Udaipur";
      else if (lower.includes("hampi")) destination = "Hampi";
      else if (lower.includes("delhi")) destination = "Delhi";
      else if (lower.includes("mumbai")) destination = "Mumbai";
      else if (lower.includes("manali")) destination = "Manali";

      // extract days if mentioned
      const dayMatch = lower.match(/(\d+)\s*day/);
      if (dayMatch) duration = parseInt(dayMatch[1], 10);

      // extract budget if mentioned
      const budgetMatch = lower.match(/₹?\s*([\d,]+)/);
      if (budgetMatch) {
        customBudget = parseInt(budgetMatch[1].replace(/,/g, ''), 10);
      }
    }

    // Try Supabase lookup if configured
    try {
      const { data: dbDest } = await supabase
        .from("destinations")
        .select("name")
        .ilike("name", `%${destination}%`)
        .limit(1);
      
      if (dbDest && dbDest.length > 0) {
        destination = dbDest[0].name;
      }
    } catch {
      // Ignore fallback to mock generator
    }

    const resultData = generateItineraryData({
      destinationInput: destination,
      durationInput: duration,
      travelersInput: travelers,
      budgetCategoryInput: budgetCategory,
      customBudgetInput: customBudget,
      datesInput: dates,
      interestsInput: interests,
      transportInput: transport,
      hotelPrefInput: hotelPref,
      foodPrefInput: foodPref
    });

    return NextResponse.json(resultData);
  } catch (error) {
    console.error("AI Planner API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate intelligent AI travel plan." },
      { status: 500 }
    );
  }
}
