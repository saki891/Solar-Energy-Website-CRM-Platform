import { Users, CalendarDays, FolderOpen, CheckCircle2, ArrowUp } from "lucide-react";

const icons = {
  users: Users,
  calendar: CalendarDays,
  folder: FolderOpen,
  check: CheckCircle2,
};

export default function StatCard({ label, value, change, icon, tint }) {
  const Icon = icons[icon] ?? Users;
  return (
    <div className="bg-white rounded-2xl border border-line p-5 flex items-start gap-4">
      <span className={`shrink-0 w-12 h-12 rounded-xl grid place-items-center ${tint}`}>
        <Icon className="w-6 h-6" strokeWidth={2} />
      </span>
      <div>
        <p className="text-sm text-ink-600">{label}</p>
        <p className="text-2xl font-bold text-ink-900 mt-0.5">{value}</p>
        <p className="flex items-center gap-1 text-xs text-leaf-600 font-medium mt-1">
          <ArrowUp className="w-3.5 h-3.5" />
          {change}
        </p>
      </div>
    </div>
  );
}
