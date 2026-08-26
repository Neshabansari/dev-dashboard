import { ArrowRight } from "lucide-react";

const colorMap = {
  accent: "bg-accent-tint text-accent-hover",
  blue: "bg-blue-tint text-blue",
  violet: "bg-violet-tint text-violet",
  amber: "bg-amber-tint text-amber",
};

const borderHoverMap = {
  accent: "hover:border-accent/50",
  blue: "hover:border-blue/50",
  violet: "hover:border-violet/50",
  amber: "hover:border-amber/50",
};

export default function StatCard({ label, value, icon: Icon, color = "accent", trend, onClick }) {
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      onClick={onClick}
      type={onClick ? "button" : undefined}
      className={`group w-full rounded-xl border border-line bg-surface p-5 text-left [transition-property:background-color,border-color,color,box-shadow,transform] duration-200 ease-out ${
        onClick
          ? `cursor-pointer motion-safe:hover:scale-[1.02] hover:shadow-card-hover ${borderHoverMap[color]} focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2`
          : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <p className="text-[13px] font-medium text-ink-muted">{label}</p>
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-200 ease-out ${colorMap[color]} ${
            onClick ? "motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:scale-110" : ""
          }`}
        >
          <Icon size={16} strokeWidth={2} />
        </span>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <p
          className={`origin-left font-display text-[26px] font-semibold leading-none tracking-tight text-ink transition-transform duration-200 ease-out ${
            onClick ? "motion-safe:group-hover:scale-[1.05]" : ""
          }`}
        >
          {value}
        </p>
        {onClick && (
          <ArrowRight
            size={15}
            strokeWidth={2}
            className="mb-0.5 text-ink-faint opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-ink-muted group-hover:opacity-100"
          />
        )}
      </div>
      {trend && (
        <p className="mt-2.5 text-xs text-ink-muted">
          <span className={trend.positive ? "font-medium text-accent-hover" : "font-medium text-danger"}>
            {trend.positive ? "+" : ""}
            {trend.value}
          </span>{" "}
          {trend.label}
        </p>
      )}
    </Tag>
  );
}
