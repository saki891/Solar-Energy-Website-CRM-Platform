import {
  LayoutDashboard,
  Users,
  UserRound,
  ClipboardList,
  FolderKanban,
  Calculator,
  FileText,
  HelpCircle,
  User,
  Settings,
  LogOut,
  Leaf,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Leads", icon: Users },
  { label: "Customers", icon: UserRound },
  { label: "Site Surveys", icon: ClipboardList },
  { label: "Projects", icon: FolderKanban },
  { label: "Calculators", icon: Calculator },
  { label: "Blog Management", icon: FileText },
  { label: "FAQs", icon: HelpCircle },
  { label: "Users", icon: User },
  { label: "Settings", icon: Settings },
];

// `active` + `onNavigate` are plain props (no router dependency), so whoever
// wires up routing later can pass their own navigate function, e.g.:
//   <Sidebar active="Leads" onNavigate={(label) => navigate(routeFor(label))} />
export default function Sidebar({ active = "Dashboard", onNavigate, tagline = ["Powering a", "Sustainable Future"] }) {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-forest-950 text-white/80 h-screen sticky top-0">
      <div className="flex items-center gap-2 px-6 py-6">
        <span className="grid place-items-center w-9 h-9 rounded-full bg-leaf-500/20">
          <Leaf className="w-5 h-5 text-leaf-400" />
        </span>
        <div className="leading-tight">
          <p className="text-white font-bold text-lg tracking-tight">SOLARA</p>
          <p className="text-[11px] text-white/50">Clean Energy, Brighter Tomorrow.</p>
        </div>
      </div>

      <nav className="flex-1 px-3 mt-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.label === active;
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate?.(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-leaf-600/90 text-white font-medium"
                  : "hover:bg-white/5 text-white/70"
              }`}
            >
              <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="px-4 pb-3 pt-4">
        <div className="rounded-xl bg-white/5 px-3 py-3 flex items-center gap-2.5">
          <Leaf className="w-5 h-5 text-leaf-400 shrink-0" />
          <p className="text-[12px] leading-tight text-white/60">
            {tagline[0]}
            <br />
            {tagline[1]}
          </p>
        </div>
      </div>

      <div className="p-3 border-t border-white/10">
        <button type="button" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white/90 transition-colors">
          <LogOut className="w-[18px] h-[18px]" />
          Logout
        </button>
      </div>
    </aside>
  );
}
