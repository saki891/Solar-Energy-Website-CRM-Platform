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
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between px-6 pt-6 pb-4 sticky top-0 bg-white border-b border-line">
          <div>
            <h2 className="text-lg font-semibold text-ink-900">{title}</h2>
            {subtitle && <p className="text-sm text-ink-600 mt-0.5">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 grid place-items-center rounded-lg text-ink-400 hover:bg-[#f4f6f4] hover:text-ink-700 transition-colors shrink-0"
          >
            <X className="w-[18px] h-[18px]" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
