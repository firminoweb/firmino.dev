"use client";

import { useState, useEffect } from "react";

export function useScrolled(offset = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > offset);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [offset]);

  return scrolled;
}
