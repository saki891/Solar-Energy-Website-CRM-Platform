import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ open, title, subtitle, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-[#17221B] border border-transparent dark:border-[#293227] w-full max-w-lg rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between px-6 pt-6 pb-4 sticky top-0 bg-white dark:bg-[#17221B] border-b border-line dark:border-[#293227]">
          <div>
            <h2 className="text-lg font-semibold text-ink-900 dark:text-[#F3F6F1]">{title}</h2>
            {subtitle && <p className="text-sm text-ink-600 dark:text-[#B9C4BB] mt-0.5">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 grid place-items-center rounded-lg text-ink-400 dark:text-[#8A968C] hover:bg-[#f4f6f4] dark:hover:bg-[#152019] hover:text-ink-700 dark:hover:text-[#F3F6F1] transition-colors shrink-0"
          >
            <X className="w-[18px] h-[18px]" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
