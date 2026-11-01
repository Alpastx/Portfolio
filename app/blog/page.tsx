import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/page-frame";
import { PageTitle } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.notesTitle,
};

export default function BlogPage() {
  return (
    <PageFrame>
      <Reveal>
        <PageTitle title={site.notesTitle} />
      </Reveal>
      <div className="flex flex-col">
        {site.notes.map((note, index) => (
          <Reveal key={note.slug} delay={0.1 + index * 0.1}>
            <Link
              href={`/blog/${note.slug}`}
              className="group flex flex-col gap-1 border-b border-white/10 py-4"
            >
              <span className="flex items-baseline justify-between gap-4">
                <span className="font-display text-lg tracking-tight group-hover:underline">
                  {note.title}
                </span>
                <time dateTime={note.isoDate} className="shrink-0 font-mono text-[12px] text-muted-foreground">
                  {note.date}
                </time>
              </span>
              <span className="text-[14.5px] leading-relaxed text-muted-foreground">{note.excerpt}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </PageFrame>
  );
}
