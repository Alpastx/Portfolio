"use client";

import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { site } from "@/content/site";
import { ArrowLeft, Download, Mail, MapPin, Minus, Moon, Plus, Sun } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const cves = site.research.find((group) => group.title === "CVE")?.items ?? [];
const advisories = site.research.find((group) => group.title === "Advisories")?.items ?? [];

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="mt-4 border-b border-current/20 pb-0.5 text-[13px] font-bold tracking-wider uppercase">
      {children}
    </h2>
  );
}

export function ResumeSheet() {
  const [zoom, setZoom] = useState(100);
  const [dark, setDark] = useState(false);

  return (
    <main id="content" tabIndex={-1} className="relative min-h-dvh px-4 pt-8 pb-36">
      <Link
        href="/"
        aria-label="Back to home"
        className="no-print fixed top-6 left-6 z-40 flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/80 text-white"
      >
        <ArrowLeft className="size-4" />
      </Link>

      <article
        className={`resume-sheet mx-auto w-full max-w-[794px] origin-top px-8 pt-8 pb-6 font-sans text-[12px] leading-relaxed shadow-[0_25px_60px_rgba(0,0,0,0.35)] ${
          dark ? "bg-zinc-950 text-zinc-100" : "bg-white text-zinc-900"
        }`}
        style={{ transform: `scale(${zoom / 100})` }}
      >
        <header className="text-center">
          <h1 className="text-2xl font-medium tracking-tight">{site.profile.name}</h1>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] font-medium">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3" aria-hidden />
              {site.profile.location}
            </span>
            <a href={`mailto:${site.profile.email}`} className="inline-flex items-center gap-1 hover:underline">
              <Mail className="size-3" aria-hidden />
              {site.profile.email}
            </a>
            <a href={site.profile.linkedin} className="inline-flex items-center gap-1 hover:underline" target="_blank" rel="noopener noreferrer">
              <LinkedinIcon className="size-3" />
              linkedin/alpesh-bhagwatkar
            </a>
            <a href={site.profile.github} className="inline-flex items-center gap-1 hover:underline" target="_blank" rel="noopener noreferrer">
              <GithubIcon className="size-3" />
              github.com/Alpastx
            </a>
          </div>
        </header>

        <SectionTitle>Technical Skills</SectionTitle>
        <p className="mt-2">
          <span className="font-bold">Languages:</span> Python, Go, TypeScript
        </p>
        <p className="mt-1 font-bold">Technologies:</p>
        <ul className="mt-1 list-disc pl-4">
          <li>
            <span className="font-bold">Security:</span> Burp Suite, Nmap, Linux
          </li>
          <li>
            <span className="font-bold">Tools:</span> Git, Firefox, Nextra
          </li>
        </ul>

        <SectionTitle>Experience</SectionTitle>
        <div className="mt-2 flex flex-col gap-3">
          {site.experience.map((job) => (
            <section key={`${job.org}-${job.role}`}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-xs font-bold">
                  {job.role} — {job.org}
                </h3>
                <span className="shrink-0 text-[11px]">{job.dates}</span>
              </div>
              <p className="text-[11px]">
                <span className="font-bold">Skills:</span> {job.tags.map((tag) => tag.name).join(", ")}
              </p>
              <ul className="mt-1 list-disc pl-4">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <SectionTitle>Projects</SectionTitle>
        <div className="mt-2 flex flex-col gap-3">
          {site.projects.map((project) => (
            <section key={project.title}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-xs font-bold">{project.title}</h3>
                <span className="shrink-0 text-[11px]">
                  {project.github ? (
                    <a href={project.github} className="hover:underline" target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  ) : null}
                  {project.github && project.website ? " | " : null}
                  {project.website ? (
                    <a href={project.website} className="hover:underline" target="_blank" rel="noopener noreferrer">
                      Website
                    </a>
                  ) : null}
                </span>
              </div>
              <p className="text-[11px]">
                <span className="font-bold">Technologies:</span> {project.tags.map((tag) => tag.name).join(", ")}
              </p>
              <ul className="mt-1 list-disc pl-4">
                <li>{project.summary}</li>
              </ul>
            </section>
          ))}
        </div>

        <SectionTitle>Education</SectionTitle>
        <div className="mt-2 flex flex-col gap-2">
          {site.education.map((school) => (
            <section key={school.school}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-xs font-bold">{school.school}</h3>
                <span className="shrink-0 text-[11px]">{school.dates}</span>
              </div>
              <p>{school.degree}</p>
            </section>
          ))}
        </div>

        <SectionTitle>Achievements</SectionTitle>
        <ul className="mt-2 list-disc pl-4">
          <li>Certificates: HTB CPTS, HTB CJCA, eJPT, and ICCA.</li>
          {cves.map((item) => (
            <li key={item.title}>
              {item.title}, {item.detail}
              {item.rating ? `, ${item.score ? `${item.score} ${item.rating}` : item.rating}` : ""}. {item.note}
            </li>
          ))}
          <li>
            Published advisories on {advisories.map((item) => item.title).join(", ")}.
          </li>
        </ul>
      </article>

      <div className="no-print fixed bottom-24 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-black/85 px-2 py-1 text-xs text-white">
        <button type="button" aria-label="Zoom out" className="rounded-full p-1.5 hover:bg-white/10" onClick={() => setZoom((value) => Math.max(80, value - 10))}>
          <Minus className="size-3.5" />
        </button>
        <span className="w-10 text-center tabular-nums">{zoom}%</span>
        <button type="button" aria-label="Zoom in" className="rounded-full p-1.5 hover:bg-white/10" onClick={() => setZoom((value) => Math.min(130, value + 10))}>
          <Plus className="size-3.5" />
        </button>
        <button
          type="button"
          aria-label={dark ? "Switch to light sheet" : "Switch to dark sheet"}
          className="rounded-full p-1.5 hover:bg-white/10"
          onClick={() => setDark((value) => !value)}
        >
          {dark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
        </button>
        <button type="button" className="inline-flex items-center gap-1 rounded-full px-2 py-1.5 hover:bg-white/10" onClick={() => window.print()}>
          <Download className="size-3.5" />
          Export PDF
        </button>
      </div>
    </main>
  );
}
