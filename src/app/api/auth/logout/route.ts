import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  
  // Delete the auth session cookie
  cookieStore.delete('auth-session');
  
  return NextResponse.json({ success: true });
}
