import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Leaf,
  LayoutDashboard,
  Users2,
  UserSquare2,
  ClipboardCheck,
  FolderKanban,
  Calculator,
  FileText,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";
import Topbar from "../components/dashboard/Topbar";

export default function DashboardLayout() {
  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, end: true },
    { label: "Leads", path: "/dashboard/leads", icon: Users2 },
    { label: "Customers", path: "/dashboard/customers", icon: UserSquare2 },
    { label: "Site Surveys", path: "/dashboard/site-surveys", icon: ClipboardCheck },
    { label: "Projects", path: "/dashboard/projects", icon: FolderKanban },
    { label: "Calculators", path: "/dashboard/calculators", icon: Calculator },
    { label: "Blog Management", path: "/dashboard/blog", icon: FileText },
    { label: "FAQs", path: "/dashboard/faqs", icon: HelpCircle },
  ];

  return (
    <div className="flex min-h-screen bg-[#FBFAF6] dark:bg-[#0E1712] font-sans transition-colors duration-200">
      {/* Dark Sidebar */}
      <aside className="w-64 min-h-screen bg-[#0E1712] dark:bg-[#0A0F0B] text-white flex flex-col justify-between p-4 flex-shrink-0 border-r border-[#293227] dark:border-[#1C2A21] transition-colors duration-200">
        <div>
          {/* Top Logo + Brand */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#1F5C3E] flex items-center justify-center flex-shrink-0 shadow-sm">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight leading-none text-white">SOLARA</span>
              <span className="text-[11px] font-medium tracking-tight text-white/60 mt-1">Admin Dashboard</span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#1F5C3E] text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <IconComponent className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="pt-4 mt-auto border-t border-white/10 space-y-1.5">
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#1F5C3E] text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Settings className="w-4 h-4 flex-shrink-0" />
            <span>Settings</span>
          </NavLink>

          <button
            type="button"
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors text-left focus:outline-none"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#FBFAF6] dark:bg-[#0E1712] transition-colors duration-200">
        <Topbar />
        <main className="flex-1 p-6 sm:p-8 bg-[#FBFAF6] dark:bg-[#0E1712] text-ink-900 dark:text-[#F3F6F1] transition-colors duration-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
