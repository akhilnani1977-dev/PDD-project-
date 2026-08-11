"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QUICK_PROMPTS } from "@/data/mockData";
import { useAppStore, PlannedTrip } from "@/lib/store";
import {
  Send,
  User,
  Bot,
  Bookmark,
  Compass,
  CloudSun,
  Brain,
  TrendingUp,
  Star,
} from "lucide-react";

interface MLRecommendation {
  destinationId: string;
  destinationName: string;
  state: string;
  region: string;
  similarityScore: number;
  matchPercentage: string;
  estimatedTotalBudget: number;
  heroImage: string;
  matchReasons: string[];
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  mlRecommendations?: MLRecommendation[];
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [inputPrompt, setInputPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-1",
      sender: "ai",
      text: "Namaste! I am Traverse AI Assistant, powered by a trained Content-Based ML Recommendation Engine.\n\nTell me your travel preferences — interests, budget, or destination — and I'll generate personalized recommendations using real-time ML inference!\n\nTry: \"Suggest adventure trips under ₹25,000\" or \"Plan a cultural trip to North India\"",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Extract user preferences from natural language prompt
  const parseUserProfile = (query: string) => {
    const lower = query.toLowerCase();
    const interests: string[] = [];

    const interestMap: Record<string, string> = {
      adventure: "Adventure",
      trek: "Adventure",
      hiking: "Adventure",
      relax: "Relaxation",
      beach: "Relaxation",
      spa: "Relaxation",
      culture: "Culture",
      heritage: "Heritage",
      temple: "Spiritual",
      spiritual: "Spiritual",
      nature: "Nature",
      wildlife: "Nature",
      forest: "Nature",
      food: "Food",
      cuisine: "Food",
      photo: "Photography",
      photography: "Photography",
      nightlife: "Nightlife",
      party: "Nightlife",
      family: "Family",
      kids: "Family",
    };

    for (const [keyword, category] of Object.entries(interestMap)) {
      if (lower.includes(keyword)) interests.push(category);
    }
    if (interests.length === 0) interests.push("Culture", "Relaxation");

    const budgetMatch = lower.match(/₹\s?(\d[\d,]*)|(\d+)\s?k|(\d+)\s?thousand/);
    let budget = 20000;
    if (budgetMatch) {
      const raw = budgetMatch[1]?.replace(",", "") || budgetMatch[2] || budgetMatch[3];
      budget = parseInt(raw) * (budgetMatch[2] ? 1000 : 1);
    }

    let region = "";
    if (lower.includes("north")) region = "North India";
    else if (lower.includes("south")) region = "South India";
    else if (lower.includes("west")) region = "West India";
    else if (lower.includes("east")) region = "East India";
    else if (lower.includes("northeast")) region = "Northeast India";

    return { interests, budget, travelersCount: 2, regionPreference: region, durationDays: 5 };
  };

  // Real AI + ML Hybrid Query Handler
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

    const lower = query.toLowerCase().trim();

    // Check if this is a recommendation/suggestion request → call ML model
    const isRecommendRequest =
      lower.includes("suggest") ||
      lower.includes("recommend") ||
      lower.includes("best place") ||
      lower.includes("where should") ||
      lower.includes("where to go") ||
      lower.includes("show me");

    try {
      if (isRecommendRequest) {
        // Call ML Recommendation API endpoint
        const userProfile = parseUserProfile(query);
        const mlRes = await fetch("/api/ai/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userProfile),
        });
        const mlJson = await mlRes.json();

        if (mlJson.success && mlJson.data?.length > 0) {
          const topPick = mlJson.data[0];
          const aiMsg: Message = {
            id: `ai-${Date.now()}`,
            sender: "ai",
            text: `My trained ML engine (${mlJson.modelMeta?.modelType}) has analyzed your preferences using **cosine similarity scoring** and generated ${mlJson.data.length} personalized recommendations!\n\n🏆 **Top Match**: ${topPick.destinationName} (${topPick.matchPercentage} compatibility score)\n📍 Region: ${topPick.region}\n💰 Estimated Budget: ₹${topPick.estimatedTotalBudget.toLocaleString("en-IN")}`,
            mlRecommendations: mlJson.data,
          };
          setMessages((prev) => [...prev, aiMsg]);
          setIsTyping(false);
          return;
        }
      }

      // For general / itinerary queries → call AI Chat API
      const aiRes = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query }),
      });
      const aiJson = await aiRes.json();

      if (aiJson.success && aiJson.data) {
        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: aiJson.data.reply,
          itineraryData: aiJson.data.itinerary,
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: "ai",
            text: "I experienced a small glitch. Please try rephrasing your request!",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: "Network issue connecting to AI engine. Please check your connection and try again.",
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
                <h1 className="text-xl font-extrabold text-slate-900">Traverse AI Assistant</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Real-time Active
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <Brain className="w-3 h-3 text-emerald-600" />
                <p className="text-xs text-slate-500">
                  Trained ML Engine · Content-Based Vector Similarity · Real-time Weather Analytics
                </p>
              </div>
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
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg min-h-[500px] flex flex-col justify-between space-y-6">
          <div className="space-y-6 overflow-y-auto max-h-[560px] pr-2 no-scrollbar">
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
                  {/* Bubble Text */}
                  <div
                    className={`p-4 rounded-3xl text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                      msg.sender === "user"
                        ? "bg-slate-900 text-white rounded-tr-none font-medium"
                        : "bg-slate-100 text-slate-800 rounded-tl-none font-normal"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* ML Recommendation Cards */}
                  {msg.mlRecommendations && msg.mlRecommendations.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 px-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-[10px] font-extrabold uppercase text-emerald-600 tracking-widest">
                          ML Model Predictions (Cosine Similarity Ranked)
                        </span>
                      </div>
                      {msg.mlRecommendations.map((rec, idx) => (
                        <div
                          key={rec.destinationId}
                          className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex gap-0 cursor-pointer hover:shadow-md transition-all"
                          onClick={() => router.push(`/plan?destination=${rec.destinationName}`)}
                        >
                          <div className="w-24 h-20 shrink-0 overflow-hidden bg-slate-100">
                            <img
                              src={rec.heroImage}
                              alt={rec.destinationName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-3 flex flex-col justify-between">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] font-extrabold text-slate-400">#{idx + 1}</span>
                                  <h4 className="text-sm font-bold text-slate-900">{rec.destinationName}</h4>
                                  <span className="text-[10px] text-slate-500">{rec.state}</span>
                                </div>
                                <div className="flex gap-1 mt-1 flex-wrap">
                                  {rec.matchReasons.slice(0, 2).map((r) => (
                                    <span
                                      key={r}
                                      className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[9px] font-bold"
                                    >
                                      {r}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="text-right shrink-0 ml-2">
                                <div className="flex items-center gap-1 justify-end">
                                  <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                                  <span className="text-xs font-extrabold text-emerald-700">{rec.matchPercentage}</span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-medium">match score</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs font-bold text-slate-700">
                                ₹{rec.estimatedTotalBudget.toLocaleString("en-IN")}
                              </span>
                              <span className="text-[10px] text-slate-400">{rec.region}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Itinerary Card */}
                  {msg.itineraryData && (
                    <div className="bg-white rounded-3xl p-5 border border-emerald-200 shadow-md space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-[10px] font-extrabold uppercase text-emerald-600 tracking-wider">
                            AI Generated Itinerary
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

                      {msg.itineraryData.weatherInfo && (
                        <div className="px-3.5 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-900 font-semibold">
                          <div className="flex items-center gap-2">
                            <CloudSun className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>
                              Weather: <strong>{msg.itineraryData.weatherInfo.temperature}</strong> (
                              {msg.itineraryData.weatherInfo.condition})
                            </span>
                          </div>
                          <span className="text-[10px] font-extrabold bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded-full">
                            {msg.itineraryData.weatherInfo.bestSeason}
                          </span>
                        </div>
                      )}

                      <div className="space-y-3">
                        {msg.itineraryData.days.map((d) => (
                          <div
                            key={d.day}
                            className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between font-bold text-slate-900">
                              <span>
                                Day {d.day} — {d.title}
                              </span>
                              <span className="text-emerald-700">₹{d.estimatedCost}</span>
                            </div>
                            <p className="text-slate-600 text-[11px]">
                              📍 <strong>Places:</strong> {d.places.join(" • ")}
                            </p>
                            <p className="text-slate-600 text-[11px]">
                              🏨 <strong>Stay:</strong> {d.hotel}
                            </p>
                            <p className="text-slate-600 text-[11px]">
                              🍱 <strong>Food:</strong> {d.food}
                            </p>
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
                  <Brain className="w-4 h-4 text-emerald-600 animate-pulse" />
                  <span>Traverse Real AI Assistant is analyzing live data & generating response...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
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

            {/* Input */}
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
                placeholder="Ask ML AI (e.g. 'Suggest adventure trips under ₹25,000') or plan a destination..."
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
