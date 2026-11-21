import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import MaskTitle from "@/components/ui/MaskTitle";
import { SERVICES } from "@/data/services";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE, BASED_IN } from "@/lib/site";

export const metadata = {
  title: "Software development services in Nigeria",
  description: `Website and web app development, backend and API development, fullstack MVPs, database design and website redesign by ${SITE.name}, a software developer in ${BASED_IN}. Serving Lagos, Abeokuta, Nigeria and remote clients.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="page">
      <JsonLd data={breadcrumbSchema([["Home", "/"], ["Services", "/services"]])} />
      <p className="t-meta" style={{ margin: 0, color: "var(--ink-3)" }}>Services · {BASED_IN} · Lagos · Abeokuta · Remote</p>
      <MaskTitle className="page-title" style={{ textWrap: "balance" }}>
        Software development, <span style={{ color: "var(--ink-3)" }}>end to end.</span>
      </MaskTitle>
      <p className="page-lead">
        I&apos;m {SITE.name}, a software developer and fullstack engineer in Nigeria. Pick what you need below, or{" "}
        <Link href="/contact" className="inline-link">tell me what you&apos;re building</Link> and I&apos;ll point you to the right fit.
      </p>

      <ol className="svc-list band-cut" data-surface="light">
        {SERVICES.map((s, i) => (
          <Reveal as="li" key={s.slug} className="svc-row" delay={i * 0.06} from={{ x: -60, y: 0 }}>
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
  );
}
