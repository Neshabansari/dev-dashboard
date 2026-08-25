const colorMap = {
  accent: "bg-accent-tint text-accent-hover",
  blue: "bg-blue-tint text-blue",
  violet: "bg-violet-tint text-violet",
  amber: "bg-amber-tint text-amber",
};

const sizeMap = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-10 w-10 text-sm",
};

export default function Avatar({ initials, color = "accent", size = "md", ring = false }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold font-display ${colorMap[color]} ${sizeMap[size]} ${
        ring ? "ring-2 ring-surface" : ""
      }`}
      title={initials}
    >
      {initials}
    </span>
  );
}
