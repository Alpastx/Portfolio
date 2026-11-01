export function Cover({
  from,
  to,
  label,
}: {
  from: string;
  to: string;
  label: string;
}) {
  return (
    <div
      className="relative flex aspect-[2/1] items-end overflow-hidden rounded-xl border border-white/10 p-4"
      style={{ background: `linear-gradient(145deg, ${from}, ${to})` }}
    >
      <span className="font-display text-2xl tracking-tight text-white/80">{label}</span>
    </div>
  );
}
