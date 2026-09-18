import { Search, Bell, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import ProfileDropdown from "./ProfileDropdown";

export default function Topbar({ searchPlaceholder = "Search leads, customers, projects..." }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="flex items-center gap-4 px-5 sm:px-8 py-4 bg-white dark:bg-[#152019] border-b border-line dark:border-[#293227] sticky top-0 z-10 transition-colors duration-200">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 dark:text-gray-400" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#f4f6f4] dark:bg-[#0E1712] border border-transparent dark:border-[#293227] text-sm text-ink-900 dark:text-white placeholder:text-ink-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-leaf-500/30 focus:bg-white dark:focus:bg-[#0E1712] focus:border-line dark:focus:border-leaf-600 transition-colors"
        />
      </div>

      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full border border-line dark:border-[#293227] flex items-center justify-center bg-white dark:bg-[#0E1712] text-ink-600 dark:text-gray-200 hover:border-leaf-500 transition-colors focus:outline-none"
          aria-label="Toggle Theme"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-[#1F5C3E]" />
          )}
        </button>

        {/* Notification Bell */}
        <button type="button" className="relative w-9 h-9 grid place-items-center rounded-full bg-[#f4f6f4] dark:bg-[#0E1712] border border-transparent dark:border-[#293227] hover:bg-line dark:hover:bg-[#293227] transition-colors">
          <Bell className="w-[18px] h-[18px] text-ink-600 dark:text-gray-200" />
          <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] grid place-items-center rounded-full bg-red-500 text-white text-[10px] font-semibold">
            3
          </span>
        </button>

        {/* Admin Profile Dropdown */}
        <ProfileDropdown />
      </div>
    </header>
  );
}
