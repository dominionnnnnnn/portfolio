import AboutView from "@/components/views/AboutView";
import { SITE, BASED_IN } from "@/lib/site";

export const metadata = {
  title: `About ${SITE.shortName}, ${SITE.title} in Nigeria`,
  description: `${SITE.name} is a software developer and fullstack engineer in ${BASED_IN} with 2+ years across logistics, fintech and emergency-response systems. React, Next.js, Django, GraphQL, PostgreSQL and Supabase.`,
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <AboutView />;
}
