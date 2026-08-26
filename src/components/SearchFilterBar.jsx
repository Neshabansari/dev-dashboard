import { Search } from "lucide-react";

export default function SearchFilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search…",
  filters = [],
  trailing,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1 sm:max-w-xs">
        <Search
          size={15}
          strokeWidth={2}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
        />
        <input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          type="text"
          placeholder={searchPlaceholder}
          className="h-9 w-full rounded-lg border border-line bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-tint"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <select
            key={filter.label}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="h-9 rounded-lg border border-line bg-surface px-2.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-tint"
          >
            <option value="all">{filter.label}: All</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}
      </div>

      {trailing && <div className="sm:ml-auto">{trailing}</div>}
    </div>
  );
}
