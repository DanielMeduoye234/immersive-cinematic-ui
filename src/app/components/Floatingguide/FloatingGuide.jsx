"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../Floatingguide/FloatingGuide.module.css";

export default function FloatingGuide() {
  const [open, setOpen] = useState(false);
  const [indicatorVisible, setIndicatorVisible] = useState(true);
  const [typedText, setTypedText] = useState("");

  const fullText =
    "The waterfalls are more than sights—they are nature's heartbeat. Feel the rhythm of flowing water, and let its calm guide your path.";

  // typing animation
  useEffect(() => {
    if (open) {
      let i = 0;
      const totalDuration = 5000; // 5 seconds total typing duration
      const charInterval = totalDuration / fullText.length;

      const interval = setInterval(() => {
        setTypedText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(interval);
      }, charInterval);

      return () => clearInterval(interval);
    } else {
      setTypedText("");
    }
  }, [open]);

  const handleGuideClick = () => {
    setOpen(true);
    setIndicatorVisible(false);
  };

  return (
    <div className={styles.guideWrapper}>
      {/* 🌊 Label indicator */}
      {indicatorVisible && (
        <motion.div
          className={styles.indicator}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.6, 1, 0.8, 1],
            scale: [0.9, 1.05, 1],
            textShadow: [
              "0 0 10px #5bb8ff",
              "0 0 25px #5bb8ff",
              "0 0 10px #5bb8ff",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className={styles.pulseRing}></span>
          Nature Waterfalls 💧
        </motion.div>
      )}

      {/* Floating guide icon */}
      <motion.div
        className={styles.avatar}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        onClick={handleGuideClick}
      >
        <Image
          src="/images/avatar.png" // your guide avatar image
          alt="Nature Waterfall Guide"
          width={60}
          height={60}
          className={styles.avatarImg}
        />
      </motion.div>

      {/* Info Card */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.infoCard}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className={styles.cardHeader}>
              <Image
                src="/images/avatar.png"
                alt="Nature Guide"
                width={80}
                height={80}
                className={styles.cardAvatar}
              />
              <h3 className={styles.name}>The Whispering Stream</h3>
            </div>

            <p className={styles.cardText}>
              {typedText}
              <span className={styles.cursor}>|</span>
            </p>

            <motion.button
              className={styles.ctaBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(false)}
            >
              Continue Journey
            </motion.button>

            <button
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
