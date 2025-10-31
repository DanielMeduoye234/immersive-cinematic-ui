"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "./components/Loader/Loader";
import LandingScene from "./components/Landingscene/LandingScene";
import HeroScene from "./components/Heroscene/HeroScene";
import WaterfallScene from "./components/Waterfallscene/WaterfallScene";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scene, setScene] = useState("landing");

  // Show loader until assets are ready
  if (!isLoaded) {
    return <Loader onLoaded={() => setIsLoaded(true)} />;
  }

  return (
    <main>
      <AnimatePresence mode="wait">
        {scene === "landing" && (
          <LandingScene
            key="landing"
            onExplore={() => setScene("hero")}
          />
        )}

        {scene === "hero" && (
          <HeroScene
            key="hero"
            onVisit={() => setScene("waterfall")}
            onBack={() => setScene("landing")} // ✅ Works now
          />
        )}

        {scene === "waterfall" && (
          <WaterfallScene
            key="waterfall"
            onBack={() => setScene("hero")}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
