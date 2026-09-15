import { Search, SlidersHorizontal } from "lucide-react";

export default function FilterBar({ searchPlaceholder, filters = [], showFilterButton = true }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#f4f6f4] border border-transparent text-sm placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-leaf-500/30 focus:bg-white focus:border-line"
        />
      </div>

      {filters.map((f) => (
        <select
          key={f}
          className="text-sm border border-line rounded-lg px-3 py-2.5 text-ink-600 bg-white focus:outline-none min-w-[140px]"
          defaultValue={f}
        >
          <option>{f}</option>
        </select>
      ))}

      {showFilterButton && (
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-medium border border-line rounded-lg px-4 py-2.5 bg-leaf-50 text-leaf-600 hover:bg-leaf-100 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter
        </button>
      )}
    </div>
  );
}
