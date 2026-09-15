import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { leadsBySource } from "../../data/dashboardData";

const total = leadsBySource.reduce((sum, s) => sum + s.value, 0);

export default function SourceDonut() {
  return (
    <div className="bg-white rounded-2xl border border-line p-5 sm:p-6 w-full lg:w-[360px] shrink-0">
      <h3 className="font-semibold text-ink-900 mb-4">Leads by Source</h3>

      <div className="flex items-center gap-6">
        <div className="relative w-40 h-40 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={leadsBySource}
                dataKey="value"
                nameKey="name"
                innerRadius={52}
                outerRadius={72}
                paddingAngle={2}
                stroke="none"
              >
                {leadsBySource.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-ink-900">{total}</span>
            <span className="text-xs text-ink-400 -mt-0.5">Total Leads</span>
          </div>
        </div>

        <ul className="space-y-2.5 text-sm flex-1">
          {leadsBySource.map((s) => (
            <li key={s.name} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-ink-600">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: s.color }}
                />
                {s.name}
              </span>
              <span className="font-medium text-ink-900">{s.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
