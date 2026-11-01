import { ChipRow } from "@/components/chip";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/content/site";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function ProjectCard({ project }: { project: Project }) {
  const links = [
    project.website ? { href: project.website, label: "Live link" } : null,
    project.github ? { href: project.github, label: "GitHub" } : null,
  ].filter((link) => link !== null);

  return (
    <article className="flex h-full flex-col">
      <div
        className="relative flex aspect-video items-end overflow-hidden rounded-lg p-4"
        style={{ background: `linear-gradient(145deg, ${project.cover.from}, ${project.cover.to})` }}
      >
        {project.cover.image ? (
          <Image
            src={project.cover.image}
            alt=""
            fill
            sizes="(min-width: 896px) 430px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : null}
        {project.cover.image ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 to-transparent" />
        ) : null}
        <h3 className="relative font-display text-[1.75rem] leading-none tracking-[-0.02em] text-white/90 italic">
          {project.cover.label}
        </h3>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
      <div className="mt-3 empty:hidden">
        <ChipRow chips={project.tags} />
      </div>

      {links.length > 0 ? (
        <div className="mt-auto flex gap-4 pt-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              {link.label === "Live link" ? <ArrowUpRight className="size-3.5" strokeWidth={1.75} aria-hidden /> : null}
              {link.label === "GitHub" ? <GithubIcon className="size-3.5" /> : null}
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}
