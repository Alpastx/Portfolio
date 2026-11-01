import { Mail } from "lucide-react";
import { actionClass } from "@/components/about";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { site } from "@/content/site";

export function Contact() {
  const href = site.contact.href || `mailto:${site.profile.email}`;

  return (
    <section id="contact" className="flex flex-col gap-y-6">
      <Reveal delay={1}>
        <SectionHeader title={site.contact.title} />
      </Reveal>
      <Reveal delay={1}>
        <p className="max-w-md text-[14.5px] leading-[1.75] text-muted-foreground">{site.contact.line}</p>
        <a href={href} className={`mt-5 ${actionClass}`}>
          <Mail className="size-3.5" aria-hidden />
          {site.contact.cta}
        </a>
      </Reveal>
    </section>
  );
}
