export default function PageHeader({ title, subtitle, actionLabel, actionIcon: ActionIcon, onAction }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink-900">{title}</h1>
        {subtitle && <p className="text-ink-600 mt-1 text-sm sm:text-base">{subtitle}</p>}
      </div>

      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="flex items-center gap-2 bg-leaf-600 hover:bg-leaf-700 text-white text-sm font-medium rounded-lg px-4 py-2.5 transition-colors shadow-sm"
        >
          {ActionIcon && <ActionIcon className="w-4 h-4" />}
          {actionLabel}
        </button>
      )}
    </div>
  );
}
