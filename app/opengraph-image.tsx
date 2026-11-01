import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = site.profile.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const font = await readFile(join(process.cwd(), "app/fonts/InstrumentSerif-Italic.ttf"));
  const stars = Array.from({ length: 56 }, (_, index) => ({
    left: (index * 97) % 1180,
    top: (index * 53) % 600,
    dim: (index % 3) + 1,
    opacity: 0.2 + (index % 5) * 0.08,
  }));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          color: "#f4f4f5",
        }}
      >
        {stars.map((star) => (
          <div
            key={`${star.left}-${star.top}`}
            style={{
              position: "absolute",
              left: star.left,
              top: star.top,
              width: star.dim,
              height: star.dim,
              borderRadius: "50%",
              background: `rgba(255,255,255,${star.opacity})`,
            }}
          />
        ))}
        <div
          style={{
            fontFamily: "Instrument Serif",
            fontStyle: "italic",
            fontSize: 92,
            letterSpacing: "-0.03em",
            fontWeight: 400,
          }}
        >
          {site.profile.name}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Instrument Serif",
          data: font,
          style: "italic",
          weight: 400,
        },
      ],
    },
  );
}
