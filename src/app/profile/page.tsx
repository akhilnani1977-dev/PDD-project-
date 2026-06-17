import { User, Map, Heart, LogOut } from "lucide-react";
import Link from "next/link";
import { signout } from "../auth/actions";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  let email = "";
  let fullName = "";

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      email = user.email || "";
      fullName = user.user_metadata?.full_name || user.user_metadata?.name || email.split("@")[0] || "Voyager";
    } else {
      const cookieStore = await cookies();
      const mockSession = cookieStore.get('auth-session')?.value || cookieStore.get('mock_session')?.value;
      if (mockSession) {
        try {
          const parsed = JSON.parse(mockSession);
          email = parsed.email || "voyager@traverse.ai";
          fullName = parsed.fullName || parsed.full_name || "Voyager";
        } catch {
          email = "voyager@traverse.ai";
          fullName = mockSession === "google-explorer" ? "Google Explorer" : "Voyager";
        }
      } else {
        return redirect("/auth/login");
      }
    }
  } catch (error) {
    console.error("Profile page load error:", error);
    return redirect("/auth/login");
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-8 max-w-7xl mx-auto relative bg-organic-light dark:bg-organic-green-dark">

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-white/10">
            <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <User className="w-10 h-10 text-organic-black dark:text-white" />
            </div>
            <h2 className="text-2xl font-black text-organic-black dark:text-white mb-1">{fullName}</h2>
            <p className="text-gray-500 font-medium mb-8">{email}</p>
            
            <form action={signout}>
              <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-gray-100 dark:bg-white/10 text-organic-black dark:text-white font-bold hover:bg-gray-200 transition-colors">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </form>
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-2/3 space-y-8">
          
          <section>
            <h3 className="text-2xl font-black text-organic-black dark:text-white mb-6 flex items-center gap-2">
              <Map className="w-6 h-6 text-organic-green" /> Saved Trips
            </h3>
            <div className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-white/10 flex flex-col items-center justify-center text-center min-h-[200px]">
              <Map className="w-12 h-12 text-gray-300 dark:text-white/20 mb-4" />
              <p className="text-gray-500 font-medium">You haven&apos;t saved any generated trips yet.</p>
              <Link href="/" className="text-organic-black dark:text-white font-bold hover:underline mt-4">Plan your first trip</Link>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-black text-organic-black dark:text-white mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-organic-accent" /> Favorites
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-white/5 p-6 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-white/10 relative overflow-hidden group">
                <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center z-10 shadow-sm">
                  <Heart className="w-4 h-4 text-organic-accent fill-organic-accent" />
                </div>
                <div className="w-full h-40 bg-gray-100 dark:bg-white/10 rounded-[1.5rem] mb-6 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{backgroundImage: "url('/images/ladakh.png')"}}></div>
                <h4 className="text-xl font-bold text-organic-black dark:text-white mb-1">Ladakh</h4>
                <p className="text-sm text-gray-500 font-medium mb-4">Jammu & Kashmir</p>
                <Link href="/?prompt=Plan+a+trip+to+Ladakh" className="inline-block px-5 py-2.5 rounded-full bg-organic-black text-white text-sm font-bold">Plan Trip</Link>
              </div>
              <div className="bg-white dark:bg-white/5 p-6 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-white/10 relative overflow-hidden group">
                <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center z-10 shadow-sm">
                  <Heart className="w-4 h-4 text-organic-accent fill-organic-accent" />
                </div>
                <div className="w-full h-40 bg-gray-100 dark:bg-white/10 rounded-[1.5rem] mb-6 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{backgroundImage: "url('/images/kerala.png')"}}></div>
                <h4 className="text-xl font-bold text-organic-black dark:text-white mb-1">Kerala Backwaters</h4>
                <p className="text-sm text-gray-500 font-medium mb-4">Kerala</p>
                <Link href="/?prompt=Plan+a+trip+to+Kerala" className="inline-block px-5 py-2.5 rounded-full bg-organic-black text-white text-sm font-bold">Plan Trip</Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
