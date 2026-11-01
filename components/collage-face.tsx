import type { CollageItem } from "@/content/site";
import Image from "next/image";

export const boardClass = "relative aspect-[5/2]";

function frameClass(frame: CollageItem["frame"], captioned: boolean) {
  if (frame === "light") return `bg-[#f4f1ea] p-[5%] text-[#1c1b19] ${captioned ? "pb-0" : "pb-[16%]"}`;
  if (frame === "dark") return `bg-[#161616] p-[4%] text-white/75 ring-1 ring-white/10 ${captioned ? "pb-0" : ""}`;
  return "overflow-hidden bg-black";
}

function Photo({ item }: { item: CollageItem }) {
  const frame = (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      sizes="32vw"
      loading="lazy"
      draggable={false}
      className={`pointer-events-none ${item.cutout ? "object-contain" : "object-cover"}`}
    />
  );

  if (item.cutout) {
    return (
      <div className="relative" style={{ aspectRatio: item.ratio }}>
        {frame}
      </div>
    );
  }

  const caption = item.frame ? item.caption : undefined;

  return (
    <figure className={`shadow-[0_18px_44px_rgba(0,0,0,0.55)] ${frameClass(item.frame, Boolean(caption))}`}>
      <div className="relative overflow-hidden" style={{ aspectRatio: item.ratio }}>
        {frame}
      </div>
      {caption ? (
        <figcaption className="px-1 pt-2.5 pb-3 text-center font-display text-[15px] leading-[1.05] text-balance italic">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Sticker({ item }: { item: CollageItem }) {
  return (
    <div className="relative" style={{ aspectRatio: item.ratio }} aria-hidden={item.alt ? undefined : true}>
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="160px"
        loading="lazy"
        draggable={false}
        className="pointer-events-none object-contain"
      />
    </div>
  );
}

function Note({ item }: { item: CollageItem }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#141416] shadow-[0_16px_40px_rgba(0,0,0,0.55)]">
      <div className="flex items-center gap-2 px-3 pt-2.5">
        <span className="relative size-6 shrink-0 overflow-hidden rounded-full bg-black">
          <Image
            src={item.mark || item.src}
            alt=""
            fill
            sizes="24px"
            loading="lazy"
            draggable={false}
            className={`pointer-events-none ${item.mark ? "object-contain p-0.5" : "object-cover object-left-top"}`}
          />
        </span>
        <p className="min-w-0 truncate text-[13px]">
          <span className="font-medium">{item.title}</span>
          {item.caption ? <span className="font-mono text-[10px] text-white/40"> {item.caption}</span> : null}
        </p>
      </div>
      {item.body ? <p className="px-3 pt-2 text-[12.5px] leading-snug text-pretty text-white/80">{item.body}</p> : null}
      <div className="relative m-2.5 overflow-hidden rounded-lg bg-black" style={{ aspectRatio: item.ratio }}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="32vw"
          loading="lazy"
          draggable={false}
          className={`pointer-events-none object-cover ${item.darken ? "invert hue-rotate-180" : ""}`}
        />
      </div>
    </article>
  );
}

function Card({ item }: { item: CollageItem }) {
  return (
    <article className="rounded-xl border border-white/10 bg-muted px-4 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
      <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">{item.caption}</p>
      <p className="mt-2 font-display text-[1.85rem] leading-none italic">{item.title}</p>
      <ul className="mt-3 space-y-1 border-t border-white/10 pt-3 font-mono text-[11px] leading-5 text-foreground/85">
        {item.lines?.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </article>
  );
}

export function Face({ item }: { item: CollageItem }) {
  if (item.kind === "sticker") return <Sticker item={item} />;
  if (item.kind === "note") return <Note item={item} />;
  if (item.kind === "card") return <Card item={item} />;
  return <Photo item={item} />;
}
