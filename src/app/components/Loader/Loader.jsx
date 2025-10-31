"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../Loader/Loader.module.css";

export default function Loader({ onLoaded }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((old) => {
        if (old < 100) return old + 1;
        clearInterval(interval);
        setTimeout(() => onLoaded(), 500);
        return 100;
      });
    }, 20); // 0 → 100 in ~2s
  }, [onLoaded]);

  return (
    <motion.div
      className={styles.loader}
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className={styles.progressContainer}>
        <motion.div
          className={styles.bar}
          style={{ width: `${progress}%` }}
          animate={{ backgroundColor: "#5b8c5a" }}
        />
        <p className={styles.text}>{progress}%</p>
      </div>
    </motion.div>
  );
}
