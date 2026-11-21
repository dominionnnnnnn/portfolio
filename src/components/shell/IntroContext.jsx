"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const IntroContext = createContext({ loading: false, finish: () => {}, replay: () => {} });
export const useIntro = () => useContext(IntroContext);

export const INTRO_KEY = "aa-intro";

const shouldPlay = () => {
  try {
    if (new URLSearchParams(location.search).get("intro") === "0") return false;
    return sessionStorage.getItem(INTRO_KEY) !== "1";
  } catch {
    return true;
  }
};

// Starts as "loading" on the server and the client so hydration matches.
// A tiny inline script in the layout marks <html data-intro="skip"> for repeat
// visits, which hides the overlay with CSS before React even runs.
export function IntroProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [run, setRun] = useState(0); // bumps on replay so the loader remounts

  useEffect(() => {
    if (!shouldPlay()) setLoading(false);
  }, []);

  const finish = useCallback(() => {
    try { sessionStorage.setItem(INTRO_KEY, "1"); } catch { /* ignore */ }
    document.documentElement.dataset.intro = "done";
    setLoading(false);
  }, []);

  const replay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.documentElement.dataset.intro = "play";
    setRun((r) => r + 1);
    setLoading(true);
  }, []);

  return <IntroContext.Provider value={{ loading, run, finish, replay }}>{children}</IntroContext.Provider>;
}
