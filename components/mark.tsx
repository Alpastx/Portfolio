import Image from "next/image";

export function Mark({
  children,
  logo,
  invert,
  wide,
}: {
  children: string;
  logo?: string;
  invert?: boolean;
  wide?: boolean;
}) {
  if (logo) {
    return (
      <span
        className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-black ${wide ? "h-10 w-[4.75rem]" : "size-10"}`}
      >
        <Image
          src={logo}
          alt=""
          fill
          sizes={wide ? "76px" : "40px"}
          className={`object-contain ${invert ? "invert" : ""}`}
        />
      </span>
    );
  }

  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-muted text-[11px] font-medium tracking-wide text-foreground/90">
      {children}
    </span>
  );
}
