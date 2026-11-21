import ProjectsView from "@/components/views/ProjectsView";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Projects and case studies",
  description: `Websites, web apps and backends built by ${SITE.name}, a software developer in Nigeria: a P2P trading platform, an offline-first business ledger, an emergency-response system and more.`,
  alternates: { canonical: "/projects" },
};

export default function Page() {
  return <ProjectsView />;
}
