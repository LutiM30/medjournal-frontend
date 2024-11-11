'use client';
import { useEffect, useState, useCallback } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

/**
 * Custom hook for navigation visibility
 * @returns {Object} Visibility state and handlers
 */
const useNavigationVisibility = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = scrollY.get();

    if (currentScrollY < 10 || currentScrollY < lastScrollY) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    setLastScrollY(currentScrollY);
  }, [scrollY, lastScrollY]);

  useMotionValueEvent(scrollY, 'change', handleScroll);

  useEffect(() => {
    setVisible(true);

    const handleKeyPress = (event) => {
      if (
        event.key === 'n' &&
        event.target.tagName !== 'INPUT' &&
        event.target.tagName !== 'TEXTAREA'
      ) {
        setVisible(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return { visible };
};

export default useNavigationVisibility;
