import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('mock_session');
  cookieStore.delete('auth-session');
  return NextResponse.json({ success: true });
}

export async function GET(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete('mock_session');
  cookieStore.delete('auth-session');
  return NextResponse.redirect(new URL('/auth/login', request.url));
}

