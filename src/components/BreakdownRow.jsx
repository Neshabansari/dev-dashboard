const colorMap = {
  accent: "bg-accent",
  blue: "bg-blue",
  violet: "bg-violet",
  amber: "bg-amber",
  danger: "bg-danger",
  "ink-faint": "bg-ink-faint",
};

export default function BreakdownRow({ label, count, total, color = "accent" }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-[13px] text-ink-muted">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-canvas">
        <div
          className={`h-full rounded-full ${colorMap[color]} [transition-property:width,background-color] duration-500 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-16 shrink-0 text-right font-mono text-[12.5px] text-ink-faint">
        {count} · {pct}%
      </span>
    </div>
  );
}
