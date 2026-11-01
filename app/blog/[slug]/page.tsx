import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/page-frame";
import { Reveal } from "@/components/reveal";
import { noteBySlug, site } from "@/content/site";

export function generateStaticParams() {
  return site.notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = noteBySlug(slug);
  if (!note) return { title: site.notesTitle };
  return {
    title: note.title,
    description: note.excerpt,
    alternates: { canonical: `/blog/${note.slug}` },
    openGraph: {
      title: note.title,
      description: note.excerpt,
      url: `/blog/${note.slug}`,
      type: "article",
    },
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = noteBySlug(slug);
  if (!note) notFound();

  return (
    <PageFrame>
      <Reveal>
        <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          {site.notesTitle}
        </Link>
        <h1 className="mt-3 font-display text-[2.25rem] leading-[1.1] tracking-[-0.03em] italic">{note.title}</h1>
        <time dateTime={note.isoDate} className="mt-2 block font-mono text-[12px] text-muted-foreground">
          {note.date}
        </time>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="flex flex-col gap-4 text-[14.5px] leading-[1.75] text-muted-foreground">
          {note.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>
    </PageFrame>
  );
}
