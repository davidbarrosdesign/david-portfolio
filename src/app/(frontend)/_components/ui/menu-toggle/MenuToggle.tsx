"use client";

import { motion } from "framer-motion";

export function MenuToggle({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={open ? "open" : "closed"}
      initial={"closed"}
      variants={{
        closed: {
          rotate: 0,
          scale: 1,
        },
        open: {
          rotate: 90,
          scale: 1,
        },
      }}
      transition={{
        rotate: {
          type: "spring",
          stiffness: 300,
          damping: 18,
        },
        scale: {
          type: "spring",
          stiffness: 500,
          damping: 18,
        },
      }}
      style={{
        originX: 0.5,
        originY: 0.5,
      }}
    >
      {/* SPLASH (leve expansão) */}
      <motion.g
        variants={{
          closed: { scale: 1 },
          open: { scale: 1.15 },
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 16,
          mass: 0.25,
        }}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        {/* Path 1 */}
        <motion.path
          variants={{
            closed: { d: "M12 5 L12 19" },    // linha vertical
            open: { d: "M5 5 L19 19" },       // diagonal \
          }}
          transition={{
            duration: 0.22,
            ease: "easeInOut",
          }}
        />

        {/* Path 2 */}
        <motion.path
          variants={{
            closed: { d: "M5 12 L19 12" },    // linha horizontal
            open: { d: "M5 19 L19 5" },       // diagonal /
          }}
          transition={{
            duration: 0.22,
            ease: "easeInOut",
          }}
        />
      </motion.g>
    </motion.svg>
  );
}
