"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";

interface SplashScreenProps {
  message?: string;
}

export default function SplashScreen({ message = "Preparing your travel OS..." }: SplashScreenProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-organic-light dark:bg-organic-green-dark">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        <div className="relative flex items-center justify-center mb-6">
          {/* Animated Background Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 rounded-full border-4 border-organic-green/20 border-t-organic-green"
          />
          {/* Compass Icon */}
          <div className="absolute w-16 h-16 bg-organic-black rounded-full flex items-center justify-center shadow-lg">
            <Compass className="w-8 h-8 text-white animate-pulse" />
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl font-black text-organic-black dark:text-white mb-2"
        >
          Traverse
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-sm font-semibold text-gray-500 dark:text-gray-400"
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  );
}
