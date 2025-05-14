import React, { useEffect, useState } from "react";
import Loader from "./Loader"; // adjust path as needed
import styled from "styled-components";

const LoaderWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setFadeOut(true); // begin fade-out
      setTimeout(() => setLoading(false), 500); // remove from DOM after fade
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
      {loading && (
        <LoaderOverlay fadeOut={fadeOut}>
          <Loader />
        </LoaderOverlay>
      )}
      {children}
    </>
  );
};

const LoaderOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: #212121;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.fadeOut ? 0 : 1)};
  transition: opacity 0.5s ease;
  pointer-events: none;
`;

export default LoaderWrapper;
