import { User, Globe, Moon, Shield, ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto relative transition-colors duration-300">
      
      {/* Back Button */}
      <Link href="/" className="btn-tertiary px-0 mb-6 inline-flex">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="mb-10">
        <h1 className="display-title mb-2">Settings</h1>
        <p className="body-text">Configure your travel preferences, profile details, and system theme.</p>
      </div>

      <div className="soft-card p-0 divide-y divide-gray-100 dark:divide-white/5 overflow-hidden">
        
        {/* Profile Settings Link */}
        <Link href="/profile" className="flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 rounded-full flex items-center justify-center shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-organic-black dark:text-white">Profile & Passport Details</h3>
              <p className="body-text text-xs">Update your name, email address, and avatar image.</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-organic-black dark:group-hover:text-white transition-colors" />
        </Link>

        {/* Travel Preferences */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 rounded-full flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-organic-black dark:text-white">AI Travel Preferences</h3>
              <p className="body-text text-xs">Default constraints applied during itinerary generation.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:ml-16">
            <div>
              <label className="caption-text block mb-2">Default Budget</label>
              <select className="input-standard w-full">
                <option>Standard (Mid-range)</option>
                <option>Budget (Economic)</option>
                <option>Premium (Luxury)</option>
              </select>
            </div>
            <div>
              <label className="caption-text block mb-2">Travel Mode</label>
              <select className="input-standard w-full">
                <option>Couples / Solo</option>
                <option>Family Friendly</option>
                <option>Adventure / Trekking</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Theme */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400 rounded-full flex items-center justify-center shrink-0">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-organic-black dark:text-white">Theme & Appearance</h3>
                <p className="body-text text-xs">Light/Dark mode toggle is accessible directly from the top navigation bar.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400 rounded-full flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-organic-black dark:text-white">Security & Encryption</h3>
              <p className="body-text text-xs">Sessions and API connections are encrypted via Supabase SSR & HTTP-only cookies.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
