export default function PageHeader({ title, subtitle, actionLabel, actionIcon: ActionIcon, onAction }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 dark:text-[#F3F6F1]">{title}</h1>
        {subtitle && <p className="text-ink-600 dark:text-[#B9C4BB] mt-1 text-sm sm:text-base">{subtitle}</p>}
      </div>

      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 bg-[#1F5C3E] hover:bg-[#184A32] dark:bg-[#3FA46A] dark:hover:bg-[#4CBE7C] text-white dark:text-[#0E1712] text-sm font-semibold rounded-lg px-4 py-2.5 transition-colors shadow-sm"
        >
          {ActionIcon && <ActionIcon className="w-4 h-4" />}
          {actionLabel}
        </button>
      )}
    </div>
  );
}
