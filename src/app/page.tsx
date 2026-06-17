import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/home/DashboardClient";

export const dynamic = "force-dynamic";

interface Destination {
  id: string;
  name: string;
  description: string;
  rating: number;
  hero_image_url: string;
  states: { name: string } | null;
}

export default async function Home() {
  let user = null;
  let mockUser = null;

  try {
    const supabase = await createClient();
    const { data: { user: supabaseUser } } = await supabase.auth.getUser();
    user = supabaseUser;
  } catch (error) {
    console.error("Error fetching user on home page:", error);
  }

  if (!user) {
    const cookieStore = await cookies();
    const mockSession = cookieStore.get('auth-session')?.value || cookieStore.get('mock_session')?.value;
    if (mockSession) {
      try {
        mockUser = JSON.parse(mockSession);
      } catch {
        // If it's a plain string like 'google-explorer'
        if (mockSession === 'google-explorer') {
          mockUser = { email: "google-explorer@gmail.com", fullName: "Google Explorer" };
        } else {
          mockUser = { email: "voyager@traverse.ai", fullName: "Voyager" };
        }
      }
    }
  }

  // If the user is not authenticated (real or mock), redirect to Login screen
  if (!user && !mockUser) {
    return redirect("/auth/login");
  }

  const supabase = await createClient();
  let dbDestinations: Destination[] = [];
  try {
    const { data } = await supabase
      .from('destinations')
      .select('id, name, description, rating, hero_image_url, states ( name )')
      .order('rating', { ascending: false })
      .limit(6);
    dbDestinations = (data as unknown as Destination[]) || [];
  } catch (error) {
    console.error("Error fetching destinations for dashboard:", error);
  }

  const userEmail = user?.email || mockUser?.email || "";
  const userFullName = user?.user_metadata?.full_name || user?.user_metadata?.name || mockUser?.fullName || mockUser?.full_name || "Voyager";

  return (
    <DashboardClient 
      userEmail={userEmail}
      userFullName={userFullName}
      destinations={dbDestinations}
    />
  );
}
