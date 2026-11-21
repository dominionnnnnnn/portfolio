import "@fontsource/syne/latin-600.css";
import "@fontsource/syne/latin-700.css";
import "@fontsource/syne/latin-800.css";
import "@fontsource/hanken-grotesk/latin-400.css";
import "@fontsource/hanken-grotesk/latin-500.css";
import "@fontsource/hanken-grotesk/latin-600.css";
import "@fontsource/hanken-grotesk/latin-700.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "./globals.css";
import "@/styles/tokens.css";
import "@/styles/shell.css";
import "@/styles/home.css";
import "@/styles/pages.css";
import Script from "next/script";
import SiteShell from "@/components/shell/SiteShell";
import JsonLd from "@/components/seo/JsonLd";
import { personSchema, websiteSchema, serviceProviderSchema } from "@/lib/schema";
import { SITE, KEYWORDS, BASED_IN } from "@/lib/site";

const description = `${SITE.name} is a software developer and fullstack engineer in ${BASED_IN} building fast websites, web apps and APIs with React, Next.js, Django and PostgreSQL for businesses in Lagos, Abeokuta, across Nigeria and remote teams worldwide.`;

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.title} in Nigeria`,
    template: `%s | ${SITE.name}`,
  },
  description,
  keywords: KEYWORDS,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_NG",
    url: "/",
    title: `${SITE.name} | ${SITE.title} in Nigeria`,
    description: "Websites, web apps and APIs, end to end: Django and GraphQL backends, polished React and Next.js frontends.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${SITE.name}, ${SITE.title}: From first click to final query, I build the whole thing.` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.title}`,
    description: "Websites, web apps and APIs, end to end.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#070A12", colorScheme: "dark" };

// Runs before paint: repeat visits in the same tab skip the intro overlay.
const introScript = `try{var q=new URLSearchParams(location.search).get('intro');if(q==='0'||sessionStorage.getItem('aa-intro')==='1')document.documentElement.dataset.intro='skip'}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={[personSchema(), websiteSchema(), serviceProviderSchema()]} />
      </head>
      <body>
        <Script id="intro-skip" strategy="beforeInteractive">{introScript}</Script>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
