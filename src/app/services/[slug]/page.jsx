import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import MaskTitle from "@/components/ui/MaskTitle";
import Unveil from "@/components/ui/Unveil";
import { SERVICES, serviceBySlug } from "@/data/services";
import { projectBySlug } from "@/data/projects";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE, BASED_IN } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => SERVICES.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return {
    title: { absolute: `${s.metaTitle} | ${SITE.name}` },
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, url: `/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();
  const work = s.projects.map(projectBySlug).filter(Boolean);
  const others = SERVICES.filter((x) => x.slug !== s.slug);

  return (
    <article className="page svc">
      <JsonLd
        data={[
          serviceSchema(s),
          breadcrumbSchema([["Home", "/"], ["Services", "/services"], [s.name, `/services/${s.slug}`]]),
          ...(s.faqs?.length ? [faqSchema(s.faqs)] : []),
        ]}
      />
      <nav aria-label="Breadcrumb" className="t-meta svc-crumbs">
        <Link href="/">Home</Link> <span aria-hidden="true">/</span> <Link href="/services">Services</Link> <span aria-hidden="true">/</span>{" "}
        <span aria-current="page">{s.short}</span>
      </nav>
      <MaskTitle className="page-title" style={{ textWrap: "balance" }}>{s.h1}</MaskTitle>
      <p className="page-lead">{s.lead}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
        <Magnetic href={SITE.bookCall} target="_blank" rel="noopener noreferrer">Book a free call</Magnetic>
        <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary">WhatsApp me ↗</a>
      </div>

      <div className="svc-grid band-cut" data-surface="light">
        <Reveal className="svc-block" from={{ x: -40, y: 0 }}>
          <h2 className="cs-h" style={{ marginTop: 0 }}>Who it&apos;s for</h2>
          <p>{s.forWho}</p>
          <h2 className="cs-h">What&apos;s included</h2>
          <ul className="dash-list" style={{ marginTop: 0, gap: 10 }}>
            {s.includes.map((x, i) => (
              <Reveal as="li" key={x} style={{ fontSize: 16.5 }} delay={0.15 + i * 0.07} from={{ x: -20, y: 0 }}>{x}</Reveal>
            ))}
          </ul>
          <h2 className="cs-h">Tools I use</h2>
          <div className="chips" style={{ marginTop: 0 }}>
            {s.stack.map((c) => <span key={c} className="chip chip-mono">{c}</span>)}
          </div>
        </Reveal>

        <Reveal as="aside" className="svc-aside" delay={0.12} from={{ x: 40, y: 0 }}>
          <div className="t-meta" style={{ color: "var(--ink-3)" }}>Who you&apos;re working with</div>
          <p style={{ margin: "12px 0 0" }}>
            {SITE.name}, a {SITE.title.toLowerCase()} and {SITE.altTitle.toLowerCase()} based in {BASED_IN}. I work with businesses in
            Lagos, Abeokuta and across Nigeria, and with remote teams worldwide.
          </p>
          <div className="t-meta" style={{ color: "var(--ink-3)", marginTop: 24 }}>How it works</div>
          <ol className="svc-steps">
            <li><b>Call.</b> 20 minutes on what you need and why.</li>
            <li><b>Plan.</b> A written scope, timeline and price.</li>
            <li><b>Build.</b> Progress you can click through every week.</li>
            <li><b>Launch.</b> Live on your domain, with a handover.</li>
          </ol>
        </Reveal>
      </div>

      {work.length > 0 && (
        <section className="band-cut" data-surface="dusk">
          <MaskTitle as="h2" inView className="page-h2" style={{ marginTop: 0 }}>Related work</MaskTitle>
          <div className="svc-work">
            {work.map((p, i) => (
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
        </section>
      )}

      {s.faqs?.length > 0 && (
        <section className="band-cut" data-surface="light">
          <MaskTitle as="h2" inView className="page-h2" style={{ marginTop: 0 }}>Questions</MaskTitle>
          <div className="svc-faq">
            {s.faqs.map((f, i) => (
              <Reveal as="details" key={f.q} delay={i * 0.06}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section style={{ marginTop: "clamp(56px,8vw,96px)" }}>
        <MaskTitle as="h2" inView className="page-h2" style={{ marginTop: 0 }}>Other services</MaskTitle>
        <div className="chips">
          {others.map((o) => <Link key={o.slug} href={`/services/${o.slug}`} className="chip">{o.name} →</Link>)}
        </div>
      </section>
    </article>
  );
}
