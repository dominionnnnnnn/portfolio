import { createContext, useCallback, useContext, useState } from "react";

const IntroContext = createContext({ loading: false, finish: () => {}, replay: () => {} });
export const useIntro = () => useContext(IntroContext);

const KEY = "aa-intro";

const shouldPlay = () => {
  try {
    if (new URLSearchParams(location.search).get("intro") === "0") return false;
    return sessionStorage.getItem(KEY) !== "1";
  } catch {
    return true;
  }
};

export function IntroProvider({ children }) {
  const [loading, setLoading] = useState(shouldPlay);
  const [run, setRun] = useState(0); // bumps on replay so the loader remounts

  const finish = useCallback(() => {
    try { sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    setLoading(false);
  }, []);

  const replay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setRun((r) => r + 1);
    setLoading(true);
  }, []);

  return <IntroContext.Provider value={{ loading, run, finish, replay }}>{children}</IntroContext.Provider>;
}
