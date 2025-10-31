"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, X } from "lucide-react";
import { useEffect, useState } from "react";
import FloatingGuide from "../Floatingguide/FloatingGuide";
import styles from "./HeroScene.module.css";

export default function HeroScene({ onVisit, onBack }) {
  const fullText = "WHERE NATURE SHOWCASES BEAUTY";
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ menu state

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => setIsTypingDone(true), 800);
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  return (
    <motion.section
      className={styles.hero}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* 🎥 Alive Background */}
      <motion.video
        className={styles.videoBg}
        autoPlay
        loop
        muted
        playsInline
        animate={{
          scale: [1, 1.07, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
          filter: [
            "brightness(0.8) contrast(1.1) saturate(1.05)",
            "brightness(1) contrast(1.2) saturate(1.15)",
            "brightness(0.8) contrast(1.1) saturate(1.05)",
          ],
        }}
        transition={{
          duration: 14,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <source src="/videos/bg-hero.mp4" type="video/mp4" />
      </motion.video>

      {/* 🌫️ Overlay */}
      <motion.div
        className={styles.overlay}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className={styles.grain}></div>

      {/* 🟢 Back Icon */}
      <motion.div
        className={styles.backIcon}
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        onClick={onBack}
        title="Back to Start"
      >
        <ArrowLeft size={28} strokeWidth={2.5} />
      </motion.div>

      {/* 🧭 Top Bar */}
      <div className={styles.topBar}>
        <Image
          src="/images/logo.png"
          alt="Nature's Code Logo"
          width={90}
          height={90}
          className={styles.logo}
        />
        <div
          className={`${styles.hamburger} ${
            menuOpen ? styles.hamburgerActive : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* 📜 Cinematic Text */}
      <motion.div
        className={styles.textContent}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, delay: 0.4, ease: "easeOut" }}
      >
        <h1 className={styles.title}>
          {displayedText}
          {!isTypingDone && <span className={styles.cursor}>|</span>}
        </h1>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2 }}
        >
          A cinematic journey through Earth’s living canvas — where serenity and
          adventure collide.
        </motion.p>

        <motion.button
          className={styles.visitBtn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onVisit}
        >
          Visit Waterfall
        </motion.button>
      </motion.div>

      {/* 🧩 Floating Guide */}
      <FloatingGuide />

      {/* 🧊 Futuristic Glass Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.menuOverlay}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.div
              className={styles.menuCard}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <button
                className={styles.closeMenu}
                onClick={() => setMenuOpen(false)}
              >
                <X size={26} />
              </button>
              <h3 className={styles.menuTitle}>Explore Nature</h3>
              <ul className={styles.menuList}>
                <li>🏕 Home Sanctuary</li>
                <li>🌿 Discover Waterfalls</li>
                <li>🔥 Campfire Trails</li>
                <li>🦋 Nature Documentary</li>
                <li>📷 Gallery</li>
              </ul>
              <motion.button
                className={styles.menuBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMenuOpen(false)}
              >
                Start Journey
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
