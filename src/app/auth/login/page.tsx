import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginClient from "./LoginClient";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  let user = null;
  let mockUser = null;

  try {
    const supabase = await createClient();
    const { data: { user: supabaseUser } } = await supabase.auth.getUser();
    user = supabaseUser;
  } catch (error) {
    console.error("Error checking auth on Login Page:", error);
  }

  if (!user) {
    const cookieStore = await cookies();
    const mockSession = cookieStore.get('auth-session')?.value || cookieStore.get('mock_session')?.value;
    if (mockSession) {
      mockUser = true;
    }
  }

  // If already logged in, redirect to Home Dashboard
  if (user || mockUser) {
    return redirect("/");
  }

  return <LoginClient />;
}
