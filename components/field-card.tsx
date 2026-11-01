import { ChipRow } from "@/components/chip";
import { Cover } from "@/components/cover";
import type { FieldItem } from "@/content/site";

export function FieldCard({ item }: { item: FieldItem }) {
  return (
    <article className="flex flex-col gap-3">
      <Cover {...item.cover} />
      <h3 className="font-display text-xl tracking-tight">{item.title}</h3>
      <p className="font-mono text-[12px] text-muted-foreground">
        {item.date}
        <span className="px-1.5 text-white/20">/</span>
        {item.place}
      </p>
      <p className="text-[14.5px] leading-[1.7] text-foreground/90">{item.result}</p>
      <ChipRow chips={item.tags} />
    </article>
  );
}
