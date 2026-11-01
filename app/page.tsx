import { About } from "@/components/about";
import { Collage } from "@/components/collage";
import { Contributions } from "@/components/contributions";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { PageFrame } from "@/components/page-frame";
import { ProjectCard } from "@/components/project-card";
import { Research } from "@/components/research";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { Tools } from "@/components/tools";
import { featuredProjects, site } from "@/content/site";

export default function HomePage() {
  return (
    <PageFrame>
      <div className="flex flex-col gap-7">
        <Hero />
        <About />
      </div>
      <div className="mt-4 flex flex-col gap-14 sm:gap-16">
        <Research />
        <Tools />
        <Experience />
        <section id="projects" className="below-fold flex flex-col gap-y-6">
          <Reveal delay={1}>
            <SectionHeader title={site.projectsTitle} href="/projects" />
          </Reveal>
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <Reveal key={project.title} delay={1} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>
        <Contributions />
        <Collage />
      </div>
    </PageFrame>
  );
}
