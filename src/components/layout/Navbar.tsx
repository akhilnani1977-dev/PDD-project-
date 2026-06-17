import { cookies } from "next/headers";
import NavbarClient from "./NavbarClient";
import { createClient } from "@/utils/supabase/server";

export default async function Navbar() {
  let isLoggedIn = false;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      isLoggedIn = true;
    }
  } catch (error) {
    console.error("Error fetching user in Navbar server component:", error);
  }

  if (!isLoggedIn) {
    const cookieStore = await cookies();
    const authSession = cookieStore.get('mock_session')?.value || cookieStore.get('auth-session')?.value;
    isLoggedIn = !!authSession;
  }

  return <NavbarClient isLoggedIn={isLoggedIn} />;
}
