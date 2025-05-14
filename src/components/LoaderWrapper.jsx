import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import styled from "styled-components";

const LoaderWrapper = ({ children }) => {
  const [hideLoader, setHideLoader] = useState(false);
  const [startSlide, setStartSlide] = useState(false);
  const [removeOverlay, setRemoveOverlay] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      // Step 1: Fade out loader
      setHideLoader(true);

      // Step 2: Start slide after fade
      setTimeout(() => {
        setStartSlide(true);
      }, 600); // match fade duration

      // Step 3: Remove overlay after slide
      setTimeout(() => {
        setRemoveOverlay(true);
      }, 1800); // 600 fade + 1200 slide
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <>
      {!removeOverlay && (
        <Overlay slideOut={startSlide}>
          <div className={`loader-container ${hideLoader ? "fade-out" : ""}`}>
            <Loader />
          </div>
        </Overlay>
      )}
      {children}
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: #0e0e0e;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.9s ease;
  transform: ${(props) =>
    props.slideOut ? "translateY(100%)" : "translateY(0)"};

  .loader-container {
    opacity: 1;
    transition: opacity 0.6s ease;
  }

  .loader-container.fade-out {
    opacity: 0;
  }
`;

export default LoaderWrapper;
