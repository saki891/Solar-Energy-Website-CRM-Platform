import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

// Plain wrapper — no router dependency. Each dashboard page uses this
// directly so it can be dropped into any route as a single, complete component.
export default function DashboardShell({ active, tagline, searchPlaceholder, onNavigate, children }) {
  return (
    <div className="flex min-h-screen bg-[#f6f8f6]">
      <Sidebar active={active} tagline={tagline} onNavigate={onNavigate} />
      <div className="flex-1 min-w-0">
        <Topbar searchPlaceholder={searchPlaceholder} />
        {children}
      </div>
    </div>
  );
}
