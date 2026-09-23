"use client";

import { motion } from "framer-motion";

export function JarvisIcon({ onClick, ariaLabel }: { onClick: () => void; ariaLabel?: string }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={ariaLabel || "Open FSP chat"}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-lg hover:bg-ink transition-colors focus:outline-none focus:ring-2 focus:ring-orange"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </motion.button>
  );
}
