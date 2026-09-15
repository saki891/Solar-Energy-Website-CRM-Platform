import { Plus, CalendarPlus, FolderPlus, Calculator } from "lucide-react";
import { quickActions } from "../../data/dashboardData";

const icons = {
  plus: Plus,
  calendar: CalendarPlus,
  folder: FolderPlus,
  calculator: Calculator,
};

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl border border-line p-5 sm:p-6">
      <h3 className="font-semibold text-ink-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => {
          const Icon = icons[action.icon] ?? Plus;
          return (
            <button
              key={action.id}
              type="button"
              className="flex flex-col items-start gap-2.5 rounded-xl border border-line p-4 text-left hover:border-leaf-500/40 hover:shadow-sm transition-all"
            >
              <span className={`w-9 h-9 rounded-lg grid place-items-center text-white ${action.tint}`}>
                <Icon className="w-[18px] h-[18px]" />
              </span>
              <span>
                <span className="block text-sm font-medium text-ink-900">{action.title}</span>
                <span className="block text-xs text-ink-400 mt-0.5">{action.subtitle}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
