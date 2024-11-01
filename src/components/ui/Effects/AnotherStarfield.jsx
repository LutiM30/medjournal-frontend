'use client';
import React, { useRef, useEffect, useState } from 'react';

const Starfield = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const animationRef = useRef(null);

  const totalObjects = 2500;
  const starSize = 1;
  const glowSize = 4;
  const columns = 30;

  const [glowingStars, setGlowingStars] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    animationRef.current = requestAnimationFrame(draw);

    const glowInterval = setInterval(() => {
      const newGlowingStars = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * totalObjects)
      );
      setGlowingStars(newGlowingStars);
    }, 3000);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
      clearInterval(glowInterval);
    };
  }, []);

  const initStars = () => {
    const canvas = canvasRef.current;
    const gridSize = Math.min(canvas.width, canvas.height) / columns;
    starsRef.current = Array.from(
      { length: totalObjects },
      (_, index) => new Star(canvas, index, gridSize)
    );
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    starsRef.current.forEach((star, index) => {
      star.update(glowingStars.includes(index));
      star.draw(ctx);
    });

    animationRef.current = requestAnimationFrame(draw);
  };

  class Star {
    constructor(canvas, index, gridSize) {
      this.canvas = canvas;
      this.index = index;
      this.x = (index % columns) * gridSize + Math.random() * gridSize;
      this.y =
        Math.floor(index / columns) * gridSize + Math.random() * gridSize;
      this.scale = 1;
      this.isGlowing = false;
      this.glowOpacity = 0;
      this.animationProgress = 0;
    }

    update(shouldGlow) {
      if (shouldGlow && !this.isGlowing) {
        this.isGlowing = true;
        this.animationProgress = 0;
      }

      if (this.isGlowing) {
        this.animationProgress += 0.02; // Adjust for animation speed
        if (this.animationProgress >= 1) {
          this.isGlowing = false;
          this.scale = 1;
          this.glowOpacity = 0;
        } else {
          const t = this.animationProgress;
          this.scale = 1 + Math.sin(t * Math.PI) * 1.5; // Scale animation
          this.glowOpacity = Math.sin(t * Math.PI); // Glow fade in/out
        }
      }
    }

    draw(ctx) {
      ctx.fillStyle = this.isGlowing ? '#fff' : '#666';
      const size = starSize * this.scale;
      ctx.fillRect(this.x - size / 2, this.y - size / 2, size, size);

      if (this.isGlowing) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 255, ${this.glowOpacity * 0.5})`;
        ctx.fill();
      }
    }
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
      }}
    />
  );
};

export default Starfield;
