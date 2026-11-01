import type { Metadata } from "next";
import { ResumeSheet } from "@/components/resume-sheet";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Resume",
  description: site.profile.description,
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Resume",
    description: site.profile.description,
    url: "/resume",
  },
};

export default function ResumePage() {
  return <ResumeSheet />;
}
