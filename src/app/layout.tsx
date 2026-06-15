import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TRAVERSE | Futuristic AI Travel",
  description: "An AI-powered futuristic travel ecosystem with ultra-modern 3D UI.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Traverse",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
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
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} antialiased bg-traverse-midnight text-traverse-frost min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 flex flex-col relative w-full h-full">
          {children}
        </main>
      </body>
    </html>
  );
}
