const colorMap = {
  accent: "var(--color-accent)",
  blue: "var(--color-blue)",
  violet: "var(--color-violet)",
  amber: "var(--color-amber)",
};

export default function ProgressRing({ value, size = 56, stroke = 5, color = "accent" }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-canvas)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colorMap[color]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="[transition-property:stroke-dashoffset,stroke] duration-700 ease-out"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-mono text-[13px] font-medium tabular-nums text-ink">
        {value}%
      </span>
    </div>
  );
}
