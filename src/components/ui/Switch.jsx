export default function Switch({ checked, onChange, label, description }) {
  return (
    <label
      className="flex cursor-pointer items-start justify-between gap-4 py-3"
      onClick={(e) => {
        e.preventDefault();
        onChange(!checked);
      }}
    >
      <span className="min-w-0">
        <span className="block text-[13.5px] font-medium text-ink">{label}</span>
        {description && (
          <span className="mt-0.5 block text-[12.5px] text-ink-muted">{description}</span>
        )}
      </span>
      <span
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange(!checked);
          }
        }}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-150 ${
          checked ? "bg-accent-solid" : "bg-line-strong"
        }`}
      >
        <span
          className={`inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-soft transition-transform duration-150 ${
            checked ? "translate-x-[22px]" : "translate-x-[3px]"
          }`}
        />
      </span>
    </label>
  );
}
