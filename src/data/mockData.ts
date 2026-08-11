export interface Attraction {
  id: string;
  name: string;
  image: string;
  rating: number;
  entryFee: string;
  openingHours: string;
  duration: string;
  description: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  totalTripPrice?: number;
  image: string;
  amenities: string[];
  type: "Luxury Resort" | "Heritage Hotel" | "Boutique" | "Comfort" | "Homestay" | "Backpacker Hostel";
  distanceFromCenter: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  image: string;
  priceRange: string;
  popularSpot: string;
  isVegetarian: boolean;
}

export interface TravelTip {
  category: "Transport" | "Weather" | "Safety" | "Culture" | "Expenses";
  title: string;
  content: string;
}

export interface DestinationData {
  id: string;
  name: string;
  state: string;
  region: "North India" | "South India" | "West India" | "East India" | "Northeast India";
  shortDescription: string;
  about: string;
  heroImage: string;
  gallery: string[];
  bestTimeToVisit: string;
  startingBudgetPerPerson: number;
  avgBudgetRange: string;
  rating: number;
  popularityScore: number;
  tags: string[];
  topExperiences: Attraction[];
  whereToStay: Hotel[];
  localFood: FoodItem[];
  travelTips: TravelTip[];
}

export interface RegionInfo {
  id: string;
  name: string;
  tagline: string;
  statesList: string[];
  image: string;
  popularDestinations: string[];
}

export const REGIONS_DATA: RegionInfo[] = [
  {
    id: "north",
    name: "North India",
    tagline: "Snow peaks, royal palaces, & sacred rivers",
    statesList: ["Kashmir", "Ladakh", "Rajasthan", "Delhi", "Agra", "Himachal Pradesh", "Uttarakhand"],
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80",
    popularDestinations: ["jaipur", "kashmir", "ladakh", "manali", "agra", "rishikesh", "varanasi", "udaipur", "shimla", "amritsar"],
  },
  {
    id: "south",
    name: "South India",
    tagline: "Misty hills, ancient temples, & backwaters",
    statesList: ["Kerala", "Tamil Nadu", "Karnataka", "Andhra Pradesh", "Puducherry"],
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80",
    popularDestinations: ["kerala", "hampi", "munnar", "mysore", "ooty", "pondicherry", "coorg"],
  },
  {
    id: "west",
    name: "West India",
    tagline: "Sun-drenched beaches, heritage, & vibrant cities",
    statesList: ["Goa", "Maharashtra", "Gujarat"],
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80",
    popularDestinations: ["goa", "mumbai", "jaisalmer"],
  },
  {
    id: "east",
    name: "East India",
    tagline: "Colonial charm, tea gardens, & coastal shrines",
    statesList: ["West Bengal", "Odisha", "Bihar"],
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
    popularDestinations: ["darjeeling"],
  },
  {
    id: "northeast",
    name: "Northeast India",
    tagline: "Untamed nature, living root bridges, & clouds",
    statesList: ["Sikkim", "Meghalaya", "Assam", "Arunachal Pradesh", "Nagaland"],
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
    popularDestinations: ["meghalaya", "gangtok"],
  },
];

export const CATEGORIES_DATA = [
  { id: "all", label: "All Places", icon: "✨" },
  { id: "mountains", label: "Mountains", icon: "🏔️" },
  { id: "beaches", label: "Beaches", icon: "🏖️" },
  { id: "heritage", label: "Heritage", icon: "🏛️" },
  { id: "nature", label: "Nature", icon: "🌿" },
  { id: "spiritual", label: "Spiritual", icon: "🛕" },
  { id: "food", label: "Food", icon: "🍛" },
  { id: "adventure", label: "Adventure", icon: "🏕️" },
  { id: "cities", label: "Cities", icon: "🌆" },
];

