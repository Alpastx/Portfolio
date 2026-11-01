import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata, Viewport } from "next";
import { Figtree, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Loader } from "@/components/loader";
import { SiteShell } from "@/components/site-shell";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Starfield } from "@/components/starfield";
import { TopDots } from "@/components/top-dots";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  preload: false,
});

const title = `${site.profile.name}, Vulnerability Researcher`;
const abMark = `data:image/webp;base64,${readFileSync(join(process.cwd(), "public/AB.webp")).toString("base64")}`;

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: {
    default: title,
    template: `%s · ${site.profile.name}`,
  },
  description: site.profile.description,
  applicationName: site.profile.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.profile.name,
    title,
    description: site.profile.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.profile.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${instrument.variable} ${jetbrains.variable} dark h-full antialiased`}
    >
      <body className="relative min-h-dvh bg-background font-sans text-foreground antialiased">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        <Loader mark={abMark} />
        <Starfield />
        <TopDots />
        <div className="relative z-10">
          <SiteShell>{children}</SiteShell>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.__revealAt=performance.now()+1300;for(const el of document.querySelectorAll('.reveal')){el.dataset.reveal=el.getBoundingClientRect().top>=innerHeight?'wait':'boot'}",
          }}
        />
      </body>
    </html>
  );
}
