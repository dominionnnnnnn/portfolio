import { SITE } from "@/lib/site";
import { PROJECTS } from "@/data/projects";
import { SERVICES } from "@/data/services";
import { LOCATIONS } from "@/data/locations";

export default function sitemap() {
  const now = new Date();
  const page = (path, priority, changeFrequency = "monthly") => ({ url: `${SITE.url}${path}`, lastModified: now, changeFrequency, priority });
  return [
    page("/", 1, "weekly"),
    page("/services", 0.9),
    ...SERVICES.map((s) => page(`/services/${s.slug}`, 0.85)),
    ...LOCATIONS.map((l) => page(`/software-developer-${l.slug}`, 0.85)),
    page("/projects", 0.8),
    ...PROJECTS.map((p) => page(`/projects/${p.slug}`, 0.7)),
    page("/about", 0.7),
    page("/contact", 0.8),
  ];
}
