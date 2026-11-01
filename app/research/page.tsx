import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";
import { ResearchList } from "@/components/research";
import { PageTitle } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.researchTitle,
  description: site.profile.description,
  alternates: { canonical: "/research" },
  openGraph: {
    title: site.researchTitle,
    description: site.profile.description,
    url: "/research",
  },
};

export default function ResearchPage() {
  return (
    <PageFrame>
      <Reveal>
        <PageTitle title={site.researchTitle} />
      </Reveal>
      <ResearchList start={0.1} />
    </PageFrame>
  );
}
