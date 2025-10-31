"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "../Waterfallscene/WaterfallScene.module.css";

export default function WaterfallScene({ onBack, onHome }) {
  const title = "THE HEART OF THE FALLS";
  const [isMounted, setIsMounted] = useState(false);
  const [showHireMe, setShowHireMe] = useState(false);
  const [response, setResponse] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const waterfallAudioRef = useRef(null);
  const sereneAudioRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);

    // 🎧 Prepare both sounds
    const waterfall = new Audio("/sounds/waterfall.wav");
    const serene = new Audio("/sounds/serene-bg.mp3");

    waterfall.loop = true;
    serene.loop = true;
    waterfall.volume = 0;
    serene.volume = 0;

    waterfallAudioRef.current = waterfall;
    sereneAudioRef.current = serene;

    // 🔊 Try to start immediately
    const startBoth = async () => {
      try {
        await waterfall.play();
        await serene.play();

        // Fade-in both sounds smoothly
        const start = Date.now();
        const fadeIn = setInterval(() => {
          const elapsed = Date.now() - start;
          const t = Math.min(1, elapsed / 1800);
          waterfall.volume = 0.45 * t;
          serene.volume = 0.25 * t;
          if (t >= 1) clearInterval(fadeIn);
        }, 60);
        setAudioPlaying(true);
      } catch {
        // 📱 Autoplay blocked on mobile → unlock on first user interaction
        const unlock = () => {
          waterfall.play().catch(() => {});
          serene.play().catch(() => {});
          document.removeEventListener("click", unlock);
        };
        document.addEventListener("click", unlock, { once: true });
      }
    };

    startBoth();

    // 🔇 Clean fade-out when leaving scene
    return () => {
      const fadeOut = (audio, dur = 800) => {
        if (!audio) return;
        const start = Date.now();
        const fade = setInterval(() => {
          const t = Math.min(1, (Date.now() - start) / dur);
          audio.volume = audio.volume * (1 - t);
          if (t >= 1) {
            audio.pause();
            clearInterval(fade);
          }
        }, 60);
      };
      fadeOut(waterfall);
      fadeOut(serene);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <motion.section
      className={styles.waterfall}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      {/* 🎥 Background video */}
      <motion.video
        className={styles.videoBg}
        autoPlay
        loop
        muted
        playsInline
        animate={{
          scale: [1, 1.03, 1],
          x: [0, 8, 0],
          filter: [
            "brightness(0.9) contrast(1.05) saturate(1.05)",
            "brightness(1) contrast(1.12) saturate(1.1)",
            "brightness(0.9) contrast(1.05) saturate(1.05)",
          ],
        }}
        transition={{
          duration: 16,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <source src="/videos/bg-waterfall.mp4" type="video/mp4" />
      </motion.video>

      {/* Mist & overlays */}
      <div className={styles.mistLayer} />
      <div className={styles.mistLayer2} />
      <div className={styles.grain} />
      <div className={styles.particles} />

      {/* 🔙 Back Icon */}
      <motion.div
        className={styles.backIcon}
        onClick={onBack}
        whileHover={{ scale: 1.05 }}
        title="Back"
      >
        <ArrowLeft size={28} strokeWidth={2.4} />
      </motion.div>

      {/* 🌊 Cinematic Title and Text */}
      <div className={styles.centerWrap}>
        <motion.h1
          className={styles.mainTitle}
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2 }}
        >
          <span className={styles.titleStroke}>{title}</span>
          <span className={styles.shine} />
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.9 }}
        >
          Lose yourself in the rhythm of nature’s heartbeat — where every drop
          carries a story.
        </motion.p>

        <motion.button
          className={styles.cta}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          whileHover={{ scale: 1.04 }}
          onClick={() => setShowHireMe(true)}
        >
          Feel the Calm
        </motion.button>
      </div>

      {/* 🧘 Floating Nature Guide */}
      <FloatingNature />

      {/* 💼 Hire Me Modal */}
      <AnimatePresence>
        {showHireMe && (
          <motion.div
            className={styles.hireOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className={styles.hireCard}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {response === null && (
                <>
                  <h2>“Out of the Box Systems”</h2>
                  <p>Will you hire me?</p>
                  <div className={styles.hireActions}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setResponse("yes")}
                      className={styles.yesBtn}
                    >
                      Yes 😊
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setResponse("no")}
                      className={styles.noBtn}
                    >
                      No 😞
                    </motion.button>
                  </div>
                </>
              )}

              {response === "yes" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className={styles.responseMsg}
                >
                  <Image
                    src="/images/smiley.png"
                    alt="Happy"
                    width={80}
                    height={80}
                  />
                  <p>Thank you 😊 I’ll make you proud!</p>
                </motion.div>
              )}

              {response === "no" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className={styles.responseMsg}
                >
                  <Image
                    src="/images/sad.png"
                    alt="Sad"
                    width={80}
                    height={80}
                  />
                  <p>Oh no 😢 maybe next time.</p>
                </motion.div>
              )}

              {(response === "yes" || response === "no") && (
                <motion.button
                  className={styles.closeBtn}
                  onClick={() => setShowHireMe(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  Close
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

/* 🌿 Floating Nature component */
function FloatingNature() {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const full =
    "Listen closely — the falls breathe stories. Pause, breathe, and feel.";

  useEffect(() => {
    if (!open) {
      setTyped("");
      return;
    }
    let i = 0;
    const total = 4200;
    const interval = Math.max(25, Math.floor(total / full.length));
    const t = setInterval(() => {
      setTyped(full.slice(0, i));
      i++;
      if (i > full.length) clearInterval(t);
    }, interval);
    return () => clearInterval(t);
  }, [open]);

  return (
    <div className={styles.floatingNatureWrapper}>
      {!open && (
        <motion.div
          className={styles.natureIndicator}
          animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.9] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          Nature Waterfalls
        </motion.div>
      )}

      <motion.div
        className={styles.natureAvatar}
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.06 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/images/avatar.png" alt="Water Guide" width={64} height={64} />
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.natureCard}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.45 }}
          >
            <div className={styles.natureHeader}>
              <Image
                src="/images/avatar.png"
                alt="Water Guide"
                width={72}
                height={72}
                className={styles.natureCardAvatar}
              />
              <h4 className={styles.natureName}>The Water Whisperer</h4>
            </div>

            <p className={styles.natureText}>
              {typed}
              <span className={styles.cursor}>|</span>
            </p>

            <button className={styles.natureBtn} onClick={() => setOpen(false)}>
              Continue
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
