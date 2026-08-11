"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { QUICK_PROMPTS } from "@/data/mockData";
import { useAppStore, PlannedTrip } from "@/lib/store";
import {
  Sparkles,
  Send,
  User,
  Bot,
  Bookmark,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  itineraryData?: {
    destination: string;
    duration: string;
    budget: number;
    days: {
      day: number;
      title: string;
      places: string[];
      hotel: string;
      food: string;
      transport: string;
      estimatedCost: number;
      tips: string;
    }[];
  };
}

export default function AiPlannerPage() {
  const router = useRouter();
  const { addTrip, addToast } = useAppStore();

  const [inputPrompt, setInputPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-1",
      sender: "ai",
      text: "Namaste! I am Traverse AI, your personal India travel companion. Tell me where you'd like to go, your travel dates, or your target budget, and I'll craft a customized day-by-day itinerary for you!",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputPrompt("");
    setIsTyping(true);

    setTimeout(() => {
      let responseText = "";
      let generatedItinerary: Message["itineraryData"] = undefined;

      const lower = query.toLowerCase();

      if (lower.includes("kerala")) {
        responseText =
          "Great choice! Kerala is magnificent. Before I generate your 5-day itinerary, would you prefer backwater houseboats, tea gardens in Munnar, coastal beaches, or a balanced mix?";
        generatedItinerary = {
          destination: "Kerala Backwaters & Hills",
          duration: "5 Days",
          budget: 20000,
          days: [
            {
              day: 1,
              title: "Arrive in Kochi & Heritage Walk",
              places: ["Fort Kochi", "Chinese Fishing Nets", "Mattancherry Palace"],
              hotel: "Zostel Kochi / Heritage Homestay",
              food: "Kerala Fish Curry Rice & Appam",
              transport: "Local Autorickshaw / Ferry",
              estimatedCost: 3500,
              tips: "Take the state ferry for ₹15 to enjoy scenic water views.",
            },
            {
              day: 2,
              title: "Drive to Munnar Tea Gardens",
              places: ["Mattupetty Dam", "Tea Museum", "Anamudi Peak Viewpoint"],
              hotel: "Tea Valley Resort Munnar",
              food: "Hot Cardamom Chai & Kerala Parotta",
              transport: "Shared Taxi / KSRTC Bus",
              estimatedCost: 4200,
              tips: "Mornings in Munnar are chilly; carry a lightweight jacket.",
            },
            {
              day: 3,
              title: "Munnar Spice Plantation Tour",
              places: ["Eravikulam National Park", "Spice Gardens"],
              hotel: "Tea Valley Resort Munnar",
              food: "Traditional Banana Leaf Sadya",
              transport: "Local Taxi",
              estimatedCost: 3800,
              tips: "Buy fresh cardamom and cinnamon directly from spice gardens.",
            },
            {
              day: 4,
              title: "Alleppey Houseboat Experience",
              places: ["Punnamada Lake", "Vembanad Backwaters"],
              hotel: "Traditional Deluxe Houseboat",
              food: "Fresh Karimeen Pollichathu & Coconut Stew",
              transport: "Houseboat Cruise",
              estimatedCost: 6500,
              tips: "Check-in is usually at 12:00 PM; enjoy sunset from the upper deck.",
            },
            {
              day: 5,
              title: "Alleppey Beach & Departure",
              places: ["Alleppey Beach Lighthouse", "Souvenir Spice Market"],
              hotel: "Checkout",
              food: "Filter Coffee & Banana Fritters",
              transport: "Taxi to Kochi Airport",
              estimatedCost: 2000,
              tips: "Keep extra 2 hours for airport security during peak hours.",
            },
          ],
        };
      } else if (lower.includes("jaipur") || lower.includes("rajasthan")) {
        responseText =
          "Jaipur is a royal masterpiece! Here is a 3-day royal itinerary featuring hilltop forts, palace mirror work, and authentic Rajasthani cuisine within ₹15,000.";
        generatedItinerary = {
          destination: "Jaipur Pink City Explorer",
          duration: "3 Days",
          budget: 15000,
          days: [
            {
              day: 1,
              title: "Arrival & Royal Palaces",
              places: ["City Palace", "Hawa Mahal", "Jantar Mantar"],
              hotel: "Umaid Bhawan Heritage Hotel",
              food: "Dal Baati Churma at LMB",
              transport: "Uber / E-Rickshaw",
              estimatedCost: 4500,
              tips: "Buy a combo composite ticket at Hawa Mahal to save on entry fees.",
            },
            {
              day: 2,
              title: "Hilltop Forts & Sunset Views",
              places: ["Amber Fort Sheesh Mahal", "Nahargarh Fort Sunset"],
              hotel: "Umaid Bhawan Heritage Hotel",
              food: "Laal Maas & Pyaaz Kachori",
              transport: "Cab / Scooter Rental",
              estimatedCost: 5500,
              tips: "Visit Nahargarh Fort around 05:00 PM for panoramic city light views.",
            },
            {
              day: 3,
              title: "Bazaars & Artisan Shopping",
              places: ["Johari Bazaar", "Bapu Bazaar", "Patrika Gate"],
              hotel: "Checkout",
              food: "Ghewar & Saffron Lassi",
              transport: "Auto Rickshaw",
              estimatedCost: 3000,
              tips: "Bargain respectfully; artisan shops offer up to 25% discount.",
            },
          ],
        };
      } else if (lower.includes("cheap") || lower.includes("under ₹10,000") || lower.includes("budget")) {
        responseText =
          "For incredible destinations under ₹10,000, I highly recommend Rishikesh, Hampi, or Pondicherry! Here is a 4-day budget adventure in Rishikesh for ₹7,500.";
        generatedItinerary = {
          destination: "Rishikesh Ganges & Rafting",
          duration: "4 Days",
          budget: 7500,
          days: [
            {
              day: 1,
              title: "Arrival & Ganga Aarti",
              places: ["Laxman Jhula", "Triveni Ghat Evening Aarti"],
              hotel: "Zostel Tapovan",
              food: "Ayurvedic Khichdi & Herbal Tea",
              transport: "Shared Auto",
              estimatedCost: 1500,
              tips: "Reach Triveni Ghat by 05:30 PM to secure front seating for the Aarti.",
            },
            {
              day: 2,
              title: "White Water Rafting & Cliff Jump",
              places: ["Shivpuri Rafting Point", "Maggi Point"],
              hotel: "Zostel Tapovan",
              food: "Fresh Woodfired Pizza at Beatles Cafe",
              transport: "Rafting Shuttle",
              estimatedCost: 2500,
              tips: "Carry dry clothes in a waterproof bag during rafting.",
            },
          ],
        };
      } else {
        responseText = `I have analyzed your request for "${query}". Here is a curated itinerary suggestion built for an optimal travel experience in India!`;
        generatedItinerary = {
          destination: "Goa Coastal Vibe",
          duration: "4 Days",
          budget: 18000,
          days: [
            {
              day: 1,
              title: "Arrival & North Goa Beach Walk",
              places: ["Anjuna Beach", "Curlies Shack"],
              hotel: "The Hostel Crowd Anjuna",
              food: "Goan Fish Curry Rice",
              transport: "Rental Scooter",
              estimatedCost: 4000,
              tips: "Rent a scooter at the railway station for ₹350/day.",
            },
          ],
        };
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: responseText,
        itineraryData: generatedItinerary,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSaveItinerary = (itinerary: NonNullable<Message["itineraryData"]>) => {
    const newTrip: PlannedTrip = {
      id: `ai-trip-${Date.now()}`,
      destinationId: "kerala",
      title: itinerary.destination,
      dates: "Flexible Dates 2026",
      travellersCount: 2,
      budget: itinerary.budget,
      status: "Upcoming",
      progressPercentage: 20,
      coverImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
      daysCount: itinerary.days.length,
      budgetBreakdown: {
        accommodation: Math.round(itinerary.budget * 0.4),
        transport: Math.round(itinerary.budget * 0.25),
        food: Math.round(itinerary.budget * 0.2),
        activities: Math.round(itinerary.budget * 0.1),
        miscellaneous: Math.round(itinerary.budget * 0.05),
      },
    };

    addTrip(newTrip);
    addToast(`Saved "${itinerary.destination}" to My Trips!`, "success");
    router.push("/trips");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Traverse AI</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Traverse AI Assistant</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Your personal India travel companion.</p>
        </div>

        {/* Quick Prompts Bar */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 text-slate-700 text-xs font-semibold transition-all shrink-0 shadow-2xs"
            >
              ⚡ {prompt}
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[600px]">
          {/* Chat Messages scroll area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Bot className="w-5 h-5" />
                  </div>
                )}

                <div className={`max-w-2xl ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`p-4 rounded-3xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-slate-900 text-white rounded-br-none"
                        : "bg-slate-100 text-slate-900 rounded-bl-none border border-slate-200/60"
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>

                  {/* Render Generated Itinerary Card if present */}
                  {msg.itineraryData && (
                    <div className="mt-4 bg-slate-50 rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-emerald-700">AI Generated Itinerary</span>
                          <h4 className="text-base font-extrabold text-slate-900">{msg.itineraryData.destination}</h4>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-slate-700 block">{msg.itineraryData.duration}</span>
                          <span className="text-xs font-extrabold text-emerald-600">₹{msg.itineraryData.budget.toLocaleString("en-IN")}</span>
                        </div>
                      </div>

                      {/* Days Timeline Preview */}
                      <div className="space-y-3">
                        {msg.itineraryData.days.map((day) => (
                          <div key={day.day} className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                            <div className="flex items-center justify-between font-bold text-slate-900">
                              <span>Day {day.day} — {day.title}</span>
                              <span className="text-emerald-700 font-extrabold">₹{day.estimatedCost}</span>
                            </div>
                            <p className="text-slate-600">📍 <strong>Places:</strong> {day.places.join(" • ")}</p>
                            <p className="text-slate-600">🏨 <strong>Stay:</strong> {day.hotel}</p>
                            <p className="text-slate-600">🍛 <strong>Food:</strong> {day.food}</p>
                            <p className="text-slate-500 italic text-[11px]">💡 Tip: {day.tips}</p>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => handleSaveItinerary(msg.itineraryData!)}
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <Bookmark className="w-4 h-4" />
                        <span>Save Itinerary to My Trips</span>
                      </button>
                    </div>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-3 text-slate-400 text-xs">
                <div className="w-8 h-8 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <span>Traverse AI is crafting your itinerary...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-3">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask anything (e.g. 'I want to visit Kerala for 5 days with ₹20,000')..."
              className="flex-1 bg-white px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-emerald-600 shadow-2xs"
            />
            <button
              onClick={() => handleSend()}
              className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-1 shrink-0"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
