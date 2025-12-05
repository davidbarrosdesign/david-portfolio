"use client";

import { useState } from "react";

export function useSpotlightHover() {
  const [hovered, setHovered] = useState<number | null>(null);

  function events(index: number) {
    return {
      onMouseEnter: () => setHovered(index),
      onMouseLeave: () => setHovered(null),
    };
  }

  function animation(index: number) {
    if (hovered === null) return "normal";
    return hovered === index ? "hovered" : "dimmed";
  }

  return { hovered, events, animation };
}
