import { cookies } from "next/headers";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const cookieStore = await cookies();
  const authSession = cookieStore.get('auth-session')?.value;
  const isLoggedIn = !!authSession;

  return <NavbarClient isLoggedIn={isLoggedIn} />;
}
