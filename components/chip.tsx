import { site, type Chip as ChipData } from "@/content/site";

export function toolIcon(name: string) {
  return site.tools.items.find((item) => item.name.toLowerCase() === name.toLowerCase())?.icon;
}

export function ToolChip({ name, icon, plain = false }: { name: string; icon: string; plain?: boolean }) {
  return (
    <span
      className={
        plain
          ? "inline-flex items-center gap-1.5 text-[13px] font-medium leading-[18px] text-foreground/90"
          : "inline-flex items-center gap-1 rounded-md border border-white/10 px-1.5 py-0.5 align-middle text-[12px] font-medium leading-[18px] text-foreground/90"
      }
    >
      {/* Tiny SVG icons. next/image does not optimize SVG. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt="" className="size-3.5 object-contain select-none" />
      {name}
    </span>
  );
}

export function Chip({ name }: ChipData) {
  const icon = toolIcon(name);
  if (!icon) return null;
  return <ToolChip name={name} icon={icon} />;
}

export function ChipRow({ chips }: { chips: ChipData[] }) {
  const shown = chips.filter((chip) => toolIcon(chip.name));
  if (shown.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((chip) => (
        <Chip key={chip.name} {...chip} />
      ))}
    </div>
  );
}
