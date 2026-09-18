export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex items-center gap-1 border-b border-line overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const isActive = tab.label === active;
        return (
          <button
            key={tab.label}
            type="button"
            onClick={() => onChange?.(tab.label)}
            className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
              isActive
                ? "border-leaf-600 text-leaf-600"
                : "border-transparent text-ink-600 hover:text-ink-900"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && <span className="ml-1.5 text-ink-400">({tab.count})</span>}
          </button>
        );
      })}
    </div>
  );
}
