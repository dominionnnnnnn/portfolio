"use client";
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "../ui/Reveal";
import { SITE } from "../../lib/site";

// Production: our own /api/github (GitHub GraphQL, cached at the edge).
// Local dev (no serverless functions): a public contributions mirror.
const SOURCES = [
  async () => {
    const r = await fetch("/api/github");
    if (!r.ok) throw new Error();
    return r.json();
  },
  async () => {
    const r = await fetch(`https://github-contributions-api.jogruber.de/v4/${SITE.githubHandle}?y=last`);
    if (!r.ok) throw new Error();
    const d = await r.json();
    return { total: d.total?.lastYear ?? Object.values(d.total ?? {})[0] ?? 0, days: d.contributions, updated: new Date().toISOString() };
  },
];

const toWeeks = (days) => {
  const weeks = [];
  let wk = { days: [], month: "" };
  let lastM = -1;
  const pad = new Date(days[0].date + "T00:00:00").getDay();
  for (let i = 0; i < pad; i++) wk.days.push(null);
  days.forEach((d) => {
    const dt = new Date(d.date + "T00:00:00");
    if (wk.days.length === 0 && dt.getMonth() !== lastM) {
      wk.month = dt.toLocaleString("en", { month: "short" });
      lastM = dt.getMonth();
    }
    wk.days.push(d);
    if (wk.days.length === 7) { weeks.push(wk); wk = { days: [], month: "" }; }
  });
  if (wk.days.length) weeks.push(wk);
  return weeks;
};

const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function GitHubHeatmap() {
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      for (const src of SOURCES) {
        try {
          const d = await src();
          if (alive && d?.days?.length) { setData(d); return; }
        } catch { /* try the next source */ }
      }
      if (alive) setFailed(true);
    })();
    return () => { alive = false; };
  }, []);

  const weeks = useMemo(() => (data ? toWeeks(data.days.slice(-371)) : null), [data]);

  return (
    <section id="github" className="section">
      <Reveal className="section-head" style={{ marginBottom: 28 }}>
        <h2 className="t-h2" style={{ margin: 0 }}>On GitHub</h2>
        <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="hero-links-a mono-link">@{SITE.githubHandle} ↗</a>
      </Reveal>
      <Reveal className="gh-card">
        <div className="gh-scroll">
          {weeks ? (
            <div className="gh-grid" role="img" aria-label={`${data.total} GitHub contributions in the past year`}>
              {weeks.map((w, i) => (
                <div key={i} className="gh-week">
                  {w.month && <span className="gh-month">{w.month}</span>}
                  {w.days.map((d, j) =>
                    d ? (
                      <span key={j} title={`${d.count} on ${d.date}`} style={{ background: `var(--h${Math.min(4, d.level || 0)})` }} />
                    ) : (
                      <span key={j} style={{ background: "transparent" }} />
                    )
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="gh-grid gh-skeleton" aria-hidden="true">
              {Array.from({ length: 53 }, (_, i) => (
                <div key={i} className="gh-week">{Array.from({ length: 7 }, (_, j) => <span key={j} />)}</div>
              ))}
            </div>
          )}
        </div>
        <div className="gh-foot">
          <span>
            {data ? (
              <><b>{data.total.toLocaleString()} contributions</b> in the past year · Updated {fmtDate(data.updated)}</>
            ) : failed ? (
              <>Couldn't reach GitHub just now. <a href={SITE.github} target="_blank" rel="noopener noreferrer">See the profile ↗</a></>
            ) : (
              "Loading contributions…"
            )}
          </span>
          <span className="gh-legend" aria-hidden="true">
            Less <i style={{ background: "var(--h0)", marginLeft: 6 }} /><i style={{ background: "var(--h1)" }} /><i style={{ background: "var(--h2)" }} /><i style={{ background: "var(--h3)" }} /><i style={{ background: "var(--h4)", marginRight: 6 }} /> More
          </span>
        </div>
      </Reveal>
    </section>
  );
}
