"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INDIA_STATES, INDIA_UTS, BUDGET_CATEGORIES, TRIP_TYPES } from "@/data/indiaData";
import { Users, Calendar, ArrowLeft, Loader2, Plane, Hotel, Coffee, Search, ShoppingBag, Heart } from "lucide-react";

interface DayPlan { day: number; title: string; description: string; expenses: string; timing: string; }
interface TripResult {
  title: string;
  budget: string;
  destinations: string[];
  days: DayPlan[];
  hotels: Array<{ name: string; rating: number; price: string }>;
  transport: Array<{ mode: string; cost: string }>;
  restaurants: Array<{ name: string; type: string }>;
}

export default function TravelWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tripType: "", state: "", city: "", travelers: 2, days: 3, budget: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<TripResult | null>(null);

  const updateForm = (key: string, value: string | number) => setFormData(prev => ({ ...prev, [key]: value }));
  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const handleGenerate = async () => {
    setIsGenerating(true);
    setStep(6);
    try {
      const prompt = `Plan a ${formData.days}-day ${formData.tripType} to ${formData.city}, ${formData.state} for ${formData.travelers} people on a ${formData.budget} budget. Include hotels, transport, and daily restaurants.`;
      
      const res = await fetch('/api/ai/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, wizardData: formData }),
      });
      
      const data = await res.json();
      setResult(data.itinerary || null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('trip-result-container');
    if (element) {
      const html2pdf = (await import('html2pdf.js')).default;
      html2pdf().from(element).set({
        margin: 1,
        filename: `${formData.city}-Trip-Itinerary.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }).save();
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `My Trip to ${formData.city}`,
        text: `Check out my ${formData.days}-day itinerary to ${formData.city}!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto soft-card p-6 md:p-10 relative overflow-visible mt-8">
      
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-3xl font-black text-organic-black dark:text-organic-white mb-6 text-center">Catalog</h2>
            <div className="relative mb-8 max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search vibes..." className="w-full py-4 pl-12 pr-4 bg-gray-100 dark:bg-white/5 rounded-full outline-none focus:ring-2 focus:ring-organic-green transition-all" />
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {TRIP_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => { updateForm('tripType', type); nextStep(); }}
                  className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${formData.tripType === type ? 'bg-organic-black text-white' : 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300 hover:bg-gray-200'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="flex justify-between items-center mb-8">
              <button onClick={prevStep} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 transition-colors"><ArrowLeft className="w-5 h-5 text-organic-black dark:text-white" /></button>
              <h2 className="text-2xl font-black text-organic-black dark:text-organic-white">Destination</h2>
              <div className="w-10"></div>
            </div>
            <div className="space-y-6 max-w-md mx-auto">
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2 ml-4">Select State / UT</label>
                <select 
                  value={formData.state} 
                  onChange={(e) => updateForm('state', e.target.value)}
                  className="w-full bg-gray-100 dark:bg-white/5 rounded-full p-4 px-6 text-organic-black dark:text-white focus:ring-2 focus:ring-organic-green outline-none font-medium appearance-none cursor-pointer"
                >
                  <option value="">Choose Region...</option>
                  <optgroup label="States">
                    {INDIA_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </optgroup>
                  <optgroup label="Union Territories">
                    {INDIA_UTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </optgroup>
                </select>
              </div>
              {formData.state && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <label className="block text-sm font-bold text-gray-500 mb-2 ml-4">Specific City or Destination</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Jaipur, Manali, Munnar..." 
                    value={formData.city}
                    onChange={(e) => updateForm('city', e.target.value)}
                    className="w-full bg-gray-100 dark:bg-white/5 rounded-full p-4 px-6 text-organic-black dark:text-white focus:ring-2 focus:ring-organic-green outline-none font-medium"
                  />
                </motion.div>
              )}
              <button 
                onClick={nextStep} 
                disabled={!formData.state || !formData.city}
                className="w-full py-4 rounded-full bg-organic-black text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-opacity mt-4"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="flex justify-between items-center mb-8">
              <button onClick={prevStep} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 transition-colors"><ArrowLeft className="w-5 h-5 text-organic-black dark:text-white" /></button>
              <h2 className="text-2xl font-black text-organic-black dark:text-organic-white">When & Who</h2>
              <div className="w-10"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[2rem] text-center border border-gray-100 dark:border-white/5 relative">
                <div className="absolute top-4 right-4 bg-organic-black text-white text-xs font-bold px-2 py-1 rounded-full">-5%</div>
                <Users className="w-8 h-8 text-organic-green mx-auto mb-4" />
                <h3 className="text-lg font-bold text-organic-black dark:text-white mb-6">Travelers</h3>
                <div className="flex items-center justify-center gap-6 bg-white dark:bg-white/10 rounded-full p-2 shadow-sm w-fit mx-auto">
                  <button onClick={() => updateForm('travelers', Math.max(1, formData.travelers - 1))} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 text-organic-black dark:text-white font-medium">-</button>
                  <span className="text-xl font-bold text-organic-black dark:text-white w-6">{formData.travelers}</span>
                  <button onClick={() => updateForm('travelers', formData.travelers + 1)} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 text-organic-black dark:text-white font-medium">+</button>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[2rem] text-center border border-gray-100 dark:border-white/5 relative">
                <div className="absolute top-4 right-4 bg-organic-accent text-white text-xs font-bold px-2 py-1 rounded-full">New</div>
                <Calendar className="w-8 h-8 text-organic-green mx-auto mb-4" />
                <h3 className="text-lg font-bold text-organic-black dark:text-white mb-6">Duration (Days)</h3>
                <div className="flex items-center justify-center gap-6 bg-white dark:bg-white/10 rounded-full p-2 shadow-sm w-fit mx-auto">
                  <button onClick={() => updateForm('days', Math.max(1, formData.days - 1))} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 text-organic-black dark:text-white font-medium">-</button>
                  <span className="text-xl font-bold text-organic-black dark:text-white w-6">{formData.days}</span>
                  <button onClick={() => updateForm('days', Math.max(1, formData.days + 1))} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 text-organic-black dark:text-white font-medium">+</button>
                </div>
              </div>
            </div>
            <button onClick={nextStep} className="w-full max-w-sm mx-auto block mt-8 py-4 rounded-full bg-organic-black text-white font-bold">Continue</button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="flex justify-between items-center mb-8">
              <button onClick={prevStep} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 transition-colors"><ArrowLeft className="w-5 h-5 text-organic-black dark:text-white" /></button>
              <h2 className="text-2xl font-black text-organic-black dark:text-organic-white">Set Budget</h2>
              <div className="w-10"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {BUDGET_CATEGORIES.map(b => (
                <div 
                  key={b.id} 
                  onClick={() => updateForm('budget', b.id)}
                  className={`p-6 rounded-[2rem] cursor-pointer transition-all border-2 relative overflow-hidden ${formData.budget === b.id ? 'border-organic-black bg-gray-50 dark:bg-white/10' : 'border-transparent bg-gray-100 dark:bg-white/5 hover:bg-gray-200'}`}
                >
                  {formData.budget === b.id && <div className="absolute top-4 right-4 w-3 h-3 bg-organic-black rounded-full"></div>}
                  <h3 className="text-xl font-bold text-organic-black dark:text-white mb-2">{b.label}</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">{b.range}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={handleGenerate} 
              disabled={!formData.budget}
              className="w-full max-w-sm mx-auto block mt-8 py-4 rounded-full bg-organic-black text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Shop More
            </button>
          </motion.div>
        )}

        {step === 6 && isGenerating && (
          <motion.div key="generating" className="py-20 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Loader2 className="w-16 h-16 text-organic-green animate-spin mx-auto mb-6" />
            <h2 className="text-3xl font-black text-organic-black dark:text-white mb-2">Curating Space...</h2>
            <p className="text-gray-500 dark:text-gray-300 font-medium">Assembling hotels and experiences in {formData.city}.</p>
          </motion.div>
        )}

        {step === 6 && !isGenerating && result && (
          <motion.div key="result" id="trip-result-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 pb-10">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 text-organic-green font-bold text-sm mb-2 uppercase tracking-widest">
                  <ShoppingBag className="w-4 h-4"/> Exclusive Itinerary
                </div>
                <h1 className="text-4xl font-black text-organic-black dark:text-white mb-2">{result.title}</h1>
                <p className="text-gray-500 font-medium">{formData.city}, {formData.state} • {formData.days} Days • {formData.travelers} Pax</p>
              </div>
              <div className="flex gap-2" data-html2canvas-ignore>
                <button onClick={handleShare} className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 flex items-center justify-center transition-colors"><Heart className="w-5 h-5 text-organic-black dark:text-white" /></button>
                <button onClick={handleDownloadPDF} className="px-6 py-3 bg-organic-black text-white rounded-full text-sm font-bold shadow-lg shadow-black/20">Get PDF</button>
              </div>
            </div>

            {/* Smart Dashboards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[2rem] relative">
                <div className="absolute -top-4 -right-2 w-10 h-10 bg-organic-black text-white rounded-full flex items-center justify-center shadow-lg"><Hotel className="w-4 h-4" /></div>
                <h3 className="text-xl font-bold text-organic-black dark:text-white mb-4">Hotels</h3>
                <div className="space-y-4">
                  {result.hotels?.map((h, i) => (
                    <div key={i} className="flex flex-col border-b border-gray-200 dark:border-white/10 pb-3 last:border-0 last:pb-0">
                      <span className="text-organic-black dark:text-white font-bold">{h.name}</span>
                      <div className="flex justify-between mt-1 text-sm">
                        <span className="text-gray-500 font-medium">★ {h.rating}</span>
                        <span className="text-organic-green font-bold">{h.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[2rem] relative">
                <div className="absolute -top-4 -right-2 w-10 h-10 bg-organic-black text-white rounded-full flex items-center justify-center shadow-lg"><Plane className="w-4 h-4" /></div>
                <h3 className="text-xl font-bold text-organic-black dark:text-white mb-4">Transport</h3>
                <div className="space-y-4">
                  {result.transport?.map((t, i) => (
                    <div key={i} className="flex justify-between items-center text-sm border-b border-gray-200 dark:border-white/10 pb-3 last:border-0 last:pb-0">
                      <span className="text-gray-600 dark:text-gray-300 font-medium">{t.mode}</span>
                      <span className="text-organic-black dark:text-white font-bold">{t.cost}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[2rem] relative">
                <div className="absolute -top-4 -right-2 w-10 h-10 bg-organic-black text-white rounded-full flex items-center justify-center shadow-lg"><Coffee className="w-4 h-4" /></div>
                <h3 className="text-xl font-bold text-organic-black dark:text-white mb-4">Dining</h3>
                <div className="space-y-4">
                  {result.restaurants?.map((r, i) => (
                    <div key={i} className="flex flex-col border-b border-gray-200 dark:border-white/10 pb-3 last:border-0 last:pb-0">
                      <span className="text-organic-black dark:text-white font-bold">{r.name}</span>
                      <span className="text-gray-500 text-sm font-medium mt-1">{r.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Itinerary */}
            <div className="mt-8">
              <h3 className="text-2xl font-black text-organic-black dark:text-white mb-6">Daily Schedule</h3>
              <div className="space-y-6">
                {result.days.map((day, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-white/5 p-6 rounded-[2rem] flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-16 h-16 shrink-0 rounded-full bg-organic-green text-white flex items-center justify-center font-black text-xl shadow-md">
                      D{day.day}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-organic-black dark:text-white text-xl mb-2">{day.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 font-medium mb-4 leading-relaxed">{day.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
                        <span className="bg-white dark:bg-white/10 text-organic-black dark:text-white px-3 py-1.5 rounded-full">{day.timing}</span>
                        <span className="bg-organic-black text-white px-3 py-1.5 rounded-full">{day.expenses}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center pt-8" data-html2canvas-ignore>
              <button onClick={() => setStep(1)} className="text-organic-black dark:text-white font-bold hover:underline">← Shop Another Trip</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
