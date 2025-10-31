"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./LandingScene.module.css";
import FloatingAvatar from "../Floating/FloatingAvatar";

export default function LandingScene({ onExplore }) {
  return (
    <motion.section
      className={styles.landing}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* 🌿 Alive Background */}
      <motion.div
        className={styles.bg}
        animate={{
          scale: [1, 1.05, 1],
          x: [0, 10, 0],
          y: [0, 10, 0],
          filter: [
            "brightness(0.8) contrast(1)",
            "brightness(1) contrast(1.1)",
            "brightness(0.8) contrast(1)",
          ],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <Image
          src="/images/landing-bg.jpg"
          alt="Landing Background"
          fill
          priority
          sizes="100vw"
          className={styles.bgImage}
        />
      </motion.div>

      {/* 🌿 Centered Cinematic Content */}
      <motion.div
        className={styles.centerContent}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        {/* Floating Logo */}
        <motion.div
          className={styles.logoWrapper}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <Image
            src="/images/logo.png"
            alt="Nature's Code Logo"
            width={160}
            height={160}
            priority
            className={styles.logo}
          />
        </motion.div>

        {/* Cinematic Title */}
        <motion.h1
          className={styles.mainTitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          A TOUR OF <span className={styles.highlight}>NATURE</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.3 }}
        >
          Explore new paths. Discover serenity, energy, and balance — nature’s
          hidden rhythm awaits you.
        </motion.p>

        {/* Explore Button */}
        <motion.button
          className={styles.exploreBtn}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          onClick={onExplore}
        >
          EXPLORE NATURE
        </motion.button>
      </motion.div>

      {/* 🧩 Floating Avatar */}
      <FloatingAvatar />
    </motion.section>
  );
}
