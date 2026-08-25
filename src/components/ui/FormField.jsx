export function Field({ label, error, children, required }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-danger">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  );
}

const inputBase =
  "h-9 w-full rounded-lg border bg-surface px-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent-tint";

export function TextInput(props) {
  return (
    <input
      {...props}
      className={`${inputBase} ${props.error ? "border-danger" : "border-line focus:border-accent"} ${props.className || ""}`}
    />
  );
}

export function Select(props) {
  return (
    <select
      {...props}
      className={`${inputBase} ${props.error ? "border-danger" : "border-line focus:border-accent"} ${props.className || ""}`}
    />
  );
}