export const DESTINATIONS_DATA: DestinationData[] = [
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    region: "North India",
    shortDescription: "The Pink City of grand hilltop forts, ornate palaces, and vibrant artisan bazaars.",
    about: "Jaipur, the capital of Rajasthan, is world-famous for its majestic pink sandstone architecture, opulent royal palaces, and rich Rajasthani heritage. Built in 1727 by Maharaja Sawai Jai Singh II, Jaipur forms part of India's iconic Golden Triangle.",
    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80",
      "https://images.unsplash.com/photo-1603201667141-5a2d4c673378?w=1200&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80"
    ],
    bestTimeToVisit: "October – March",
    startingBudgetPerPerson: 8500,
    avgBudgetRange: "₹8,500 – ₹25,000",
    rating: 4.9,
    popularityScore: 98,
    tags: ["Heritage", "Cities", "Culture", "Photography", "Food"],
    topExperiences: [
      {
        id: "exp-j1",
        name: "Amber Fort",
        image: "https://images.unsplash.com/photo-1603201667141-5a2d4c673378?w=800&q=80",
        rating: 4.9,
        entryFee: "₹100 (Indian) / ₹500 (Foreigner)",
        openingHours: "08:00 AM - 05:30 PM",
        duration: "2 - 3 Hours",
        description: "Breathtaking hilltop fort featuring elaborate Sheesh Mahal mirror work and panoramic lake views."
      },
      {
        id: "exp-j2",
        name: "Hawa Mahal",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
        rating: 4.8,
        entryFee: "₹50 (Indian) / ₹200 (Foreigner)",
        openingHours: "09:00 AM - 05:00 PM",
        duration: "1 Hour",
        description: "The 'Palace of Breeze' with 953 honeycombed latticework windows designed for royal women."
      },
      {
        id: "exp-j3",
        name: "City Palace",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
        rating: 4.9,
        entryFee: "₹300 (Indian) / ₹700 (Foreigner)",
        openingHours: "09:30 AM - 05:00 PM",
        duration: "2 Hours",
        description: "Royal residence showcasing Mughal and Rajput courtyards, museums, and Peacock Gate."
      }
    ],
    whereToStay: [
      {
        id: "hotel-j1",
        name: "Zostel Jaipur",
        location: "Hawa Mahal Road, Jaipur",
        rating: 4.7,
        reviewsCount: 1420,
        pricePerNight: 850,
        totalTripPrice: 2550,
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
        amenities: ["Free WiFi", "Rooftop Cafe", "Social Events"],
        type: "Backpacker Hostel",
        distanceFromCenter: "0.8 km from center"
      },
      {
        id: "hotel-j2",
        name: "Umaid Bhawan Heritage Hotel",
        location: "Bani Park, Jaipur",
        rating: 4.8,
        reviewsCount: 890,
        pricePerNight: 3800,
        totalTripPrice: 11400,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        amenities: ["Swimming Pool", "Heritage Decor", "Breakfast Included"],
        type: "Heritage Hotel",
        distanceFromCenter: "2.5 km from center"
      },
      {
        id: "hotel-j3",
        name: "Samode Haveli Jaipur",
        location: "Gangapole, Jaipur",
        rating: 4.9,
        reviewsCount: 650,
        pricePerNight: 14500,
        totalTripPrice: 43500,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        amenities: ["Royal Spa", "Infinity Pool", "Fine Dining"],
        type: "Luxury Resort",
        distanceFromCenter: "1.2 km from center"
      }
    ],
    localFood: [
      {
        id: "food-j1",
        name: "Dal Baati Churma",
        description: "Crispy baked wheat balls served with rich spicy lentil curry and crushed sweet churma soaked in pure ghee.",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80",
        priceRange: "₹250 - ₹600",
        popularSpot: "LMB, Johari Bazaar",
        isVegetarian: true
      },
      {
        id: "food-j2",
        name: "Pyaaz Kachori",
        description: "Golden fried flaky pastry filled with spiced caramelized onions and served with sweet mint chutneys.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
        priceRange: "₹40 - ₹90",
        popularSpot: "Rawat Sweets",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Transport",
        title: "Getting Around Jaipur",
        content: "Jaipur Metro connects central locations. E-rickshaws and Uber/Ola cabs are readily available."
      },
      {
        category: "Weather",
        title: "Best Season to Visit",
        content: "October to March offers pleasant daytime weather (18°C–25°C), ideal for exploring open forts."
      }
    ]
  },
  {
    id: "hampi",
    name: "Hampi",
    state: "Karnataka",
    region: "South India",
    shortDescription: "Surreal boulder landscapes, UNESCO ruins, and ancient Vijayanagara empire temples.",
    about: "Hampi is an ethereal open-air museum nestled along the Tungabhadra River in Karnataka. Once the flourishing capital of the 14th-century Vijayanagara Empire, Hampi captivates visitors with boulder-strewn hills, royal ruins, and timeless spirituality.",
    heroImage: "https://images.unsplash.com/photo-1600100397608-f010e423b971?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600100397608-f010e423b971?w=1200&q=80",
      "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?w=1200&q=80"
    ],
    bestTimeToVisit: "October – February",
    startingBudgetPerPerson: 6500,
    avgBudgetRange: "₹6,500 – ₹18,000",
    rating: 4.8,
    popularityScore: 94,
    tags: ["Heritage", "Spiritual", "Nature", "Photography", "Adventure"],
    topExperiences: [
      {
        id: "exp-h1",
        name: "Virupaksha Temple",
        image: "https://images.unsplash.com/photo-1600100397608-f010e423b971?w=800&q=80",
        rating: 4.9,
        entryFee: "₹25 (Indian) / ₹500 (Foreigner)",
        openingHours: "06:00 AM - 06:00 PM",
        duration: "1.5 Hours",
        description: "Active 7th-century Dravidian temple complex dedicated to Lord Shiva with an iconic 50m gopuram."
      },
      {
        id: "exp-h2",
        name: "Vittala Temple & Stone Chariot",
        image: "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?w=800&q=80",
        rating: 4.9,
        entryFee: "₹40 (Indian) / ₹600 (Foreigner)",
        openingHours: "08:30 AM - 05:30 PM",
        duration: "2 Hours",
        description: "Famous for its musical stone pillars and the world-renowned monolithic Stone Chariot."
      }
    ],
    whereToStay: [
      {
        id: "hotel-h1",
        name: "Gopi Guesthouse Hampi",
        location: "Hampi Bazaar",
        rating: 4.6,
        reviewsCount: 540,
        pricePerNight: 1200,
        totalTripPrice: 3600,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        amenities: ["Rooftop Restaurant", "Free WiFi"],
        type: "Comfort",
        distanceFromCenter: "0.2 km from temple"
      },
      {
        id: "hotel-h2",
        name: "Evolve Back Kamalapura Palace",
        location: "Kamalapura, Hampi",
        rating: 4.9,
        reviewsCount: 380,
        pricePerNight: 22000,
        totalTripPrice: 66000,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        amenities: ["Private Jacuzzi Pool", "Ayurvedic Spa"],
        type: "Luxury Resort",
        distanceFromCenter: "8 km from ruins"
      }
    ],
    localFood: [
      {
        id: "food-h1",
        name: "South Indian Banana Leaf Thali",
        description: "Freshly cooked rice, sambar, rasam, kootu, crunchy papad, and payasam served on clean banana leaves.",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80",
        priceRange: "₹120 - ₹250",
        popularSpot: "Mango Tree Restaurant",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Transport",
        title: "Rent a Scooter or Cycle",
        content: "Renting a bicycle (₹150/day) or scooter (₹400/day) is the best way to cross boulder trails."
      }
    ]
  },
  {
    id: "kerala",
    name: "Kerala",
    state: "Kerala",
    region: "South India",
    shortDescription: "Tranquil backwaters, lush green tea plantations, & serene Arabian sea palm beaches.",
    about: "God's Own Country, Kerala is famed for serene houseboat cruises along palm-fringed backwaters in Alleppey, rolling misty tea hills of Munnar, historic spice ports of Kochi, and ancient Ayurvedic wellness traditions.",
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&q=80"
    ],
    bestTimeToVisit: "September – March",
    startingBudgetPerPerson: 10000,
    avgBudgetRange: "₹10,000 – ₹35,000",
    rating: 4.9,
    popularityScore: 99,
    tags: ["Nature", "Beaches", "Spiritual", "Food", "Relaxation"],
    topExperiences: [
      {
        id: "exp-k1",
        name: "Alleppey Houseboat Cruise",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
        rating: 4.9,
        entryFee: "₹6,000 - ₹15,000 / night",
        openingHours: "Check-in 12:00 PM",
        duration: "Full Day / Overnight",
        description: "Glide through tranquil canals, emerald rice paddies, and secluded coconut groves."
      },
      {
        id: "exp-k2",
        name: "Fort Kochi Chinese Fishing Nets",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80",
        rating: 4.8,
        entryFee: "Free",
        openingHours: "All Day",
        duration: "2 Hours",
        description: "Colonial coastal district featuring 14th-century cantilevered fishing nets and spice markets."
      }
    ],
    whereToStay: [
      {
        id: "hotel-k1",
        name: "Zostel Alleppey",
        location: "Alleppey Beach",
        rating: 4.7,
        reviewsCount: 980,
        pricePerNight: 950,
        totalTripPrice: 3800,
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
        amenities: ["Beachfront", "Free WiFi", "Cafe"],
        type: "Backpacker Hostel",
        distanceFromCenter: "100m from beach"
      },
      {
        id: "hotel-k2",
        name: "Kumarakom Lake Resort",
        location: "Kumarakom, Kerala",
        rating: 4.9,
        reviewsCount: 1120,
        pricePerNight: 18500,
        totalTripPrice: 74000,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        amenities: ["Meandering Pool", "Heritage Villas", "Ayurveda Center"],
        type: "Luxury Resort",
        distanceFromCenter: "On Lake Vembanad"
      }
    ],
    localFood: [
      {
        id: "food-k1",
        name: "Appam with Kerala Chicken Stew",
        description: "Soft lacy rice crepes with a thick fluffy center served with coconut milk chicken curry.",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80",
        priceRange: "₹180 - ₹350",
        popularSpot: "Oceanos Restaurant, Fort Kochi",
        isVegetarian: false
      },
      {
        id: "food-k2",
        name: "Kerala Sadya",
        description: "Grand vegetarian feast of 26+ traditional dishes served on fresh banana leaves.",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80",
        priceRange: "₹300 - ₹600",
        popularSpot: "Grand Hotel, Kochi",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Transport",
        title: "KSRTC Water Taxis",
        content: "State ferries cost as little as ₹15 for backwater scenic rides between islands."
      }
    ]
  },
  {
    id: "goa",
    name: "Goa",
    state: "Goa",
    region: "West India",
    shortDescription: "Golden beaches, Portuguese architecture, water sports, and relaxed coastal vibes.",
    about: "India's beach paradise, Goa blends Portuguese colonial architecture, sun-kissed golden sand beaches, thrilling water sports, seafood shacks, and vibrant night markets into an unforgettable holiday atmosphere.",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80"
    ],
    bestTimeToVisit: "November – February",
    startingBudgetPerPerson: 9000,
    avgBudgetRange: "₹9,000 – ₹30,000",
    rating: 4.7,
    popularityScore: 96,
    tags: ["Beaches", "Nightlife", "Food", "Adventure", "Culture"],
    topExperiences: [
      {
        id: "exp-g1",
        name: "Palolem & Vagator Beaches",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
        rating: 4.8,
        entryFee: "Free",
        openingHours: "24 Hours",
        duration: "Full Day",
        description: "Iconic crescent beaches with palm shacks, cliffside sunset views, and watersports."
      },
      {
        id: "exp-g2",
        name: "Basilica of Bom Jesus",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
        rating: 4.8,
        entryFee: "Free",
        openingHours: "09:00 AM - 06:30 PM",
        duration: "1 Hour",
        description: "UNESCO Baroque church holding the mortal remains of St. Francis Xavier in Old Goa."
      }
    ],
    whereToStay: [
      {
        id: "hotel-g1",
        name: "The Hostel Crowd Goa",
        location: "Anjuna, Goa",
        rating: 4.6,
        reviewsCount: 1650,
        pricePerNight: 750,
        totalTripPrice: 3000,
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
        amenities: ["Pool", "Free Breakfast", "Beach Shuttle"],
        type: "Backpacker Hostel",
        distanceFromCenter: "500m from Anjuna beach"
      },
      {
        id: "hotel-g2",
        name: "Taj Fort Aguada Resort & Spa",
        location: "Sinquerim, Goa",
        rating: 4.9,
        reviewsCount: 1400,
        pricePerNight: 16500,
        totalTripPrice: 66000,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        amenities: ["Oceanfront Pool", "Private Beach", "Luxury Spa"],
        type: "Luxury Resort",
        distanceFromCenter: "Direct beach access"
      }
    ],
    localFood: [
      {
        id: "food-g1",
        name: "Goan Fish Curry Rice",
        description: "Fresh kingfish simmered in coconut milk, tangy kokum, and freshly ground Goan red spices.",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
        priceRange: "₹250 - ₹500",
        popularSpot: "Fisherman's Wharf, Cavelossim",
        isVegetarian: false
      }
    ],
    travelTips: [
      {
        category: "Transport",
        title: "Rent a Scooter",
        content: "Scooters cost ₹350–₹600/day. Ensure you carry a valid driving license and helmet."
      }
    ]
  },
  {
    id: "kashmir",
    name: "Kashmir",
    state: "Jammu & Kashmir",
    region: "North India",
    shortDescription: "Paradise on Earth with Dal Lake shikaras, snow valleys, and saffron meadows.",
    about: "Referred to as 'Paradise on Earth', Kashmir mesmerizes with mirror-like Dal Lake shikara rides, snow-covered mountain peaks of Gulmarg, pine forests of Pahalgam, and serene Mughal gardens.",
    heroImage: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=1200&q=80",
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=1200&q=80"
    ],
    bestTimeToVisit: "March – October",
    startingBudgetPerPerson: 14000,
    avgBudgetRange: "₹14,000 – ₹45,000",
    rating: 4.9,
    popularityScore: 98,
    tags: ["Mountains", "Nature", "Relaxation", "Photography", "Adventure"],
    topExperiences: [
      {
        id: "exp-ks1",
        name: "Dal Lake Shikara Ride",
        image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&q=80",
        rating: 4.9,
        entryFee: "₹700 - ₹1,500 / hour",
        openingHours: "06:00 AM - 07:00 PM",
        duration: "1 - 2 Hours",
        description: "Peaceful wooden boat ride through floating lotus gardens and water bazaars in Srinagar."
      },
      {
        id: "exp-ks2",
        name: "Gulmarg Gondola Cable Car",
        image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800&q=80",
        rating: 4.9,
        entryFee: "₹740 (Phase 1) / ₹950 (Phase 2)",
        openingHours: "10:00 AM - 05:00 PM",
        duration: "3 - 4 Hours",
        description: "Asia's highest cable car taking you to 14,000ft snowy peaks for skiing and alpine views."
      }
    ],
    whereToStay: [
      {
        id: "hotel-ks1",
        name: "Luxury Houseboat Srinagar",
        location: "Dal Lake, Srinagar",
        rating: 4.8,
        reviewsCount: 720,
        pricePerNight: 4200,
        totalTripPrice: 16800,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        amenities: ["Walnut Wood Carvings", "Kashmiri Kahwa", "Heated Rooms"],
        type: "Heritage Hotel",
        distanceFromCenter: "On Dal Lake"
      },
      {
        id: "hotel-ks2",
        name: "The Khyber Himalayan Resort",
        location: "Gulmarg",
        rating: 4.9,
        reviewsCount: 890,
        pricePerNight: 28000,
        totalTripPrice: 112000,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        amenities: ["Heated Indoor Pool", "Mountain Views", "Ski Lockers"],
        type: "Luxury Resort",
        distanceFromCenter: "Near Gondola station"
      }
    ],
    localFood: [
      {
        id: "food-ks1",
        name: "Kashmiri Wazwan & Gustaba",
        description: "Royal 36-course feast featuring tender minced mutton balls cooked in rich spiced yogurt gravy.",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
        priceRange: "₹600 - ₹1,200",
        popularSpot: "Ahdoos Restaurant, Srinagar",
        isVegetarian: false
      },
      {
        id: "food-ks2",
        name: "Saffron Kahwa Tea",
        description: "Traditional green tea brewed with green cardamom, saffron strands, cinnamon, and chopped almonds.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
        priceRange: "₹80 - ₹150",
        popularSpot: "Chai Jaai, Srinagar",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Safety",
        title: "Postpaid SIM Required",
        content: "Only postpaid mobile SIM cards work in J&K. Keep government ID original copies handy."
      }
    ]
  },
  {
    id: "ladakh",
    name: "Ladakh",
    state: "Ladakh",
    region: "North India",
    shortDescription: "High-altitude desert mountain passes, turquoise lakes, & Buddhist monasteries.",
    about: "Ladakh is a high-altitude land of passes, stark mountain landscapes, cobalt blue lakes like Pangong Tso, double-humped Bactrian camels in Nubra Valley, and serene centuries-old Buddhist monasteries.",
    heroImage: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=1200&q=80"],
    bestTimeToVisit: "May – September",
    startingBudgetPerPerson: 16000,
    avgBudgetRange: "₹16,000 – ₹48,000",
    rating: 4.9,
    popularityScore: 97,
    tags: ["Mountains", "Adventure", "Spiritual", "Photography", "Nature"],
    topExperiences: [
      {
        id: "exp-ld1",
        name: "Pangong Tso Lake",
        image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800&q=80",
        rating: 4.9,
        entryFee: "Inner Line Permit required (₹500)",
        openingHours: "All Day",
        duration: "Full Day Trip",
        description: "Magical 134km long high-altitude lake changing shades from deep blue to turquoise."
      },
      {
        id: "exp-ld2",
        name: "Diskit Monastery & Nubra Valley",
        image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800&q=80",
        rating: 4.8,
        entryFee: "₹30",
        openingHours: "07:00 AM - 05:00 PM",
        duration: "3 Hours",
        description: "Towering 32m Maitreya Buddha statue and double-humped camel rides on cold desert dunes."
      }
    ],
    whereToStay: [
      {
        id: "hotel-ld1",
        name: "The Grand Dragon Ladakh",
        location: "Leh",
        rating: 4.9,
        reviewsCount: 780,
        pricePerNight: 12500,
        totalTripPrice: 50000,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        amenities: ["Oxygen Cylinders On-site", "Heated Floors", "Buffet Restaurant"],
        type: "Luxury Resort",
        distanceFromCenter: "1 km from Leh bazaar"
      }
    ],
    localFood: [
      {
        id: "food-ld1",
        name: "Ladakhi Thukpa & Momos",
        description: "Hot steaming noodle soup loaded with vegetables and hand-folded steamed dumplings.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
        priceRange: "₹150 - ₹300",
        popularSpot: "The Tibetan Kitchen, Leh",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Weather",
        title: "Acclimatization is Critical",
        content: "Rest completely for the first 24-36 hours after landing in Leh (3,500m elevation) to avoid AMS."
      }
    ]
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    region: "North India",
    shortDescription: "Yoga capital of the world, white-water Ganges rafting, & Himalayan foothills.",
    about: "Nestled where the emerald Ganges river emerges from the Himalayas, Rishikesh is renowned worldwide for yoga ashrams, Ganga Aarti ceremonies at Triveni Ghat, and exhilarating white-water rafting.",
    heroImage: "https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=1200&q=80"],
    bestTimeToVisit: "September – April",
    startingBudgetPerPerson: 7500,
    avgBudgetRange: "₹7,500 – ₹22,000",
    rating: 4.8,
    popularityScore: 95,
    tags: ["Spiritual", "Adventure", "Nature", "Food", "Mountains"],
    topExperiences: [
      {
        id: "exp-r1",
        name: "Ganges White-Water Rafting",
        image: "https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800&q=80",
        rating: 4.9,
        entryFee: "₹600 - ₹1,500 / person",
        openingHours: "08:00 AM - 03:00 PM",
        duration: "3 Hours",
        description: "Conquer grade III & IV rapids starting from Shivpuri down to Laxman Jhula."
      },
      {
        id: "exp-r2",
        name: "Triveni Ghat Evening Ganga Aarti",
        image: "https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800&q=80",
        rating: 4.9,
        entryFee: "Free",
        openingHours: "06:00 PM Daily",
        duration: "1 Hour",
        description: "Devotional evening lamp ceremony along the sacred banks of the Ganges."
      }
    ],
    whereToStay: [
      {
        id: "hotel-r1",
        name: "Hostel Zostel Rishikesh",
        location: "Tapovan, Rishikesh",
        rating: 4.7,
        reviewsCount: 1100,
        pricePerNight: 750,
        totalTripPrice: 2250,
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
        amenities: ["River View", "Yoga Deck", "Cafe"],
        type: "Backpacker Hostel",
        distanceFromCenter: "Tapovan area"
      }
    ],
    localFood: [
      {
        id: "food-r1",
        name: "Ayurvedic Organic Khichdi",
        description: "Wholesome organic grain porridge seasoned with ghee, cumin, and fresh herbs.",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80",
        priceRange: "₹150 - ₹300",
        popularSpot: "Little Buddha Cafe",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Culture",
        title: "Alcohol & Meat Free Zone",
        content: "Rishikesh is a holy city; non-vegetarian food and alcohol are strictly prohibited."
      }
    ]
  },
  {
    id: "manali",
    name: "Manali",
    state: "Himachal Pradesh",
    region: "North India",
    shortDescription: "Snowy pine slopes, Solang valley adventures, & Himalayan mountain views.",
    about: "Surrounded by high mountain peaks and evergreen pine forests in the Kullu Valley, Manali offers adventure sports in Solang Valley, snow driving through Atal Tunnel to Sissu, and chilled mountain cafe culture.",
    heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80"],
    bestTimeToVisit: "October – June",
    startingBudgetPerPerson: 8000,
    avgBudgetRange: "₹8,000 – ₹24,000",
    rating: 4.8,
    popularityScore: 96,
    tags: ["Mountains", "Adventure", "Nature", "Relaxation"],
    topExperiences: [
      {
        id: "exp-m1",
        name: "Solang Valley Snow Sports",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
        rating: 4.8,
        entryFee: "₹1,500 - ₹3,500",
        openingHours: "09:00 AM - 05:00 PM",
        duration: "Half Day",
        description: "Soar high over Himalayan pine forests or try zorbing and quad biking."
      },
      {
        id: "exp-m2",
        name: "Hadimba Temple in Pine Forest",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
        rating: 4.7,
        entryFee: "Free",
        openingHours: "08:00 AM - 06:00 PM",
        duration: "1 Hour",
        description: "Unique 1553 pagoda wooden temple hidden inside dense Dhungri deodar forests."
      }
    ],
    whereToStay: [
      {
        id: "hotel-m1",
        name: "The Hosteller Old Manali",
        location: "Old Manali",
        rating: 4.7,
        reviewsCount: 1200,
        pricePerNight: 650,
        totalTripPrice: 2600,
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
        amenities: ["River Stream View", "Games Room", "Cafe"],
        type: "Backpacker Hostel",
        distanceFromCenter: "Old Manali village"
      }
    ],
    localFood: [
      {
        id: "food-m1",
        name: "Siddu (Stuffed Bread)",
        description: "Steamed yeast bread stuffed with poppy seeds, walnuts, and melted ghee.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
        priceRange: "₹80 - ₹150",
        popularSpot: "Chopsticks, Mall Road",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Transport",
        title: "Atal Tunnel Pass",
        content: "Drive through the 9.02km Atal Tunnel to enter Lahaul Valley for snow landscapes."
      }
    ]
  },
  {
    id: "agra",
    name: "Agra",
    state: "Uttar Pradesh",
    region: "North India",
    shortDescription: "Home of the iconic Taj Mahal, grand Mughal forts, & marble craftsmanship.",
    about: "Agra stands on the banks of the Yamuna river and houses the world's greatest monument to love—the Taj Mahal. Built by Emperor Shah Jahan in memory of Mumtaz Mahal, Agra also boasts the red sandstone Agra Fort and Fatehpur Sikri.",
    heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80"],
    bestTimeToVisit: "October – March",
    startingBudgetPerPerson: 7000,
    avgBudgetRange: "₹7,000 – ₹20,000",
    rating: 4.9,
    popularityScore: 99,
    tags: ["Heritage", "Culture", "Photography", "Cities"],
    topExperiences: [
      {
        id: "exp-ag1",
        name: "Taj Mahal Sunrise View",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
        rating: 5.0,
        entryFee: "₹50 (Indian) / ₹1,100 (Foreigner)",
        openingHours: "Sunrise to Sunset (Closed Fridays)",
        duration: "2 - 3 Hours",
        description: "Marvel at the white marble wonder bathed in soft golden morning sunlight."
      },
      {
        id: "exp-ag2",
        name: "Agra Fort Mughal Palaces",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
        rating: 4.8,
        entryFee: "₹50 (Indian) / ₹650 (Foreigner)",
        openingHours: "06:00 AM - 06:00 PM",
        duration: "2 Hours",
        description: "Red sandstone fortress holding Jahangir Palace, Khas Mahal, and views of Taj Mahal."
      }
    ],
    whereToStay: [
      {
        id: "hotel-ag1",
        name: "Oberoi Amarvilas Agra",
        location: "Taj East Gate",
        rating: 5.0,
        reviewsCount: 1950,
        pricePerNight: 35000,
        totalTripPrice: 105000,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        amenities: ["Direct Taj Views", "Luxury Spa", "Butler Service"],
        type: "Luxury Resort",
        distanceFromCenter: "600m from Taj Mahal"
      },
      {
        id: "hotel-ag2",
        name: "Taj Hotel & Convention Centre",
        location: "Taj Nagari, Agra",
        rating: 4.8,
        reviewsCount: 1200,
        pricePerNight: 6500,
        totalTripPrice: 19500,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        amenities: ["Rooftop Infinity Pool", "Multiple Restaurants"],
        type: "Comfort",
        distanceFromCenter: "1.5 km from Taj"
      }
    ],
    localFood: [
      {
        id: "food-ag1",
        name: "Agra Petha & Bedmi Puri",
        description: "Translucent soft candy made from ash gourd infused with saffron and cardamom.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
        priceRange: "₹100 - ₹300",
        popularSpot: "Panchi Petha, Sadar Bazaar",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Transport",
        title: "Gatimaan Express Train",
        content: "The fastest train from Delhi to Agra takes just 1 hour and 40 minutes."
      }
    ]
  },
  {
    id: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    region: "North India",
    shortDescription: "The Venice of the East with romantic lakes, royal palaces, & heritage havelis.",
    about: "Known as the City of Lakes, Udaipur is celebrated for its serene Lake Pichola, towering City Palace complex, floating Lake Palace resort, and romantic rooftop dining overlooking sparkling waters.",
    heroImage: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=1200&q=80"],
    bestTimeToVisit: "September – March",
    startingBudgetPerPerson: 9500,
    avgBudgetRange: "₹9,500 – ₹32,000",
    rating: 4.9,
    popularityScore: 97,
    tags: ["Heritage", "Relaxation", "Culture", "Photography", "Cities"],
    topExperiences: [
      {
        id: "exp-ud1",
        name: "Lake Pichola Boat Cruise",
        image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=800&q=80",
        rating: 4.9,
        entryFee: "₹400 - ₹800",
        openingHours: "09:00 AM - 06:00 PM",
        duration: "1 Hour",
        description: "Sunset boat ride passing Jag Mandir and the glowing white marble City Palace."
      },
      {
        id: "exp-ud2",
        name: "Udaipur City Palace Museum",
        image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=800&q=80",
        rating: 4.9,
        entryFee: "₹300 (Indian) / ₹400 (Foreigner)",
        openingHours: "09:30 AM - 05:30 PM",
        duration: "2.5 Hours",
        description: "Rajasthan's largest palace complex featuring peacock mosaics, crystal galleries, and courtyards."
      }
    ],
    whereToStay: [
      {
        id: "hotel-ud1",
        name: "Taj Lake Palace Udaipur",
        location: "Lake Pichola",
        rating: 5.0,
        reviewsCount: 1600,
        pricePerNight: 42000,
        totalTripPrice: 126000,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        amenities: ["Floating Palace", "Royal Boat Transfers"],
        type: "Luxury Resort",
        distanceFromCenter: "On Lake Pichola"
      },
      {
        id: "hotel-ud2",
        name: "Jagat Niwas Palace Hotel",
        location: "Lal Ghat, Udaipur",
        rating: 4.8,
        reviewsCount: 940,
        pricePerNight: 6500,
        totalTripPrice: 19500,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        amenities: ["Lake View Jharokhas", "Rooftop Restaurant"],
        type: "Heritage Hotel",
        distanceFromCenter: "Lal Ghat waterfront"
      }
    ],
    localFood: [
      {
        id: "food-ud1",
        name: "Gatte Ki Sabzi & Ker Sangri",
        description: "Gram flour dumplings cooked in a rich spiced yogurt gravy with garlic butter rotis.",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80",
        priceRange: "₹200 - ₹450",
        popularSpot: "Ambrai Restaurant",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Culture",
        title: "Dharohar Folk Dance Show",
        content: "Attend the daily 7 PM puppet and Rajasthani folk dance show at Bagore Ki Haveli."
      }
    ]
  },
  {
    id: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    region: "North India",
    shortDescription: "Spiritual capital of India on the Ganges with sacred ghats & ancient rituals.",
    about: "Varanasi is one of the world's oldest continually inhabited cities. Positioned along the sacred Ganges river, Varanasi captivates pilgrims with evening Ganga Aarti at Dashashwamedh Ghat and sunrise boat rides.",
    heroImage: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200&q=80"],
    bestTimeToVisit: "October – March",
    startingBudgetPerPerson: 6000,
    avgBudgetRange: "₹6,000 – ₹18,000",
    rating: 4.8,
    popularityScore: 96,
    tags: ["Spiritual", "Culture", "Heritage", "Photography"],
    topExperiences: [
      {
        id: "exp-v1",
        name: "Dashashwamedh Ganga Aarti",
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
        rating: 4.9,
        entryFee: "Free",
        openingHours: "06:30 PM Daily",
        duration: "1.5 Hours",
        description: "Mesmerizing devotional ceremony with brass oil lamps, incense, and Vedic chants."
      },
      {
        id: "exp-v2",
        name: "Sarnath Buddhist Stupa",
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
        rating: 4.8,
        entryFee: "₹25 (Indian) / ₹300 (Foreigner)",
        openingHours: "08:00 AM - 05:00 PM",
        duration: "2 Hours",
        description: "Sacred site where Lord Buddha delivered his first sermon after attaining enlightenment."
      }
    ],
    whereToStay: [
      {
        id: "hotel-v1",
        name: "BrijRama Palace Varanasi",
        location: "Darbhanga Ghat",
        rating: 4.9,
        reviewsCount: 920,
        pricePerNight: 19500,
        totalTripPrice: 58500,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        amenities: ["Ghatfront View", "Private Boat Rides"],
        type: "Heritage Hotel",
        distanceFromCenter: "On Ganges Ghat"
      }
    ],
    localFood: [
      {
        id: "food-v1",
        name: "Banarasi Kachori Sabzi & Blue Lassi",
        description: "Crispy lentil kachori served with spicy potato curry and rich clay-pot creamy lassi.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
        priceRange: "₹50 - ₹120",
        popularSpot: "Blue Lassi Shop",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Culture",
        title: "Sunrise Boat Ride",
        content: "Take a rowboat ride at 5:30 AM from Assi Ghat to Manikarnika Ghat to see morning rituals."
      }
    ]
  },
  {
    id: "munnar",
    name: "Munnar",
    state: "Kerala",
    region: "South India",
    shortDescription: "Rolling green tea estates, misty hill valleys, & rare Nilgiri Tahr wildlife.",
    about: "Situated at 1,600m in the Western Ghats, Munnar is famous for vast tea plantations, misty valleys, Anamudi peak (South India's highest point), and blooming Neelakurinji flowers.",
    heroImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&q=80"],
    bestTimeToVisit: "September – May",
    startingBudgetPerPerson: 8500,
    avgBudgetRange: "₹8,500 – ₹24,000",
    rating: 4.8,
    popularityScore: 94,
    tags: ["Mountains", "Nature", "Relaxation", "Photography"],
    topExperiences: [
      {
        id: "exp-mu1",
        name: "Kolukkumalai Tea Estate Trek",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80",
        rating: 4.9,
        entryFee: "₹100 (Jeep ride extra)",
        openingHours: "06:00 AM - 05:00 PM",
        duration: "3 Hours",
        description: "Visit the world's highest organic tea plantation and watch sunrise over cloud beds."
      },
      {
        id: "exp-mu2",
        name: "Eravikulam National Park",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80",
        rating: 4.8,
        entryFee: "₹200 (Indian) / ₹500 (Foreigner)",
        openingHours: "07:30 AM - 04:00 PM",
        duration: "2.5 Hours",
        description: "Sanctuary for the endangered Nilgiri Tahr mountain goat amidst rolling tea hills."
      }
    ],
    whereToStay: [
      {
        id: "hotel-mu1",
        name: "Blanket Hotel & Spa Munnar",
        location: "Attukad Waterfalls Road",
        rating: 4.8,
        reviewsCount: 840,
        pricePerNight: 9500,
        totalTripPrice: 28500,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        amenities: ["Waterfall View", "Infinity Pool"],
        type: "Luxury Resort",
        distanceFromCenter: "4 km from town"
      }
    ],
    localFood: [
      {
        id: "food-mu1",
        name: "Fresh Munnar Cardamom Tea & Fritters",
        description: "Hot spiced tea brewed with freshly picked hill cardamom served with banana fritters.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
        priceRange: "₹40 - ₹100",
        popularSpot: "Tea Museum Cafe",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Weather",
        title: "Misty Evenings",
        content: "Temperatures drop to 10°C in winter evenings. Carry light jackets even in summer."
      }
    ]
  },
  {
    id: "shimla",
    name: "Shimla",
    state: "Himachal Pradesh",
    region: "North India",
    shortDescription: "Queen of the Hills with colonial architecture, heritage toy train, & Mall Road.",
    about: "The former summer capital of British India, Shimla features neo-Gothic colonial buildings, bustling Mall Road promenades, Jakhoo temple, and the UNESCO Kalka-Shimla Toy Train ride.",
    heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80"],
    bestTimeToVisit: "March – June & Dec – Feb",
    startingBudgetPerPerson: 8000,
    avgBudgetRange: "₹8,000 – ₹25,000",
    rating: 4.7,
    popularityScore: 93,
    tags: ["Mountains", "Heritage", "Cities", "Nature"],
    topExperiences: [
      {
        id: "exp-sh1",
        name: "Kalka-Shimla Toy Train",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
        rating: 4.8,
        entryFee: "₹300 - ₹800",
        openingHours: "Daily Departures",
        duration: "5 Hours",
        description: "Iconic narrow-gauge railway journey crossing 102 tunnels and 864 bridges."
      }
    ],
    whereToStay: [
      {
        id: "hotel-sh1",
        name: "Wildflower Hall An Oberoi Resort",
        location: "Chharabra, Shimla",
        rating: 5.0,
        reviewsCount: 1100,
        pricePerNight: 28000,
        totalTripPrice: 84000,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        amenities: ["Heated Outdoor Whirlpool", "Pine Forest Trail"],
        type: "Luxury Resort",
        distanceFromCenter: "12 km from Mall Road"
      }
    ],
    localFood: [
      {
        id: "food-sh1",
        name: "Himachali Madra & Chana Khatta",
        description: "Chickpeas simmered in spiced yogurt gravy cooked with ghee and mountain herbs.",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80",
        priceRange: "₹180 - ₹350",
        popularSpot: "The Devicos, Mall Road",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Transport",
        title: "Pedestrian Only Mall Road",
        content: "Vehicles are prohibited on Mall Road. Be prepared for uphill walks or use the public lift."
      }
    ]
  },
  {
    id: "darjeeling",
    name: "Darjeeling",
    state: "West Bengal",
    region: "East India",
    shortDescription: "Queen of the Hills with Kanchenjunga views, aromatic tea gardens, & toy train.",
    about: "Perched amidst rolling tea estates in North Bengal, Darjeeling offers breathtaking sunrises over Mount Kanchenjunga (the world's 3rd highest peak), world-renowned orthodox black tea, and UNESCO heritage toy train rides.",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80"],
    bestTimeToVisit: "October – May",
    startingBudgetPerPerson: 8500,
    avgBudgetRange: "₹8,500 – ₹26,000",
    rating: 4.8,
    popularityScore: 94,
    tags: ["Mountains", "Nature", "Food", "Heritage"],
    topExperiences: [
      {
        id: "exp-dj1",
        name: "Tiger Hill Kanchenjunga Sunrise",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
        rating: 4.9,
        entryFee: "₹50 - ₹100",
        openingHours: "04:00 AM - 06:30 AM",
        duration: "2 Hours",
        description: "Watch the snow peaks of Mount Kanchenjunga illuminate in fiery golden hues at dawn."
      }
    ],
    whereToStay: [
      {
        id: "hotel-dj1",
        name: "Mayfair Darjeeling",
        location: "The Mall, Darjeeling",
        rating: 4.8,
        reviewsCount: 780,
        pricePerNight: 12000,
        totalTripPrice: 36000,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        amenities: ["Valley View", "Heritage Decor"],
        type: "Heritage Hotel",
        distanceFromCenter: "500m from Chowrasta"
      }
    ],
    localFood: [
      {
        id: "food-dj1",
        name: "Darjeeling Tea & Steamed Momos",
        description: "Steaming Tibetan dumplings served with spicy tomato chili sauce and aromatic champagne tea.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
        priceRange: "₹120 - ₹250",
        popularSpot: "Keventer's & Glenary's",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Transport",
        title: "Shared Taxis from Siliguri",
        content: "Shared Sumo taxis run frequently from NJP railway station and Bagdogra Airport to Darjeeling."
      }
    ]
  },
  {
    id: "meghalaya",
    name: "Meghalaya",
    state: "Meghalaya",
    region: "Northeast India",
    shortDescription: "Abode of Clouds with living root bridges, crystal clear rivers, & cascading waterfalls.",
    about: "Meghalaya is a pristine paradise of living root bridges engineered by the Khasi tribe, Cherrapunji's world-record waterfalls, and Dawki's transparent glass-like river.",
    heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80"],
    bestTimeToVisit: "October – April",
    startingBudgetPerPerson: 11000,
    avgBudgetRange: "₹11,000 – ₹32,000",
    rating: 4.9,
    popularityScore: 96,
    tags: ["Nature", "Adventure", "Mountains", "Photography"],
    topExperiences: [
      {
        id: "exp-mg1",
        name: "Cherrapunji Living Root Bridge",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
        rating: 4.9,
        entryFee: "₹50",
        openingHours: "06:00 AM - 05:00 PM",
        duration: "Full Day Trek",
        description: "Trek down 3,000 steps to witness bio-engineered living rubber tree root bridges in Nongriat."
      }
    ],
    whereToStay: [
      {
        id: "hotel-mg1",
        name: "Ri Kynjai Serenity by the Lake",
        location: "Umiam Lake, Shillong",
        rating: 4.9,
        reviewsCount: 620,
        pricePerNight: 14500,
        totalTripPrice: 43500,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        amenities: ["Lake View Cottages", "Khasi Spa"],
        type: "Luxury Resort",
        distanceFromCenter: "On Umiam Lake"
      }
    ],
    localFood: [
      {
        id: "food-mg1",
        name: "Jadoh & Dohneiiong",
        description: "Rice cooked with pork or chicken stock and seasoned with local black sesame paste.",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
        priceRange: "₹180 - ₹350",
        popularSpot: "Police Bazar, Shillong",
        isVegetarian: false
      }
    ],
    travelTips: [
      {
        category: "Safety",
        title: "Sturdy Trekking Shoes Required",
        content: "Root bridge treks involve wet stone stairs; carry waterproof non-slip footwear."
      }
    ]
  },
  {
    id: "gangtok",
    name: "Gangtok",
    state: "Sikkim",
    region: "Northeast India",
    shortDescription: "Clean Himalayan capital with glacial Tsomgo lake, Nathula pass, & monasteries.",
    about: "Gangtok, the capital of Sikkim, is a clean mountain city surrounded by snow-capped peaks, vibrant MG Marg walking street, Rumtek monastery, and high-altitude Nathula Pass on the Silk Route.",
    heroImage: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=1200&q=80"],
    bestTimeToVisit: "March – May & Oct – Dec",
    startingBudgetPerPerson: 10500,
    avgBudgetRange: "₹10,500 – ₹30,000",
    rating: 4.8,
    popularityScore: 95,
    tags: ["Mountains", "Spiritual", "Nature", "Adventure"],
    topExperiences: [
      {
        id: "exp-gk1",
        name: "Tsomgo Lake & Baba Mandir",
        image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800&q=80",
        rating: 4.9,
        entryFee: "Permit required (₹200)",
        openingHours: "07:30 AM - 02:00 PM",
        duration: "Half Day",
        description: "Glacial high-altitude lake at 12,400ft surrounded by snow mountains and yaks."
      }
    ],
    whereToStay: [
      {
        id: "hotel-gk1",
        name: "Mayfair Spa Resort Gangtok",
        location: "Ranipool, Gangtok",
        rating: 4.9,
        reviewsCount: 890,
        pricePerNight: 15500,
        totalTripPrice: 46500,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        amenities: ["Monastery Architecture", "Casino"],
        type: "Luxury Resort",
        distanceFromCenter: "9 km from MG Marg"
      }
    ],
    localFood: [
      {
        id: "food-gk1",
        name: "Sikkimese Thenthuk & Churpi",
        description: "Hand-pulled noodle soup with fresh mountain greens and traditional yak cheese snack.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
        priceRange: "₹150 - ₹300",
        popularSpot: "Nimtho, MG Marg",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Safety",
        title: "Inner Line Permit for Foreigners",
        content: "Foreign tourists require an ILP to enter Sikkim, obtainable free at Rangpo border."
      }
    ]
  },
  {
    id: "ooty",
    name: "Ooty",
    state: "Tamil Nadu",
    region: "South India",
    shortDescription: "Queen of Hill Stations with Nilgiri Toy Train, botanical gardens, & tea estates.",
    about: "Ooty (Udhagamandalam) is nestled in the blue Nilgiri hills of Tamil Nadu. Famous for colonial heritage, tea factories, Pykara waterfalls, and the historic Nilgiri Mountain Railway steam train.",
    heroImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&q=80"],
    bestTimeToVisit: "October – June",
    startingBudgetPerPerson: 7500,
    avgBudgetRange: "₹7,500 – ₹22,000",
    rating: 4.7,
    popularityScore: 92,
    tags: ["Mountains", "Nature", "Relaxation", "Heritage"],
    topExperiences: [
      {
        id: "exp-ot1",
        name: "Nilgiri Mountain Railway Steam Train",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80",
        rating: 4.8,
        entryFee: "₹200 - ₹600",
        openingHours: "Daily Departures",
        duration: "3.5 Hours",
        description: "UNESCO Heritage blue steam train winding through mountain tunnels and tea hills."
      }
    ],
    whereToStay: [
      {
        id: "hotel-ot1",
        name: "Savoy IHCL SeleQtions Ooty",
        location: "Sylks Road, Ooty",
        rating: 4.9,
        reviewsCount: 750,
        pricePerNight: 16000,
        totalTripPrice: 48000,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        amenities: ["Colonial English Cottages", "Fireplace"],
        type: "Heritage Hotel",
        distanceFromCenter: "1.5 km from center"
      }
    ],
    localFood: [
      {
        id: "food-ot1",
        name: "Ooty Homemade Chocolates & Varkey",
        description: "Handcrafted milk chocolates and crispy layered Nilgiri tea time varkey biscuits.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
        priceRange: "₹100 - ₹300",
        popularSpot: "King Star Chocolates",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Transport",
        title: "Book Toy Train in Advance",
        content: "Nilgiri Toy Train tickets sell out weeks in advance; book via IRCTC online early."
      }
    ]
  },
  {
    id: "mysore",
    name: "Mysore",
    state: "Karnataka",
    region: "South India",
    shortDescription: "City of Palaces, royal Dasara celebrations, Mysore silk, & sandalwood.",
    about: "Mysore (Mysuru) is Karnataka's cultural capital, famous for the magnificent illuminated Mysore Palace, Chamundeshwari hilltop temple, fragrant sandalwood oils, and pure silk sarees.",
    heroImage: "https://images.unsplash.com/photo-1600100397608-f010e423b971?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1600100397608-f010e423b971?w=1200&q=80"],
    bestTimeToVisit: "October – March",
    startingBudgetPerPerson: 6500,
    avgBudgetRange: "₹6,500 – ₹20,000",
    rating: 4.8,
    popularityScore: 93,
    tags: ["Heritage", "Culture", "Spiritual", "Food"],
    topExperiences: [
      {
        id: "exp-my1",
        name: "Mysore Palace Illumination",
        image: "https://images.unsplash.com/photo-1600100397608-f010e423b971?w=800&q=80",
        rating: 4.9,
        entryFee: "₹100 (Indian) / ₹300 (Foreigner)",
        openingHours: "07:00 PM - 07:45 PM (Sundays & Holidays)",
        duration: "1 Hour",
        description: "Spectacular sight of 100,000 bulbs illuminating the royal palace exterior."
      }
    ],
    whereToStay: [
      {
        id: "hotel-my1",
        name: "Grand Mercure Mysore",
        location: "Sayyaji Rao Road",
        rating: 4.7,
        reviewsCount: 820,
        pricePerNight: 5500,
        totalTripPrice: 16500,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        amenities: ["Rooftop Pool", "Buffet Dining"],
        type: "Comfort",
        distanceFromCenter: "2 km from Palace"
      }
    ],
    localFood: [
      {
        id: "food-my1",
        name: "Mysore Pak & Masala Dosa",
        description: "Melt-in-mouth ghee sweet and crispy red chutney coated rice crepe filled with potato masala.",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80",
        priceRange: "₹80 - ₹200",
        popularSpot: "Mylari Dosa & Guru Sweets",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Culture",
        title: "Dasara Festival Season",
        content: "Visiting during October Dasara showcases royal elephant processions and grand light shows."
      }
    ]
  },
  {
    id: "pondicherry",
    name: "Pondicherry",
    state: "Puducherry",
    region: "South India",
    shortDescription: "French colonial Quarter, yellow mustard heritage streets, & beach promenade.",
    about: "Pondicherry (Puducherry) retains peaceful French colonial charm with bright yellow heritage villas, seaside Promenade beach, French bakeries, and spiritual experimental town Auroville.",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80"],
    bestTimeToVisit: "October – March",
    startingBudgetPerPerson: 7000,
    avgBudgetRange: "₹7,000 – ₹22,000",
    rating: 4.7,
    popularityScore: 93,
    tags: ["Beaches", "Heritage", "Food", "Relaxation"],
    topExperiences: [
      {
        id: "exp-py1",
        name: "White Town Heritage Walk",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
        rating: 4.8,
        entryFee: "Free",
        openingHours: "All Day",
        duration: "2 Hours",
        description: "Stroll through French Quarter avenues lined with bougainvillea and mustard heritage walls."
      }
    ],
    whereToStay: [
      {
        id: "hotel-py1",
        name: "La Villa Heritage Pondicherry",
        location: "White Town",
        rating: 4.9,
        reviewsCount: 650,
        pricePerNight: 12500,
        totalTripPrice: 37500,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        amenities: ["French Villa Pool", "Organic Breakfast"],
        type: "Boutique",
        distanceFromCenter: "In White Town"
      }
    ],
    localFood: [
      {
        id: "food-py1",
        name: "French Croissants & Quiche",
        description: "Freshly baked buttery croissants, espresso, and savory French quiche.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
        priceRange: "₹150 - ₹350",
        popularSpot: "Baker Street & Cafe des Arts",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Transport",
        title: "Rent a Vintage Bicycle",
        content: "Renting a yellow bicycle (₹100/day) is the best way to explore White Town streets."
      }
    ]
  },
  {
    id: "amritsar",
    name: "Amritsar",
    state: "Punjab",
    region: "North India",
    shortDescription: "Spiritual heart of Sikhism with the Golden Temple, Wagah border, & Punjabi cuisine.",
    about: "Amritsar is the spiritual sanctuary of Sikhism, world-famous for the gleaming Golden Temple (Sri Harmandir Sahib), community kitchen feeding 100,000 daily, and Wagah Border sunset ceremony.",
    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80"],
    bestTimeToVisit: "October – March",
    startingBudgetPerPerson: 6000,
    avgBudgetRange: "₹6,000 – ₹18,000",
    rating: 4.9,
    popularityScore: 97,
    tags: ["Spiritual", "Culture", "Food", "Heritage"],
    topExperiences: [
      {
        id: "exp-am1",
        name: "Golden Temple Night Illumination",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
        rating: 5.0,
        entryFee: "Free",
        openingHours: "24 Hours",
        duration: "2 Hours",
        description: "Experience peace as the golden sanctum reflects in the holy Amrit Sarovar lake at night."
      }
    ],
    whereToStay: [
      {
        id: "hotel-am1",
        name: "Taj Swarna Amritsar",
        location: "Majitha Road",
        rating: 4.9,
        reviewsCount: 1100,
        pricePerNight: 8500,
        totalTripPrice: 25500,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        amenities: ["Outdoor Pool", "Punjabi Fine Dining"],
        type: "Luxury Resort",
        distanceFromCenter: "3.5 km from Golden Temple"
      }
    ],
    localFood: [
      {
        id: "food-am1",
        name: "Amritsari Kulcha & Chole",
        description: "Crispy tandoori stuffed bread drenched in butter served with spicy chickpeas and sweet lassi.",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80",
        priceRange: "₹100 - ₹250",
        popularSpot: "Kulcha Land & Kesar Da Dhaba",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Culture",
        title: "Head Covering Required",
        content: "Cover your head with a scarf and remove shoes before entering the Golden Temple complex."
      }
    ]
  },
  {
    id: "coorg",
    name: "Coorg",
    state: "Karnataka",
    region: "South India",
    shortDescription: "Scotland of India with aromatic coffee plantations, waterfalls, & Kodava culture.",
    about: "Coorg (Kodagu) is a lush hill destination in the Western Ghats famous for sprawling coffee estates, spice gardens, Abbey Waterfalls, and the distinctive Kodava culture.",
    heroImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&q=80"],
    bestTimeToVisit: "October – May",
    startingBudgetPerPerson: 8000,
    avgBudgetRange: "₹8,000 – ₹25,000",
    rating: 4.8,
    popularityScore: 93,
    tags: ["Nature", "Mountains", "Relaxation", "Food"],
    topExperiences: [
      {
        id: "exp-cg1",
        name: "Coffee Plantation Walking Tour",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80",
        rating: 4.8,
        entryFee: "₹300 - ₹700",
        openingHours: "09:00 AM - 04:00 PM",
        duration: "2 Hours",
        description: "Guided walk through Arabica coffee estates with fresh coffee bean tasting."
      }
    ],
    whereToStay: [
      {
        id: "hotel-cg1",
        name: "Evolve Back Coorg",
        location: "Siddapur, Coorg",
        rating: 5.0,
        reviewsCount: 1300,
        pricePerNight: 24000,
        totalTripPrice: 72000,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        amenities: ["Private Pool Villas", "Ayurvedic Spa"],
        type: "Luxury Resort",
        distanceFromCenter: "In coffee estate"
      }
    ],
    localFood: [
      {
        id: "food-cg1",
        name: "Coorg Pandi Curry & Kadambuttu",
        description: "Signature dark spicy pork curry seasoned with wild Kodava vinegar (Kachampuli) and steamed rice balls.",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
        priceRange: "₹300 - ₹550",
        popularSpot: "Coorg Cuisine, Madikeri",
        isVegetarian: false
      }
    ],
    travelTips: [
      {
        category: "Transport",
        title: "Best Reached by Road",
        content: "Drive or take a private cab from Mysore (2.5 hrs) or Bengaluru (5 hrs) to reach Coorg."
      }
    ]
  },
  {
    id: "jaisalmer",
    name: "Jaisalmer",
    state: "Rajasthan",
    region: "West India",
    shortDescription: "The Golden City of living sandstone fort, Thar desert camel safaris, & dunes.",
    about: "Jaisalmer rises out of the Thar Desert like a scene from Arabian Nights. Famous for its living yellow sandstone fort where locals reside, Jain temples, and luxury desert glamping under starry night skies.",
    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80"],
    bestTimeToVisit: "October – March",
    startingBudgetPerPerson: 9000,
    avgBudgetRange: "₹9,000 – ₹28,000",
    rating: 4.9,
    popularityScore: 96,
    tags: ["Heritage", "Adventure", "Culture", "Photography"],
    topExperiences: [
      {
        id: "exp-js1",
        name: "Sam Sand Dunes Desert Safari",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
        rating: 4.9,
        entryFee: "₹1,500 - ₹4,500",
        openingHours: "04:00 PM - 10:00 PM",
        duration: "Half Day / Overnight",
        description: "Jeep dune bashing, sunset camel rides, and Kalbelia folk dance around desert campfires."
      }
    ],
    whereToStay: [
      {
        id: "hotel-js1",
        name: "Suryagarh Jaisalmer",
        location: "Kahala Phata, Jaisalmer",
        rating: 5.0,
        reviewsCount: 1450,
        pricePerNight: 22000,
        totalTripPrice: 66000,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        amenities: ["Palace Architecture", "Dune Dinner"],
        type: "Luxury Resort",
        distanceFromCenter: "14 km from Fort"
      }
    ],
    localFood: [
      {
        id: "food-js1",
        name: "Ker Sangri & Bajra Roti",
        description: "Desert berries and wild beans cooked in dried red spices served with pearl millet rotis.",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80",
        priceRange: "₹200 - ₹400",
        popularSpot: "The Trio, Fort Road",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Weather",
        title: "Desert Cold Nights",
        content: "Desert temperatures drop drastically after sunset in winter; bring warm jackets for night camps."
      }
    ]
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    region: "West India",
    shortDescription: "City of Dreams with Gateway of India, Marine Drive, Bollywood, & street food.",
    about: "Mumbai is India's financial powerhouse and home to Bollywood. A vibrant coastal metropolis of Victorian Gothic architecture, sea links, iconic Marine Drive sunset views, and legendary street food culture.",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80"],
    bestTimeToVisit: "November – February",
    startingBudgetPerPerson: 10000,
    avgBudgetRange: "₹10,000 – ₹35,000",
    rating: 4.8,
    popularityScore: 98,
    tags: ["Cities", "Food", "Culture", "Heritage", "Nightlife"],
    topExperiences: [
      {
        id: "exp-mb1",
        name: "Marine Drive Queen's Necklace",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
        rating: 4.9,
        entryFee: "Free",
        openingHours: "All Day",
        duration: "2 Hours",
        description: "Stroll along the 3.6km C-shaped promenade watching sea waves crash as city lights turn on."
      }
    ],
    whereToStay: [
      {
        id: "hotel-mb1",
        name: "The Taj Mahal Palace Mumbai",
        location: "Apollo Bunder, Colaba",
        rating: 5.0,
        reviewsCount: 3200,
        pricePerNight: 28000,
        totalTripPrice: 84000,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        amenities: ["Arabian Sea View", "Historic Grandeur"],
        type: "Luxury Resort",
        distanceFromCenter: "Opposite Gateway of India"
      }
    ],
    localFood: [
      {
        id: "food-mb1",
        name: "Vada Pav & Pav Bhaji",
        description: "Spiced potato fritter inside soft bun with garlic chutney, and buttery mashed vegetable curry.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
        priceRange: "₹20 - ₹150",
        popularSpot: "Sardar Pav Bhaji & Ashok Vada Pav",
        isVegetarian: true
      }
    ],
    travelTips: [
      {
        category: "Transport",
        title: "Mumbai Local Trains & Metro",
        content: "Avoid rush hours (8-10 AM & 6-8 PM) when traveling on suburban local train lines."
      }
    ]
  }
];

