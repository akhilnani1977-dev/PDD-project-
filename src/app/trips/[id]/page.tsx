"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { DESTINATIONS_DATA } from "@/data/mockData";
import TripBudgetBreakdown from "@/components/trips/TripBudgetBreakdown";
import TravelImage from "@/components/shared/TravelImage";
import {
  Calendar,
  Users,
  MapPin,
  IndianRupee,
  ExternalLink,
  Trash2,
  Edit3,
  PlusCircle,
  ArrowLeft,
  Share2,
} from "lucide-react";

interface Activity {
  id: string;
  time: string;
  title: string;
  location: string;
  duration: string;
  estimatedCost: number;
  image: string;
  travelTime: string;
}

interface DayPlan {
  dayNumber: number;
  tabLabel: string;
  title: string;
  activities: Activity[];
}

export default function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const tripId = resolvedParams.id;

  const { trips, updateTripBudget, addToast } = useAppStore();

  const trip = trips.find((t) => t.id === tripId) || trips[0];
  const [activeDay, setActiveDay] = useState(1);

  // Match destination data to get authentic photos and landmarks
  const destObj = DESTINATIONS_DATA.find(
    (d) =>
      d.id.toLowerCase() === (trip.destinationId || "").toLowerCase() ||
      trip.title.toLowerCase().includes(d.name.toLowerCase()) ||
      d.name.toLowerCase().includes(trip.destinationId || "")
  ) || DESTINATIONS_DATA[0];

  // Helper to build 100% accurate, destination-specific 5-day itineraries
  const getDestinationItineraries = (): DayPlan[] => {
    const name = destObj.name;
    const hero = destObj.heroImage;
    const img1 = destObj.topExperiences[0]?.image || hero;
    const img2 = destObj.topExperiences[1]?.image || destObj.gallery[0] || hero;
    const hotelImg = destObj.whereToStay[0]?.image || hero;
    const foodImg = destObj.localFood[0]?.image || hero;

    if (name.toLowerCase() === "darjeeling") {
      return [
        {
          dayNumber: 1,
          tabLabel: "Day 1 — Mall Road",
          title: "Day 1 — Arrival & Chowrasta Mall Walk",
          activities: [
            {
              id: "dj-1-1",
              time: "09:00 AM",
              title: "Arrive in Darjeeling & Hotel Check-in",
              location: "The Mall, Darjeeling",
              duration: "1.5 Hours",
              estimatedCost: 1000,
              image: hotelImg,
              travelTime: "3 hours drive from Bagdogra",
            },
            {
              id: "dj-1-2",
              time: "11:30 AM",
              title: "Stroll along Chowrasta & Glenary's Bakery",
              location: "Chowrasta Promenade",
              duration: "2 Hours",
              estimatedCost: 350,
              image: foodImg,
              travelTime: "5 mins walk",
            },
            {
              id: "dj-1-3",
              time: "03:00 PM",
              title: "Visit Observatory Hill & Mahakal Temple",
              location: "Observatory Hill, Darjeeling",
              duration: "1.5 Hours",
              estimatedCost: 50,
              image: img1,
              travelTime: "10 mins walk",
            },
            {
              id: "dj-1-4",
              time: "06:30 PM",
              title: "Traditional Nepalese Thali Dinner",
              location: "Keventer's Terrace Cafe",
              duration: "1.5 Hours",
              estimatedCost: 450,
              image: foodImg,
              travelTime: "5 mins walk",
            },
          ],
        },
        {
          dayNumber: 2,
          tabLabel: "Day 2 — Tiger Hill",
          title: "Day 2 — Tiger Hill Sunrise & Batasia Loop",
          activities: [
            {
              id: "dj-2-1",
              time: "04:00 AM",
              title: "Tiger Hill Kanchenjunga Dawn Views",
              location: "Tiger Hill Lookout",
              duration: "2.5 Hours",
              estimatedCost: 200,
              image: img1,
              travelTime: "40 mins drive",
            },
            {
              id: "dj-2-2",
              time: "08:30 AM",
              title: "Batasia Loop & Gorkha War Memorial",
              location: "Batasia Loop",
              duration: "1.5 Hours",
              estimatedCost: 50,
              image: img2,
              travelTime: "15 mins drive",
            },
            {
              id: "dj-2-3",
              time: "11:00 AM",
              title: "Ghoom Monastery (Yiga Choeling)",
              location: "Ghoom, Darjeeling",
              duration: "1 Hour",
              estimatedCost: 30,
              image: hero,
              travelTime: "10 mins drive",
            },
            {
              id: "dj-2-4",
              time: "02:30 PM",
              title: "Himalayan Mountaineering Institute & Zoo",
              location: "Jawahar Parbat",
              duration: "2.5 Hours",
              estimatedCost: 110,
              image: img1,
              travelTime: "15 mins taxi",
            },
          ],
        },
        {
          dayNumber: 3,
          tabLabel: "Day 3 — Toy Train & Tea",
          title: "Day 3 — Steam Toy Train & Happy Valley Tea Estate",
          activities: [
            {
              id: "dj-3-1",
              time: "09:30 AM",
              title: "Darjeeling Himalayan Railway Steam Ride",
              location: "Darjeeling Railway Station",
              duration: "2 Hours",
              estimatedCost: 1000,
              image: img1,
              travelTime: "Departs Station",
            },
            {
              id: "dj-3-2",
              time: "01:00 PM",
              title: "Happy Valley Tea Estate Guided Walk",
              location: "Happy Valley, Darjeeling",
              duration: "2 Hours",
              estimatedCost: 150,
              image: img2,
              travelTime: "15 mins drive",
            },
            {
              id: "dj-3-3",
              time: "04:30 PM",
              title: "First Flush Tea Tasting & Souvenir Shopping",
              location: "Nathmulls Tea Lounge",
              duration: "1.5 Hours",
              estimatedCost: 300,
              image: foodImg,
              travelTime: "10 mins walk",
            },
          ],
        },
        {
          dayNumber: 4,
          tabLabel: "Day 4 — Peace Pagoda",
          title: "Day 4 — Japanese Peace Pagoda & Rock Garden",
          activities: [
            {
              id: "dj-4-1",
              time: "09:00 AM",
              title: "Japanese Peace Pagoda & Nipponzan Temple",
              location: "Jalapahar Hill",
              duration: "1.5 Hours",
              estimatedCost: 0,
              image: img2,
              travelTime: "15 mins taxi",
            },
            {
              id: "dj-4-2",
              time: "11:30 AM",
              title: "Barbotey Rock Garden & Ganga Maya Park",
              location: "Chunnu Summer Falls",
              duration: "3 Hours",
              estimatedCost: 100,
              image: hero,
              travelTime: "30 mins drive down hill",
            },
            {
              id: "dj-4-3",
              time: "05:00 PM",
              title: "Sunset over Kanchenjunga Range",
              location: "Chowrasta Viewpoint",
              duration: "1.5 Hours",
              estimatedCost: 0,
              image: img1,
              travelTime: "15 mins walk",
            },
          ],
        },
        {
          dayNumber: 5,
          tabLabel: "Day 5 — Departure",
          title: "Day 5 — Mirik Lake Tour & Departure",
          activities: [
            {
              id: "dj-5-1",
              time: "08:30 AM",
              title: "Check-out & Drive to Mirik Sumendu Lake",
              location: "Mirik, West Bengal",
              duration: "2 Hours",
              estimatedCost: 200,
              image: hero,
              travelTime: "1.5 hours scenic drive",
            },
            {
              id: "dj-5-2",
              time: "12:00 PM",
              title: "Pashupati Nagar Market & Airport Drop",
              location: "Bagdogra Airport (IXB)",
              duration: "2 Hours",
              estimatedCost: 500,
              image: hotelImg,
              travelTime: "1 hour to Bagdogra",
            },
          ],
        },
      ];
    }

    if (name.toLowerCase() === "jaipur") {
      return [
        {
          dayNumber: 1,
          tabLabel: "Day 1 — Old City",
          title: "Day 1 — Arrival & Pink City Bazaar Exploration",
          activities: [
            {
              id: "jp-1-1",
              time: "09:00 AM",
              title: "Check-in at Heritage Haveli",
              location: "Bani Park, Jaipur",
              duration: "1.5 Hours",
              estimatedCost: 1200,
              image: hotelImg,
              travelTime: "25 mins from Airport",
            },
            {
              id: "jp-1-2",
              time: "11:30 AM",
              title: "Hawa Mahal (Palace of Breeze)",
              location: "Johari Bazaar",
              duration: "1.5 Hours",
              estimatedCost: 200,
              image: img1,
              travelTime: "15 mins auto",
            },
            {
              id: "jp-1-3",
              time: "02:00 PM",
              title: "Traditional Dal Baati Churma Lunch at LMB",
              location: "Johari Bazaar",
              duration: "1.5 Hours",
              estimatedCost: 500,
              image: foodImg,
              travelTime: "5 mins walk",
            },
          ],
        },
        {
          dayNumber: 2,
          tabLabel: "Day 2 — Amber Fort",
          title: "Day 2 — Amber Fort & Nahargarh Sunset",
          activities: [
            {
              id: "jp-2-1",
              time: "08:30 AM",
              title: "Amber Fort & Sheesh Mahal Tour",
              location: "Amer, Jaipur",
              duration: "3 Hours",
              estimatedCost: 500,
              image: img2,
              travelTime: "30 mins drive",
            },
            {
              id: "jp-2-2",
              time: "12:30 PM",
              title: "Stepwell Panna Meena Ka Kund",
              location: "Amer",
              duration: "1 Hour",
              estimatedCost: 0,
              image: hero,
              travelTime: "5 mins walk",
            },
            {
              id: "jp-2-3",
              time: "05:00 PM",
              title: "Nahargarh Fort Sunset & City Lights View",
              location: "Nahargarh Ridge",
              duration: "2 Hours",
              estimatedCost: 200,
              image: img1,
              travelTime: "25 mins drive",
            },
          ],
        },
        {
          dayNumber: 3,
          tabLabel: "Day 3 — Royal Palaces",
          title: "Day 3 — City Palace & Jantar Mantar Observatory",
          activities: [
            {
              id: "jp-3-1",
              time: "09:30 AM",
              title: "City Palace & Peacock Gate Walk",
              location: "City Palace Complex",
              duration: "2 Hours",
              estimatedCost: 300,
              image: img1,
              travelTime: "15 mins drive",
            },
            {
              id: "jp-3-2",
              time: "12:00 PM",
              title: "Jantar Mantar Astronomical Sundial",
              location: "Jantar Mantar",
              duration: "1.5 Hours",
              estimatedCost: 200,
              image: hero,
              travelTime: "5 mins walk",
            },
          ],
        },
        {
          dayNumber: 4,
          tabLabel: "Day 4 — Jal Mahal",
          title: "Day 4 — Jal Mahal Lake & Chokhi Dhani Resort",
          activities: [
            {
              id: "jp-4-1",
              time: "10:00 AM",
              title: "Jal Mahal Water Palace Viewpoint",
              location: "Man Sagar Lake",
              duration: "1 Hour",
              estimatedCost: 0,
              image: hero,
              travelTime: "15 mins drive",
            },
            {
              id: "jp-4-2",
              time: "06:00 PM",
              title: "Chokhi Dhani Rajasthani Village Evening",
              location: "Tonk Road",
              duration: "4 Hours",
              estimatedCost: 900,
              image: foodImg,
              travelTime: "30 mins drive",
            },
          ],
        },
        {
          dayNumber: 5,
          tabLabel: "Day 5 — Departure",
          title: "Day 5 — Patrika Gate & Souvenir Shopping",
          activities: [
            {
              id: "jp-5-1",
              time: "09:00 AM",
              title: "Patrika Gate Photography Session",
              location: "Jawahar Circle",
              duration: "1.5 Hours",
              estimatedCost: 0,
              image: img1,
              travelTime: "10 mins from Airport",
            },
          ],
        },
      ];
    }

    if (name.toLowerCase() === "goa") {
      return [
        {
          dayNumber: 1,
          tabLabel: "Day 1 — Anjuna Beach",
          title: "Day 1 — Arrival & Anjuna Beach Sunset Shacks",
          activities: [
            {
              id: "goa-1-1",
              time: "10:00 AM",
              title: "Check-in at Beach Resort",
              location: "Anjuna Beach, Goa",
              duration: "1.5 Hours",
              estimatedCost: 1500,
              image: hotelImg,
              travelTime: "45 mins from Dabolim",
            },
            {
              id: "goa-1-2",
              time: "04:30 PM",
              title: "Sunset Cocktails at Curlies Shacks",
              location: "Anjuna Beach",
              duration: "3 Hours",
              estimatedCost: 800,
              image: img1,
              travelTime: "10 mins walk",
            },
          ],
        },
        {
          dayNumber: 2,
          tabLabel: "Day 2 — Old Goa",
          title: "Day 2 — Old Goa Churches & Fontainhas Walk",
          activities: [
            {
              id: "goa-2-1",
              time: "09:30 AM",
              title: "Basilica of Bom Jesus UNESCO Heritage",
              location: "Old Goa",
              duration: "2 Hours",
              estimatedCost: 0,
              image: img2,
              travelTime: "30 mins drive",
            },
            {
              id: "goa-2-2",
              time: "01:00 PM",
              title: "Fontainhas Latin Quarter Pastel Houses Walk",
              location: "Panjim",
              duration: "2 Hours",
              estimatedCost: 400,
              image: foodImg,
              travelTime: "15 mins drive",
            },
          ],
        },
        {
          dayNumber: 3,
          tabLabel: "Day 3 — Waterfalls",
          title: "Day 3 — Dudhsagar Waterfalls & Spice Plantation",
          activities: [
            {
              id: "goa-3-1",
              time: "08:00 AM",
              title: "Dudhsagar Waterfalls Jeep Safari",
              location: "Mollem National Park",
              duration: "4 Hours",
              estimatedCost: 1200,
              image: hero,
              travelTime: "1.5 hours drive",
            },
          ],
        },
        {
          dayNumber: 4,
          tabLabel: "Day 4 — Palolem",
          title: "Day 4 — South Goa Palolem & Butterfly Beach",
          activities: [
            {
              id: "goa-4-1",
              time: "09:30 AM",
              title: "Palolem Crescent Beach Kayaking",
              location: "Palolem Beach",
              duration: "3 Hours",
              estimatedCost: 500,
              image: img1,
              travelTime: "1 hour drive",
            },
          ],
        },
        {
          dayNumber: 5,
          tabLabel: "Day 5 — Departure",
          title: "Day 5 — Souvenirs & Departure",
          activities: [
            {
              id: "goa-5-1",
              time: "10:00 AM",
              title: "Panjim Market Feni & Spices Shopping",
              location: "Panjim",
              duration: "2 Hours",
              estimatedCost: 300,
              image: foodImg,
              travelTime: "20 mins to Airport",
            },
          ],
        },
      ];
    }

    // Default dynamic itinerary based on destination's real experiences
    return [
      {
        dayNumber: 1,
        tabLabel: `Day 1 — ${name} Arrival`,
        title: `Day 1 — Arrival in ${name} & Local Exploration`,
        activities: [
          {
            id: `${destObj.id}-1-1`,
            time: "09:00 AM",
            title: `Arrive in ${name} & Hotel Check-in`,
            location: `${destObj.whereToStay[0]?.location || name}`,
            duration: "1.5 Hours",
            estimatedCost: 1000,
            image: hotelImg,
            travelTime: "30 mins from station/airport",
          },
          {
            id: `${destObj.id}-1-2`,
            time: "11:30 AM",
            title: `Explore ${destObj.topExperiences[0]?.name || name + " Main Landmark"}`,
            location: `${name} Center`,
            duration: "2 Hours",
            estimatedCost: 300,
            image: img1,
            travelTime: "15 mins walk",
          },
          {
            id: `${destObj.id}-1-3`,
            time: "01:30 PM",
            title: `Sample ${destObj.localFood[0]?.name || "Local Specialties"}`,
            location: `${destObj.localFood[0]?.popularSpot || name}`,
            duration: "1.5 Hours",
            estimatedCost: 450,
            image: foodImg,
            travelTime: "10 mins walk",
          },
        ],
      },
      {
        dayNumber: 2,
        tabLabel: `Day 2 — ${destObj.topExperiences[0]?.name.split(" ")[0] || "Landmarks"}`,
        title: `Day 2 — ${destObj.topExperiences[0]?.name || "Top Sights"} Tour`,
        activities: [
          {
            id: `${destObj.id}-2-1`,
            time: "09:00 AM",
            title: `${destObj.topExperiences[0]?.name || "Sightseeing Tour"}`,
            location: `${destObj.name}`,
            duration: "3 Hours",
            estimatedCost: 400,
            image: img1,
            travelTime: "20 mins drive",
          },
          {
            id: `${destObj.id}-2-2`,
            time: "02:30 PM",
            title: `${destObj.topExperiences[1]?.name || "Scenic Viewpoint Walk"}`,
            location: `${destObj.name}`,
            duration: "2 Hours",
            estimatedCost: 200,
            image: img2,
            travelTime: "15 mins drive",
          },
        ],
      },
      {
        dayNumber: 3,
        tabLabel: "Day 3 — Culture",
        title: `Day 3 — Heritage Trails & Culture in ${name}`,
        activities: [
          {
            id: `${destObj.id}-3-1`,
            time: "09:30 AM",
            title: `Guided Heritage Walk around ${name}`,
            location: `${name} Old District`,
            duration: "2.5 Hours",
            estimatedCost: 250,
            image: hero,
            travelTime: "10 mins walk",
          },
        ],
      },
      {
        dayNumber: 4,
        tabLabel: "Day 4 — Nature",
        title: `Day 4 — Excursions & Scenic Beauty`,
        activities: [
          {
            id: `${destObj.id}-4-1`,
            time: "10:00 AM",
            title: `Scenic Nature Outing near ${name}`,
            location: `${name} Valley`,
            duration: "3 Hours",
            estimatedCost: 350,
            image: destObj.gallery[0] || hero,
            travelTime: "30 mins drive",
          },
        ],
      },
      {
        dayNumber: 5,
        tabLabel: "Day 5 — Departure",
        title: `Day 5 — Souvenirs & Departure from ${name}`,
        activities: [
          {
            id: `${destObj.id}-5-1`,
            time: "09:30 AM",
            title: `Local Artisan Bazaars & Departure`,
            location: `${name}`,
            duration: "2 Hours",
            estimatedCost: 500,
            image: foodImg,
            travelTime: "Drop off at transport hub",
          },
        ],
      },
    ];
  };

  const dayPlans = getDestinationItineraries();

  // Initialize or fetch state for active day activities
  const activeDayPlan = dayPlans.find((dp) => dp.dayNumber === activeDay) || dayPlans[0];
  const [customActivities, setCustomActivities] = useState<Record<number, Activity[]>>({});

  const currentActivities = customActivities[activeDay] || activeDayPlan.activities;

  const handleRemoveActivity = (id: string) => {
    const updated = currentActivities.filter((a) => a.id !== id);
    setCustomActivities({ ...customActivities, [activeDay]: updated });
    addToast("Activity removed from timeline", "info");
  };

  const handleAddActivity = () => {
    const newAct: Activity = {
      id: `act-${Date.now()}`,
      time: "04:30 PM",
      title: `Custom ${destObj.name} Experience`,
      location: destObj.name,
      duration: "1.5 Hours",
      estimatedCost: 350,
      image: destObj.heroImage,
      travelTime: "15 mins",
    };
    setCustomActivities({
      ...customActivities,
      [activeDay]: [...currentActivities, newAct],
    });
    addToast("New activity added to itinerary!", "success");
  };

  const handleChangeActivity = (id: string) => {
    const updated = currentActivities.map((a) =>
      a.id === id
        ? { ...a, title: `${a.title} (Updated)`, estimatedCost: a.estimatedCost + 100 }
        : a
    );
    setCustomActivities({ ...customActivities, [activeDay]: updated });
    addToast("Activity slot updated", "success");
  };

  const openInGoogleMaps = (locationName: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName + " " + destObj.name)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans">
      {/* Hero Header Banner */}
      <div className="relative h-72 sm:h-80 bg-slate-900 overflow-hidden">
        <TravelImage src={destObj.heroImage || trip.coverImage} alt={trip.title} className="w-full h-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

        <div className="absolute top-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between z-20">
          <Link
            href="/trips"
            className="px-4 py-2 rounded-full bg-white/80 hover:bg-white text-slate-900 text-xs font-bold backdrop-blur-md transition-all flex items-center gap-1 shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>My Trips</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                addToast("Itinerary link copied to clipboard!", "success");
              }
            }}
            className="p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-900 backdrop-blur-md transition-all shadow-md cursor-pointer"
            title="Share Itinerary"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-white pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-extrabold shadow-sm">
            {trip.status} Trip
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2">{trip.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200 mt-2 font-medium">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-emerald-400" /> {trip.dates}</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-emerald-400" /> {trip.travellersCount} Travellers</span>
            <span className="flex items-center gap-1.5"><IndianRupee className="w-4 h-4 text-amber-400" /> Total ₹{trip.budget.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        {/* Dynamic Day Tabs Matching the Destination */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {dayPlans.map((dp) => (
              <button
                key={dp.dayNumber}
                type="button"
                onClick={() => setActiveDay(dp.dayNumber)}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  activeDay === dp.dayNumber
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {dp.tabLabel}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddActivity}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Add Activity</span>
          </button>
        </div>

        {/* Timeline Sequence */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900">
              {activeDayPlan.title}
            </h2>
            <button
              type="button"
              onClick={handleAddActivity}
              className="sm:hidden flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
            >
              + Add Slot
            </button>
          </div>

          <div className="relative border-l-2 border-emerald-500/40 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-6">
            {currentActivities.map((act) => (
              <div
                key={act.id}
                className="relative bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-5 h-5 rounded-full bg-emerald-600 border-4 border-slate-50 shadow-md" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                      <TravelImage src={act.image} alt={act.title} className="w-full h-full object-cover" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                          {act.time}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">({act.duration})</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">{act.title}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {act.location} • Travel: {act.travelTime}
                      </p>
                      <span className="text-xs font-extrabold text-emerald-700 block mt-1">
                        Est. Cost: ₹{act.estimatedCost}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <button
                      type="button"
                      onClick={() => openInGoogleMaps(act.location)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Open in Maps</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleChangeActivity(act.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Change</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemoveActivity(act.id)}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TRIP BUDGET BREAKDOWN SECTION */}
        <TripBudgetBreakdown
          budgetBreakdown={trip.budgetBreakdown}
          onUpdate={(newBreakdown) => updateTripBudget(trip.id, newBreakdown)}
        />
      </div>
    </div>
  );
}
