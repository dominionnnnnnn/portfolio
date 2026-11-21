"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { makeCardFaces } from "./cardFaces";

// three.js only loads on the About page, after the page itself is interactive.
const Lanyard = dynamic(() => import("./Lanyard"), { ssr: false });

export default function AboutLanyard({ onReady }) {
  const [faces, setFaces] = useState(null);
  useEffect(() => {
    let live = true;
    makeCardFaces().then((f) => { if (live) { setFaces(f); onReady?.(); } });
    return () => { live = false; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="about-lanyard" aria-hidden="true">
      {faces && (
        <Lanyard
          frontImage={faces.front}
          backImage={faces.back}
          strapImage={faces.strap}
          imageFit="cover"
          cardColor="#0D121E"
          orientation="portrait"
          finish="glossy"
          cornerRadius={0.28}
          size={0.56}
          anchor="center"
          strapLength={0.34}
          strapColor="#0C0F18"
          strapWidth={0.7}
          metal="graphite"
          gravity={1}
          damping={0.5}
          elasticity={0.5}
          breeze={0.35}
          interactive
          intro
        />
      )}
      <p className="about-lanyard-hint t-meta">Drag it · Click to flip</p>
    </div>
  );
}
