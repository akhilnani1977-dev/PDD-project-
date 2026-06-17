import { User, Globe, Moon, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-8 max-w-3xl mx-auto relative bg-organic-light dark:bg-organic-green-dark">
      
      {/* Back button */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-organic-black dark:text-gray-300 dark:hover:text-white font-bold mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-organic-black dark:text-white mb-2">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Manage your travel preferences, profile settings, and system interface.</p>
      </div>

      <div className="bg-white dark:bg-white/5 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-white/10 overflow-hidden divide-y divide-gray-100 dark:divide-white/5">
        
        {/* Profile Settings */}
        <Link href="/profile" className="flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-organic-green/10 text-organic-green rounded-full flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-organic-black dark:text-white">Profile Details</h3>
              <p className="text-xs text-gray-400 font-medium">Update your name, email address, and avatar.</p>
            </div>
          </div>
          <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:text-organic-black dark:group-hover:text-white rotate-180 transition-colors" />
        </Link>

        {/* Travel Preferences */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-organic-accent/10 text-organic-accent rounded-full flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-organic-black dark:text-white">Travel Habits</h3>
              <p className="text-xs text-gray-400 font-medium">Set default settings for your AI Planner.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-16">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Default Budget</label>
              <select className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-full p-3 px-4 text-sm font-semibold text-organic-black dark:text-white focus:outline-none">
                <option>Standard (Mid-range)</option>
                <option>Budget (Economic)</option>
                <option>Premium (Luxury)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Travel Mode</label>
              <select className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-full p-3 px-4 text-sm font-semibold text-organic-black dark:text-white focus:outline-none">
                <option>Couples / Solo</option>
                <option>Family Friendly</option>
                <option>Adventure / Trekking</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center">
                <Moon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-organic-black dark:text-white">Dark Mode</h3>
                <p className="text-xs text-gray-400 font-medium">Sync with system theme preference.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-organic-green"></div>
            </label>
          </div>
        </div>

        {/* Security & Access */}
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-organic-black dark:text-white">Security & API Keys</h3>
              <p className="text-xs text-gray-400 font-medium">Your connection to Supabase and API providers is fully encrypted.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
