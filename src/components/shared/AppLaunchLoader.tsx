"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen from "./SplashScreen";

export default function AppLaunchLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show the app launch loader once per browser session
    const hasLoaded = sessionStorage.getItem("app-launched");
    if (!hasLoaded) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("app-launched", "true");
      }, 1500); // Show for 1.5 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="launch-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999]"
        >
          <SplashScreen message="Initializing Traverse Travel OS..." />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
