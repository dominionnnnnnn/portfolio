import ContactView from "@/components/views/ContactView";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Hire a software developer in Nigeria",
  description: `Tell ${SITE.name} what you're building. Book a call, email or WhatsApp about a website, web app, backend or full product. Working with clients in Lagos, Abeokuta, across Nigeria and remotely.`,
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <ContactView />;
}
