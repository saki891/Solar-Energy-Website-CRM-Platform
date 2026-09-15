import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page = 1, totalPages = 1, showing, onPageChange }) {
  const pages = [];
  const maxButtons = 5;

  if (totalPages <= maxButtons + 1) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, 2, 3, "...", totalPages);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
      {showing && <p className="text-sm text-ink-400 dark:text-[#8A968C]">{showing}</p>}
      <div className="flex items-center gap-1.5 ml-auto">
        <button
          type="button"
          onClick={() => onPageChange?.(Math.max(1, page - 1))}
          className="w-8 h-8 grid place-items-center rounded-lg border border-line dark:border-[#293227] text-ink-600 dark:text-[#B9C4BB] hover:bg-[#f4f6f4] dark:hover:bg-[#152019] disabled:opacity-40"
          disabled={page === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="px-1.5 text-ink-400 dark:text-[#8A968C] text-sm">
              ...
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange?.(p)}
              className={`w-8 h-8 grid place-items-center rounded-lg text-sm font-medium transition-colors ${
                p === page
                  ? "bg-leaf-600 text-white"
                  : "border border-line dark:border-[#293227] text-ink-600 dark:text-[#B9C4BB] hover:bg-[#f4f6f4] dark:hover:bg-[#152019]"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange?.(Math.min(totalPages, page + 1))}
          className="w-8 h-8 grid place-items-center rounded-lg border border-line dark:border-[#293227] text-ink-600 dark:text-[#B9C4BB] hover:bg-[#f4f6f4] dark:hover:bg-[#152019] disabled:opacity-40"
          disabled={page === totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
