import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl().origin;
  const paths = ["/", "/projects", "/research", "/resume", "/blog", ...site.notes.map((note) => `/blog/${note.slug}`)];

  return paths.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: new Date(),
  }));
}
