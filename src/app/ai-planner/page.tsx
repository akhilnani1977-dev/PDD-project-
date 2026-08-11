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
  Compass,
  CloudSun,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  itineraryData?: {
    destination: string;
    destinationId: string;
    duration: string;
    budget: number;
    weatherInfo?: {
      temperature: string;
      condition: string;
      bestSeason: string;
    };
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
      text: "Namaste! I am Traverse AI, your trained real-time India travel companion. Tell me where you'd like to go, your travel dates, or your target budget, and I'll craft a customized day-by-day itinerary with real-time weather analytics for you!",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Real AI API Query Handler
  const handleSend = async (textToSend?: string) => {
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

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query }),
      });

      const json = await response.json();

      if (json.success && json.data) {
        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: json.data.reply,
          itineraryData: json.data.itinerary,
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: "ai",
            text: "I experienced a slight glitch analyzing real-time data. Please try rephrasing your request!",
          },
        ]);
      }
    } catch (err) {
      console.error("AI Fetch Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: "I am having trouble connecting to the network right now. Please check your internet connection and try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSaveItinerary = (itinerary: NonNullable<Message["itineraryData"]>) => {
    const newTrip: PlannedTrip = {
      id: `ai-trip-${Date.now()}`,
      destinationId: itinerary.destinationId || "jaipur",
      title: itinerary.destination,
      dates: "Flexible Dates 2026",
      travellersCount: 2,
      budget: itinerary.budget,
      status: "Upcoming",
      progressPercentage: 20,
      coverImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
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
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900">Traverse AI Engine</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Real-time Active
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Trained Artificial Intelligence Model & Real-time Destination Analytics
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.push("/plan")}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Wizard Planner</span>
          </button>
        </div>

        {/* Chat Stream Window */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg min-h-[480px] flex flex-col justify-between space-y-6">
          <div className="space-y-6 overflow-y-auto max-h-[520px] pr-2 no-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 mt-1 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-2xl space-y-4 ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  {/* Bubble Message Text */}
                  <div
                    className={`p-4 rounded-3xl text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                      msg.sender === "user"
                        ? "bg-slate-900 text-white rounded-tr-none font-medium"
                        : "bg-slate-100 text-slate-800 rounded-tl-none font-normal"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Render Itinerary Card ONLY IF Itinerary Data Exists */}
                  {msg.itineraryData && (
                    <div className="bg-white rounded-3xl p-5 border border-emerald-200 shadow-md space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-[10px] font-extrabold uppercase text-emerald-600 tracking-wider">
                            Real AI Generated Itinerary
                          </span>
                          <h3 className="text-lg font-extrabold text-slate-900">{msg.itineraryData.destination}</h3>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-slate-500 block">{msg.itineraryData.duration}</span>
                          <span className="text-sm font-extrabold text-emerald-600">
                            ₹{msg.itineraryData.budget.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>

                      {/* Live Weather Analytics Badge */}
                      {msg.itineraryData.weatherInfo && (
                        <div className="px-3.5 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-900 font-semibold">
                          <div className="flex items-center gap-2">
                            <CloudSun className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Weather: <strong>{msg.itineraryData.weatherInfo.temperature}</strong> ({msg.itineraryData.weatherInfo.condition})</span>
                          </div>
                          <span className="text-[10px] font-extrabold bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded-full">
                            {msg.itineraryData.weatherInfo.bestSeason}
                          </span>
                        </div>
                      )}

                      {/* Days Timeline Preview */}
                      <div className="space-y-3">
                        {msg.itineraryData.days.map((d) => (
                          <div key={d.day} className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 text-xs space-y-1">
                            <div className="flex items-center justify-between font-bold text-slate-900">
                              <span>Day {d.day} — {d.title}</span>
                              <span className="text-emerald-700">₹{d.estimatedCost}</span>
                            </div>
                            <p className="text-slate-600 text-[11px]">📍 <strong>Places:</strong> {d.places.join(" • ")}</p>
                            <p className="text-slate-600 text-[11px]">🏨 <strong>Stay:</strong> {d.hotel}</p>
                            <p className="text-slate-600 text-[11px]">🍱 <strong>Food:</strong> {d.food}</p>
                            <p className="text-slate-400 italic text-[10px]">💡 Tip: {d.tips}</p>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSaveItinerary(msg.itineraryData!)}
                        className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <Bookmark className="w-4 h-4" />
                        <span>Save This Itinerary to My Trips</span>
                      </button>
                    </div>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white shrink-0 mt-1 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 bg-slate-100 rounded-2xl text-xs text-slate-500 font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                  <span>Traverse Real AI Engine is analyzing live data & generating response...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts Bar */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">Try Asking:</span>
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 text-xs font-semibold whitespace-nowrap transition-colors shrink-0 cursor-pointer border border-slate-200"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask real AI anything (e.g. 'I want to visit Kerala for 5 days with ₹20,000')..."
                className="w-full px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-emerald-600 placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all flex items-center gap-1.5 shadow-md cursor-pointer shrink-0"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
