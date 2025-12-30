"use client";

import { useState, useCallback } from "react";

export function useSpotlightHover() {
  const [hovered, setHovered] = useState<number | null>(null);

  const events = useCallback((index: number) => {
    return {
      onMouseEnter: () => setHovered(index),
      onMouseLeave: () => setHovered(null),
    };
  }, []);

  const animation = useCallback(
    (index: number) => {
      if (hovered === null) return "normal";
      return hovered === index ? "hovered" : "dimmed";
    },
    [hovered]
  );

  const reset = useCallback(() => {
    setHovered(null);
  }, []);

  return { hovered, events, animation, reset };
}
