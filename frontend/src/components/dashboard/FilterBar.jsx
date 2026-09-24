import { Search, SlidersHorizontal } from "lucide-react";

export default function FilterBar({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  filters = [],
  showFilterButton = true,
  onApply,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 dark:text-[#8A968C]" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue ?? ""}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#f4f6f4] dark:bg-[#152019] border border-transparent dark:border-[#293227] text-sm text-ink-900 dark:text-[#F3F6F1] placeholder:text-ink-400 dark:placeholder:text-[#8A968C] focus:outline-none focus:ring-2 focus:ring-leaf-500/30 focus:bg-white dark:focus:bg-[#17221B] focus:border-line dark:focus:border-[#293227]"
        />
      </div>

      {filters.map((filter) => {
        const isConfig = typeof filter === "object";
        const key = isConfig ? filter.name || filter.label : filter;
        const options = isConfig ? filter.options : [filter];

        return (
          <select
            key={key}
            name={isConfig ? filter.name : undefined}
            aria-label={isConfig ? filter.label || filter.name : filter}
            value={isConfig ? filter.value : undefined}
            defaultValue={isConfig ? undefined : filter}
            onChange={(e) => filter.onChange?.(e.target.value)}
            className="text-sm border border-line dark:border-[#293227] rounded-lg px-3 py-2.5 text-ink-600 dark:text-[#F3F6F1] bg-white dark:bg-[#17221B] focus:outline-none min-w-[140px]"
          >
            {options.map((option) => (
              <option key={option} value={option} className="dark:bg-[#17221B] dark:text-[#F3F6F1]">
                {option}
              </option>
            ))}
          </select>
        );
      })}

      {showFilterButton && (
        <button
          type="button"
          onClick={onApply}
          className="flex items-center gap-2 text-sm font-medium border border-line dark:border-[#293227] rounded-lg px-4 py-2.5 bg-leaf-50 dark:bg-leaf-950/40 text-leaf-600 dark:text-leaf-400 hover:bg-leaf-100 dark:hover:bg-leaf-900/50 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter
        </button>
      )}
    </div>
  );
}
