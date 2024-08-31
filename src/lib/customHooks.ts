"use client";

import { useState, useEffect } from 'react';

export const useViewportWidth = (): number => {
  const [viewportWidth, setViewportWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setViewportWidth(window.innerWidth);
      };

      handleResize(); // Set initial width

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return viewportWidth;
};
