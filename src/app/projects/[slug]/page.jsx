import { notFound } from "next/navigation";
import CaseStudyView from "@/components/views/CaseStudyView";
import JsonLd from "@/components/seo/JsonLd";
import { PROJECTS, projectBySlug } from "@/data/projects";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => PROJECTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  return {
    title: `${p.name} case study`,
    description: `${p.blurb} ${p.role} · ${p.stack.join(", ")}.`,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: `${p.name} | ${SITE.name}`, description: p.blurb, ...(p.img ? { images: [p.img] } : {}) },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([["Home", "/"], ["Projects", "/projects"], [p.name, `/projects/${p.slug}`]]),
          { "@context": "https://schema.org", "@type": "CreativeWork", name: p.name, description: p.blurb, url: `${SITE.url}/projects/${p.slug}`, creator: { "@id": `${SITE.url}/#person` } },
        ]}
      />
      <CaseStudyView slug={slug} />
    </>
  );
}
