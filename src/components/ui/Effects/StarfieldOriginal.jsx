"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAnimationControls } from "framer-motion";

const Starfield = () => {
  const [stars, setStars] = useState(2500); // Total number of stars
  const [glowingStars, setGlowingStars] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [starPositions, setStarPositions] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const glowInterval = setInterval(() => {
      const newGlowingStars = Array.from({ length: 25 }, () =>
        Math.floor(Math.random() * stars)
      );
      setGlowingStars(newGlowingStars);
    }, 3000);

    return () => clearInterval(glowInterval);
  }, [stars]);

  useEffect(() => {
    const positions = Array.from({ length: stars }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
    }));
    setStarPositions(positions);
  }, [stars, dimensions]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#0f172a",
        overflow: "hidden",
      }}
    >
      {starPositions.map(({ x, y }, starIdx) => {
        const isGlowing = glowingStars.includes(starIdx);
        const delay = (starIdx % 10) * 0.1;

        return (
          <div
            key={`star-${starIdx}`}
            className="absolute"
            style={{
              left: `${x}px`,
              top: `${y}px`,
            }}
          >
            <Star
              isGlowing={isGlowing}
              delay={delay}
              width={dimensions.width}
              x={x}
              y={y}
            />

            <AnimatePresence mode="wait">
              {isGlowing && <Glow delay={delay} />}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

const Star = ({ isGlowing, delay, width, x, y }) => {
  const controls = useAnimationControls();
  useEffect(() => {
    controls.start({
      x: [x, x + 50, x],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        delay,
      },
    });
  }, [controls, width, delay, x]);
  return (
    <motion.div
      key={delay}
      initial={{
        scale: 1,
      }}
      animate={{
        scale: isGlowing ? [1, 1.2, 2.2, 2.5, 3] : 1,
        background: isGlowing ? "#fff" : "#666",
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      className={cn("bg-[#666] h-[2px] w-[2px] rounded-full relative z-20")}
    ></motion.div>
  );
};

const Glow = ({ delay }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      exit={{
        opacity: 0,
      }}
      className="absolute left-1/2 -translate-x-1/2 z-10 h-[6px] w-[6px] rounded-full bg-blue-500 blur-[1px] shadow-2xl shadow-blue-400"
    />
  );
};

export default Starfield;
