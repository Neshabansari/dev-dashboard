const base =
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none";

const variants = {
  primary: "bg-accent-solid text-white hover:opacity-90",
  secondary: "bg-surface text-ink border border-line-strong hover:bg-canvas",
  ghost: "text-ink-muted hover:text-ink hover:bg-canvas",
  danger: "bg-danger-solid text-white hover:opacity-90",
};

const sizes = {
  sm: "h-8 px-3",
  md: "h-9 px-4",
  lg: "h-11 px-5 text-[15px]",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon: Icon,
  ...props
}) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {Icon && <Icon size={16} strokeWidth={2} />}
      {children}
    </button>
  );
}
