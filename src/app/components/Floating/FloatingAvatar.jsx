"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import useSound from "use-sound";
import { useEffect, useState } from "react";
import styles from "./FloatingAvatar.module.css";

export default function FloatingAvatar() {
  const [open, setOpen] = useState(false);
  const [indicatorVisible, setIndicatorVisible] = useState(true);
  const [typedText, setTypedText] = useState("");

  const fullText =
    'Hi, Looking forward to working at Out of the Box Systems. Kindly explore nature with me — please click on "Explore Nature Now".';

  // 🎧 load typing sound (must be exactly 6s long)
  const [playTyping, { stop }] = useSound("/sounds/type.mp3", { volume: 0.4 });

  // 🧠 typing animation synced with 6s sound
  useEffect(() => {
    if (open) {
      let i = 0;
      const totalDuration = 6000; // 6 seconds total
      const charInterval = totalDuration / fullText.length; // auto speed per character

      playTyping(); // start sound

      const interval = setInterval(() => {
        setTypedText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(interval);
          stop(); // stop sound when done typing
        }
      }, charInterval);

      return () => {
        clearInterval(interval);
        stop();
      };
    } else {
      setTypedText("");
      stop();
    }
  }, [open, playTyping, stop]);

  // 💡 When avatar clicked, hide indicator permanently
  const handleAvatarClick = () => {
    setOpen(true);
    setIndicatorVisible(false);
  };

  return (
    <div className={styles.avatarWrapper}>
      {/* 🌟 Glowing Indicator (stays until clicked) */}
      {indicatorVisible && (
        <motion.div
          className={styles.indicator}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.6, 1, 0.8, 1],
            scale: [0.9, 1.05, 1],
            textShadow: [
              "0 0 10px #7bce7a",
              "0 0 25px #7bce7a",
              "0 0 10px #7bce7a",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className={styles.pulseRing}></span>
          Hear Me Out 👇
        </motion.div>
      )}

      {/* 🪄 Floating Avatar Icon */}
      <motion.div
        className={styles.avatar}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        onClick={handleAvatarClick}
      >
        <Image
          src="/images/avatar.png"
          alt="Daniel Meduoye"
          width={60}
          height={60}
          className={styles.avatarImg}
        />
      </motion.div>

      {/* 💬 Glassy Info Card */}
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
                alt="Daniel Meduoye"
                width={80}
                height={80}
                className={styles.cardAvatar}
              />
              <h3 className={styles.name}>Daniel Meduoye</h3>
            </div>

            {/* ✍️ Typing Message */}
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
              Explore Nature Now
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
