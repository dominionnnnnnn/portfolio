"use client";
import { useReducedMotion } from "framer-motion";

/**
 * The tagline, acted out. A click leaves the browser, passes through the UI and the API,
 * reaches the database, and the answer travels back. Each stop lights up as it is passed.
 * Pure SVG + SMIL, loops every 6s. Reduced motion: the still diagram.
 */
const DUR = "6.4s";
const X = [110, 370, 630, 890];
const Y = 132;

// keyTimes for each stop's glow: forward pass, then the return pass
const GLOW = [
  { kt: "0;0.03;0.05;0.13;0.86;0.9;0.97;1", v: "0;0;1;0;0;1;0;0" }, // browser: click out, answer in
  { kt: "0;0.16;0.18;0.26;0.75;0.77;0.85;1", v: "0;0;1;0;0;1;0;0" }, // ui
  { kt: "0;0.3;0.32;0.4;0.63;0.65;0.73;1", v: "0;0;1;0;0;1;0;0" }, // api
  { kt: "0;0.43;0.45;0.52;0.6;1", v: "0;0;1;1;0;0" }, // database
];

const LABELS = [
  ["click", "Browser"],
  ["render", "Interface"],
  ["POST /api/orders", "API"],
  ["SELECT … FROM orders", "Database"],
];

function Node({ i, still }) {
  const x = X[i];
  return (
    <g transform={`translate(${x} ${Y})`}>
      <rect x="-62" y="-46" width="124" height="92" rx="18" fill="var(--glow)" opacity="0">
        {!still && <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" keyTimes={GLOW[i].kt} values={GLOW[i].v} />}
      </rect>
      <rect x="-52" y="-36" width="104" height="72" rx="14" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
      {i === 0 && (
        <g>
          <line x1="-52" y1="-20" x2="52" y2="-20" stroke="var(--line)" />
          <circle cx="-42" cy="-28" r="2.5" fill="var(--ink-3)" /><circle cx="-34" cy="-28" r="2.5" fill="var(--ink-3)" /><circle cx="-26" cy="-28" r="2.5" fill="var(--ink-3)" />
          <path d="M-6 -6 L14 4 L4 6 L-1 16 Z" fill="var(--ink)" />
        </g>
      )}
      {i === 1 && (
        <g fill="var(--ink-3)">
          <rect x="-38" y="-22" width="44" height="8" rx="4" fill="var(--ink)" />
          <rect x="-38" y="-6" width="76" height="6" rx="3" />
          <rect x="-38" y="6" width="60" height="6" rx="3" />
          <rect x="-38" y="18" width="30" height="8" rx="4" fill="var(--accent)" />
        </g>
      )}
      {i === 2 && (
        <text x="0" y="9" textAnchor="middle" fill="var(--ink)" style={{ font: "500 26px var(--font-mono)" }}>{"{ }"}</text>
      )}
      {i === 3 && (
        <g fill="none" stroke="var(--ink-2)" strokeWidth="2">
          <ellipse cx="0" cy="-16" rx="26" ry="8" />
          <path d="M-26 -16 V16 A26 8 0 0 0 26 16 V-16" />
          <path d="M-26 0 A26 8 0 0 0 26 0" />
        </g>
      )}
      <text y="66" textAnchor="middle" fill="var(--ink)" style={{ font: "600 15px var(--font-body)" }}>{LABELS[i][1]}</text>
      <text y="88" textAnchor="middle" fill="var(--ink-3)" style={{ font: "400 12px var(--font-mono)" }}>{LABELS[i][0]}</text>
    </g>
  );
}

export default function ClickToQuery() {
  const still = !!useReducedMotion();
  const fwd = `M${X[0] + 52} ${Y - 8} H${X[3] - 52}`;
  const back = `M${X[3] - 52} ${Y + 8} H${X[0] + 52}`;
  return (
    <figure className="ctq" aria-label="A click travels from the browser through the interface and API to the database, and the answer comes back.">
      <svg viewBox="0 0 1000 240" role="img" aria-hidden="true">
        <path d={fwd} stroke="var(--line)" strokeWidth="2" strokeDasharray="4 6" fill="none" />
        <path d={back} stroke="var(--line)" strokeWidth="2" strokeDasharray="4 6" fill="none" />
        {X.map((_, i) => <Node key={i} i={i} still={still} />)}
        {!still && (
          <>
            <g>
              <circle r="6" fill="var(--accent)">
                <animateMotion dur={DUR} repeatCount="indefinite" path={fwd} keyPoints="0;0;1;1" keyTimes="0;0.05;0.45;1" calcMode="linear" />
                <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" keyTimes="0;0.04;0.05;0.45;0.47;1" values="0;0;1;1;0;0" />
              </circle>
              <circle r="14" fill="var(--accent)" opacity="0.18">
                <animateMotion dur={DUR} repeatCount="indefinite" path={fwd} keyPoints="0;0;1;1" keyTimes="0;0.05;0.45;1" calcMode="linear" />
                <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" keyTimes="0;0.04;0.05;0.45;0.47;1" values="0;0;0.18;0.18;0;0" />
              </circle>
            </g>
            <g>
              <circle r="6" fill="#8FA6FF">
                <animateMotion dur={DUR} repeatCount="indefinite" path={back} keyPoints="0;0;1;1" keyTimes="0;0.52;0.9;1" calcMode="linear" />
                <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" keyTimes="0;0.51;0.52;0.9;0.92;1" values="0;0;1;1;0;0" />
              </circle>
            </g>
            <text x={X[0]} y={Y - 62} textAnchor="middle" fill="var(--accent)" opacity="0" style={{ font: "500 13px var(--font-mono)" }}>
              ✓ 200 OK
              <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" keyTimes="0;0.89;0.91;0.99;1" values="0;0;1;1;0" />
            </text>
          </>
        )}
      </svg>
      <figcaption className="t-meta">From first click to final query, and back.</figcaption>
    </figure>
  );
}
