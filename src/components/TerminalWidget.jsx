import React, { useState, useEffect, useRef } from "react";

const JSON_LINES = [
  { type: "brace",    text: "{" },
  { type: "line",     key: "name",          value: '"Dominion"',              comma: true  },
  { type: "line",     key: "role",          value: '"Senior Fullstack Engineer"', comma: true },
  { type: "array",    key: "stack",         items: ["React", "Django", "GraphQL", "Supabase"], comma: true },
  { type: "line",     key: "based_in",      value: '"Nigeria"',               comma: true  },
  { type: "line",     key: "currently",     value: '"Open to new opportunities"', comma: true },
  { type: "line",     key: "available_for", value: '"Remote work worldwide"', comma: false },
  { type: "brace",    text: "}" },
];

const KEY_COLOR   = "var(--accent)";
const STR_COLOR   = "var(--terminal-string)";
const BRACE_COLOR = "var(--text-muted)";
const COMMA_COLOR = "var(--text-muted)";

const TYPING_SPEED  = 38;   // ms per character
const LINE_PAUSE    = 120;  // ms pause between lines
const RESTART_PAUSE = 2800; // ms after finish before restart

function buildCharSequence(lines) {
  // Returns flat array of { char, lineIndex, isKey } for the typing engine
  const seq = [];
  lines.forEach((line, li) => {
    if (line.type === "brace") {
      for (const ch of line.text) seq.push({ ch, li, part: "brace" });
      seq.push({ ch: "\n", li, part: "brace" });
      return;
    }
    if (line.type === "line") {
      seq.push({ ch: "  ", li, part: "indent" });
      for (const ch of `"${line.key}"`) seq.push({ ch, li, part: "key" });
      for (const ch of ": ") seq.push({ ch, li, part: "colon" });
      for (const ch of line.value) seq.push({ ch, li, part: "value" });
      if (line.comma) seq.push({ ch: ",", li, part: "comma" });
      seq.push({ ch: "\n", li, part: "comma" });
      return;
    }
    if (line.type === "array") {
      seq.push({ ch: "  ", li, part: "indent" });
      for (const ch of `"${line.key}"`) seq.push({ ch, li, part: "key" });
      for (const ch of ": [") seq.push({ ch, li, part: "colon" });
      line.items.forEach((item, ii) => {
        for (const ch of `"${item}"`) seq.push({ ch, li, part: "value" });
        if (ii < line.items.length - 1) seq.push({ ch: ", ", li, part: "comma" });
      });
      seq.push({ ch: "]", li, part: "colon" });
      if (line.comma) seq.push({ ch: ",", li, part: "comma" });
      seq.push({ ch: "\n", li, part: "comma" });
    }
  });
  return seq;
}

const SEQUENCE = buildCharSequence(JSON_LINES);

export default function TerminalWidget() {
  const [visibleChars, setVisibleChars] = useState(0);
  const [showCursor, setShowCursor]     = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    function tick(index) {
      if (index >= SEQUENCE.length) {
        // finished — blink cursor, then restart
        timerRef.current = setTimeout(() => {
          setVisibleChars(0);
          timerRef.current = setTimeout(() => tick(0), 300);
        }, RESTART_PAUSE);
        return;
      }

      // Add slight pause at newlines for a natural line-by-line feel
      const delay = SEQUENCE[index].ch === "\n" ? LINE_PAUSE : TYPING_SPEED;
      timerRef.current = setTimeout(() => {
        setVisibleChars(index + 1);
        tick(index + 1);
      }, delay);
    }

    tick(visibleChars);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(id);
  }, []);

  // Build rendered spans from visible sequence
  const rendered = [];
  let currentLine = [];
  let lastLi = 0;

  SEQUENCE.slice(0, visibleChars).forEach((token, i) => {
    if (token.li !== lastLi && currentLine.length) {
      rendered.push(<span key={`line-${lastLi}`}>{currentLine}</span>);
      currentLine = [];
      lastLi = token.li;
    }

    if (token.ch === "\n") {
      rendered.push(<span key={`line-${token.li}`}>{currentLine}</span>);
      rendered.push(<br key={`br-${i}`} />);
      currentLine = [];
      lastLi = token.li + 1;
      return;
    }

    let color;
    switch (token.part) {
      case "brace":  color = BRACE_COLOR; break;
      case "key":    color = KEY_COLOR;   break;
      case "value":  color = STR_COLOR;   break;
      case "comma":  color = COMMA_COLOR; break;
      default:       color = BRACE_COLOR;
    }
    currentLine.push(
      <span key={i} style={{ color }}>{token.ch}</span>
    );
  });
  if (currentLine.length) rendered.push(<span key="last">{currentLine}</span>);

  return (
    <div
      className="terminal-widget rounded-xl overflow-hidden"
      style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ background: "var(--bg-elevated)", borderColor: "var(--border-subtle)" }}
      >
        <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
        <span
          className="ml-3 text-xs tracking-widest"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--text-muted)" }}
        >
          about.json
        </span>
      </div>

      {/* Code area */}
      <div className="px-5 py-5 min-h-[280px]">
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
          <span style={{ color: "var(--accent)" }}>$</span> cat about.json
        </p>
        <pre
          className="text-sm leading-7 whitespace-pre-wrap"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--text-secondary)" }}
        >
          {rendered}
          <span
            className="inline-block w-[2px] h-[1.1em] align-middle ml-[1px]"
            style={{
              background: showCursor ? "var(--accent)" : "transparent",
              transition: "background 0.1s",
            }}
          />
        </pre>
      </div>
    </div>
  );
}
