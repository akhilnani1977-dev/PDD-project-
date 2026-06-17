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

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import AppLaunchLoader from "@/components/shared/AppLaunchLoader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AppLaunchLoader />
          <Navbar />
          <main className="flex-1 flex flex-col relative w-full h-full">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
