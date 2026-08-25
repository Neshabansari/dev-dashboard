const colorMap = {
  accent: "bg-accent",
  blue: "bg-blue",
  violet: "bg-violet",
  amber: "bg-amber",
};

export default function ProgressBar({ value, color = "accent", showLabel = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-canvas">
        <div
          className={`h-full rounded-full ${colorMap[color]} [transition-property:width,background-color] duration-500 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
      {showLabel && (
        <span className="font-mono text-xs tabular-nums text-ink-muted">{value}%</span>
      )}
    </div>
  );
}
