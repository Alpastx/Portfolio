import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function SectionHeader({
  title,
  href,
  external = false,
  aside,
}: {
  title: string;
  href?: string;
  external?: boolean;
  aside?: React.ReactNode;
}) {
  const seeAllClass =
    "inline-flex flex-none items-center gap-1 text-[13px] text-muted-foreground transition-colors hover:text-foreground";

  const seeAll = href ? (
    external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={seeAllClass}>
        See all
        <ArrowUpRight className="size-3.5" strokeWidth={1.75} aria-hidden />
      </a>
    ) : (
      <Link href={href} className={seeAllClass}>
        See all
        <ArrowUpRight className="size-3.5" strokeWidth={1.75} aria-hidden />
      </Link>
    )
  ) : null;

  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 className="font-display text-[1.75rem] leading-none tracking-[-0.02em] italic">{title}</h2>
      {seeAll ?? aside}
    </div>
  );
}

export function PageTitle({ title }: { title: string }) {
  return <h1 className="font-display text-[2.5rem] leading-none tracking-[-0.03em] italic">{title}</h1>;
}
