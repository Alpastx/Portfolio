import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";
import { PageTitle } from "@/components/section-header";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.projectsTitle,
  description: site.profile.description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: site.projectsTitle,
    description: site.profile.description,
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <PageFrame>
      <Reveal>
        <PageTitle title={site.projectsTitle} />
      </Reveal>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {site.projects.map((project, index) => (
          <Reveal key={project.title} delay={0.1 + index * 0.1} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </PageFrame>
  );
}