export const MOCK_USER_TRIPS = [
  {
    id: "trip-kerala-01",
    destinationId: "kerala",
    title: "Kerala Escape & Backwaters",
    dates: "12 Aug – 17 Aug 2026",
    travellersCount: 2,
    budget: 20000,
    status: "Upcoming" as const,
    progressPercentage: 80,
    coverImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    daysCount: 5,
    budgetBreakdown: {
      accommodation: 7500,
      transport: 5000,
      food: 4000,
      activities: 2500,
      miscellaneous: 1000
    }
  },
  {
    id: "trip-jaipur-02",
    destinationId: "jaipur",
    title: "Royal Heritage Jaipur Explorer",
    dates: "15 Oct – 18 Oct 2026",
    travellersCount: 1,
    budget: 12500,
    status: "Upcoming" as const,
    progressPercentage: 40,
    coverImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
    daysCount: 4,
    budgetBreakdown: {
      accommodation: 4500,
      transport: 3000,
      food: 2500,
      activities: 1800,
      miscellaneous: 700
    }
  },
  {
    id: "trip-goa-03",
    destinationId: "goa",
    title: "Goa Beach Holiday",
    dates: "04 Jan – 08 Jan 2026",
    travellersCount: 3,
    budget: 32000,
    status: "Completed" as const,
    progressPercentage: 100,
    coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    daysCount: 5,
    budgetBreakdown: {
      accommodation: 12000,
      transport: 8000,
      food: 7000,
      activities: 3500,
      miscellaneous: 1500
    }
  }
];

export const QUICK_PROMPTS = [
  "Plan a weekend trip",
  "Find cheap destinations",
  "Best places for couples",
  "Best destinations under ₹10,000",
  "Plan a family trip",
  "Best monsoon destinations"
];
