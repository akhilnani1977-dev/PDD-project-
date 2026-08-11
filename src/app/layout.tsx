import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarClient from "@/components/layout/NavbarClient";
import MobileNav from "@/components/layout/MobileNav";
import SmartSearchModal from "@/components/shared/SmartSearchModal";
import ToastContainer from "@/components/shared/ToastContainer";

export const dynamic = "force-dynamic";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TRAVERSE — Premium India Travel Discovery & AI Trip Planner",
  description: "Discover extraordinary Indian places, build smarter itineraries, and explore India with Traverse.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Traverse",
  },
};

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col pb-16 md:pb-0`}>
        <NavbarClient />
        <main className="flex-1 flex flex-col relative w-full">
          {children}
        </main>
        <MobileNav />
        <SmartSearchModal />
        <ToastContainer />
      </body>
    </html>
  );
}
