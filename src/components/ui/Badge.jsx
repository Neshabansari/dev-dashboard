const colorMap = {
  accent: "bg-accent-tint text-accent-hover",
  blue: "bg-blue-tint text-blue",
  violet: "bg-violet-tint text-violet",
  amber: "bg-amber-tint text-amber",
  danger: "bg-danger-tint text-danger",
  "ink-faint": "bg-canvas text-ink-muted border border-line",
};

export default function Badge({ children, color = "ink-faint", dot = false }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium leading-none ${colorMap[color]}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            color === "ink-faint" ? "bg-ink-faint" : "bg-current"
          }`}
        />
      )}
      {children}
    </span>
  );
}
