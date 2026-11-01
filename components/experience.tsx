import { ChipRow } from "@/components/chip";
import { Mark } from "@/components/mark";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { site } from "@/content/site";

export function Experience() {
  const seeAll = site.profile.linkedin || undefined;

  return (
    <section id="work" className="below-fold flex flex-col gap-y-6">
      <Reveal delay={1}>
        <SectionHeader title={site.story.title} href={seeAll} external />
      </Reveal>
      <div className="flex flex-col gap-8">
        {site.experience.map((job) => (
          <Reveal key={`${job.org}-${job.role}`} delay={1}>
            <article className="flex gap-3">
              <Mark logo={job.logo}>{job.mark}</Mark>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  {job.href ? (
                    <a href={job.href} className="font-medium hover:underline" target="_blank" rel="noopener noreferrer">
                      {job.org}
                    </a>
                  ) : (
                    <p className="font-medium">{job.org}</p>
                  )}
                  <span className="shrink-0 font-mono text-[12px] text-muted-foreground">{job.dates}</span>
                </div>
                <p className="text-[13.5px] text-muted-foreground">{job.role}</p>
                <p className="text-[13px] text-muted-foreground/80">{job.place}</p>
                <div className="mt-2 empty:hidden">
                  <ChipRow chips={job.tags} />
                </div>
                <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-4 text-[14px] leading-relaxed text-muted-foreground">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
