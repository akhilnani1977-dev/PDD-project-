import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  
  // Delete the auth session cookie
  cookieStore.delete('mock_session');
  cookieStore.delete('auth-session');
  
  return NextResponse.json({ success: true });
}
