import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import MaskTitle from "@/components/ui/MaskTitle";
import Unveil from "@/components/ui/Unveil";
import { SERVICES } from "@/data/services";
import { HOME_PROJECTS } from "@/data/projects";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const locationMetadata = (loc) => ({
  title: { absolute: `${loc.metaTitle} | ${SITE.name}` },
  description: loc.metaDescription,
  alternates: { canonical: `/software-developer-${loc.slug}` },
  openGraph: { title: loc.metaTitle, description: loc.metaDescription, url: `/software-developer-${loc.slug}` },
});

export default function LocationView({ loc }) {
  const path = `/software-developer-${loc.slug}`;
  return (
    <article className="page svc">
      <JsonLd
        data={[
          breadcrumbSchema([["Home", "/"], [`Software developer in ${loc.city}`, path]]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Software development in ${loc.city}`,
            serviceType: "Software development",
            url: `${SITE.url}${path}`,
            provider: { "@id": `${SITE.url}/#person` },
            areaServed: { "@type": "City", name: loc.city },
          },
        ]}
      />
      <p className="t-meta" style={{ margin: 0, color: "var(--ink-3)" }}>{loc.city} · {SITE.title} · {SITE.altTitle}</p>
      <MaskTitle className="page-title" style={{ textWrap: "balance" }}>{loc.h1}</MaskTitle>
      <p className="page-lead">{loc.lead}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
        <Magnetic href={SITE.bookCall} target="_blank" rel="noopener noreferrer">Book a free call</Magnetic>
        <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary">WhatsApp me ↗</a>
      </div>

      <div className="band-cut" data-surface="light">
      <div className="loc-points">
        {loc.points.map((p, i) => (
          <Reveal key={p.t} className="tile" delay={i * 0.08} from={{ y: 40, r: i % 2 ? 1.5 : -1.5 }}>
            <div className="svc-name" style={{ fontSize: 24 }}>{p.t}</div>
            <p>{p.d}</p>
          </Reveal>
        ))}
      </div>

      <MaskTitle as="h2" inView className="page-h2">{`What I can build for you in ${loc.city}`}</MaskTitle>
      <ol className="svc-list" style={{ marginTop: 0 }}>
        {SERVICES.map((s, i) => (
          <Reveal as="li" key={s.slug} className="svc-row" delay={i * 0.05} from={{ x: -60, y: 0 }}>
            <Link href={`/services/${s.slug}`} className="svc-link">
              <span className="svc-num t-meta">0{i + 1}</span>
              <span className="svc-main">
                <span className="svc-name">{s.name}</span>
                <span className="svc-lead">{s.lead}</span>
              </span>
              <span className="svc-stack">{s.stack.slice(0, 4).join(" · ")}</span>
              <span className="svc-arrow" aria-hidden="true">→</span>
            </Link>
          </Reveal>
        ))}
      </ol>
      </div>

      <div className="band-cut" data-surface="dusk">
      <MaskTitle as="h2" inView className="page-h2">Recent work</MaskTitle>
      <div className="svc-work">
        {HOME_PROJECTS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.1} from={{ x: i % 2 ? 60 : -60, y: 20, r: i % 2 ? 2 : -2 }}>
          <Link href={`/projects/${p.slug}`} className="svc-work-card">
            {p.img && <Unveil label={p.name} tag={p.tag} i={i}><img src={p.img} alt={`${p.name} screenshot`} loading="lazy" decoding="async" /></Unveil>}
            <span className="svc-work-body">
              <span className="svc-name" style={{ fontSize: 22 }}>{p.name}</span>
              <span className="svc-lead">{p.blurb}</span>
            </span>
          </Link>
          </Reveal>
        ))}
      </div>
      </div>
    </article>
  );
}
