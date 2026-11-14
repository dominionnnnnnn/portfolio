import { Reveal } from "../ui/Reveal";
import { EDUCATION } from "../../data/experience";

export default function Education() {
  return (
    <section id="education" data-tone="4" className="section">
      <Reveal>
        <h2 className="t-h2" style={{ margin: 0, fontSize: "clamp(26px,3vw,38px)" }}>Education</h2>
      </Reveal>
      <Reveal as="ul" className="edu-list">
        {EDUCATION.map((e) => (
          <li key={e.school} className="edu-row">
            <span className="edu-date">{e.date}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 18 }}>{e.what}</div>
              <div style={{ color: "var(--ink-2)" }}>{e.school}</div>
              {e.note && <p style={{ margin: "6px 0 0", color: "var(--ink-3)", fontSize: 15 }}>{e.note}</p>}
            </div>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
