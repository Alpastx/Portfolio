import { Chip, toolIcon } from "@/components/chip";
import { Reveal } from "@/components/reveal";
import { site, type Segment } from "@/content/site";
import { Calendar, FileText, Mail } from "lucide-react";
import Link from "next/link";

const markClass =
  "font-medium text-foreground underline decoration-white/35 underline-offset-4 hover:decoration-white/70";

function Mark({ text, href }: { text: string; href?: string }) {
  if (!href) return <span className={markClass}>{text}</span>;
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={markClass}>
        {text}
      </Link>
    );
  }
  return (
    <a href={href} className={markClass} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
}

function Segments({ parts }: { parts: Segment[] }) {
  return (
    <p>
      {parts.map((part, index) =>
        part.kind === "text" ? (
          <span key={index}>{part.text}</span>
        ) : part.kind === "mark" ? (
          <Mark key={index} text={part.text} href={part.href} />
        ) : toolIcon(part.name) ? (
          <Chip key={index} name={part.name} color={part.color} />
        ) : (
          <span key={index}>{part.name}</span>
        ),
      )}
    </p>
  );
}

export const actionClass =
  "inline-flex h-8 w-fit items-center gap-1.5 rounded-md bg-linear-to-b from-zinc-600 via-zinc-800 to-black px-2.5 text-[13px] text-white ring-1 ring-white/15 transition-colors hover:from-zinc-500";

export function About() {
  const email = `mailto:${site.profile.email}`;

  return (
    <section id="about">
      <Reveal delay={0.1}>
        <div className="flex flex-col text-[14.5px] leading-[1.75] text-muted-foreground">
          {site.about.map((paragraph, index) => (
            <div key={index} className={index === 1 || index === 2 ? "mt-[1.75em]" : index > 0 ? "mt-1.5" : undefined}>
              <Segments parts={paragraph} />
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <a href={`${email}?subject=Intro%20call`} className={actionClass}>
            <Calendar className="size-3.5" aria-hidden />
            Book an intro call
          </a>
          <a href={email} className={actionClass}>
            <Mail className="size-3.5" aria-hidden />
            Send an email
          </a>
          <Link href="/resume" className={actionClass}>
            <FileText className="size-3.5" aria-hidden />
            Resume
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
