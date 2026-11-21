"use client";
import { useEffect, useState } from "react";

// Starts false on server and client so hydration matches; the real value lands right after mount.
export default function useMedia(query) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const m = matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return match;
}
