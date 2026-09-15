import { Search, Bell, ChevronDown } from "lucide-react";

export default function Topbar({ searchPlaceholder = "Search leads, customers, projects..." }) {
  return (
    <header className="flex items-center gap-4 px-5 sm:px-8 py-4 bg-white border-b border-line sticky top-0 z-10">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#f4f6f4] border border-transparent text-sm placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-leaf-500/30 focus:bg-white focus:border-line"
        />
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button type="button" className="relative w-10 h-10 grid place-items-center rounded-full bg-[#f4f6f4] hover:bg-line transition-colors">
          <Bell className="w-[18px] h-[18px] text-ink-600" />
          <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] grid place-items-center rounded-full bg-red-500 text-white text-[10px] font-semibold">
            3
          </span>
        </button>

        <button type="button" className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-full bg-forest-900 text-white grid place-items-center text-sm font-semibold">
            AS
          </span>
          <span className="hidden sm:block text-left leading-tight">
            <span className="block text-sm font-medium text-ink-900">Admin</span>
            <span className="block text-xs text-ink-400">admin@solara.com</span>
          </span>
          <ChevronDown className="w-4 h-4 text-ink-400" />
        </button>
      </div>
    </header>
  );
}
