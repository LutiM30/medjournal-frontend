"use client";
import React from "react";
import { motion } from "framer-motion";
import { ASTRONAUT_IMAGE } from "@/lib/utils";

const FloatingDiv = ({ delay, children }) => {
  return (
    <motion.div
      style={{
        width: 550,
        height: 550,
        borderRadius: 8,
        margin: 10,

        cursor: "pointer",
      }}
      animate={["initial"]}
      variants={{
        rotate: {
          rotate: [null, -5, 5, 0],
          transition: {
            // delay,
            duration: 10,
            // repeat: Infinity,
            // repeatDelay: 0.2,
            // repeatType: "reverse"
          },
        },
        initial: {
          y: [-20, 20],
          rotate: 0,
          transition: {
            delay,
            duration: 2,
            repeat: Infinity,
            // repeatDelay: 0.2,
            repeatType: "reverse",
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingDiv;
