import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import "./index.css";
import "./styles/tokens.css";
import "./styles/shell.css";
import "./styles/home.css";
import "./styles/pages.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import { IntroProvider } from "./components/shell/IntroContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <IntroProvider>
          <App />
        </IntroProvider>
      </ThemeProvider>
    </MotionConfig>
  </StrictMode>
);
