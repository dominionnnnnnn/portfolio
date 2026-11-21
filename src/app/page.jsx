import Hero from "@/components/home/Hero";
import CoverStack from "@/components/home/CoverStack";
import AboutHome from "@/components/home/AboutHome";
import SelectedWork from "@/components/home/SelectedWork";
import WhatIBuild from "@/components/home/WhatIBuild";
import Experience from "@/components/home/Experience";
import Education from "@/components/home/Education";
import GitHubHeatmap from "@/components/home/GitHubHeatmap";
import Testimonials from "@/components/home/Testimonials";
import ContactQuest from "@/components/home/ContactQuest";

export const metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <>
      <CoverStack hero={<Hero />}>
        <AboutHome />
      </CoverStack>
      <SelectedWork />
      <WhatIBuild />
      <Experience />
      <Education />
      <GitHubHeatmap />
      <Testimonials />
      <ContactQuest />
    </>
  );
}
