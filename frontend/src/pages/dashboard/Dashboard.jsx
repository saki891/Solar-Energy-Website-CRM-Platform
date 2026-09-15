import { ChevronDown } from "lucide-react";
import DashboardShell from "../../components/dashboard/DashboardShell";
import StatCard from "../../components/dashboard/StatCard";
import LeadsChart from "../../components/dashboard/LeadsChart";
import SourceDonut from "../../components/dashboard/SourceDonut";
import RecentLeads from "../../components/dashboard/RecentLeads";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentActivity from "../../components/dashboard/RecentActivity";
import PromoBanner from "../../components/dashboard/PromoBanner";
import { statCards } from "../../data/dashboardData";

// Drop this in as a route element directly, e.g. <Route path="/dashboard" element={<Dashboard />} />
export default function Dashboard() {
  return (
    <DashboardShell
      active="Dashboard"
      tagline={["Good Energy,", "Brighter Tomorrows"]}
      searchPlaceholder="Search leads, customers, projects..."
    >
      <div className="p-5 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-ink-900">Dashboard</h1>
            <p className="text-ink-600 mt-1 text-sm sm:text-base">
              Welcome back, Admin! Here's what's happening with your solar business today.
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 text-sm font-medium border border-line rounded-lg px-4 py-2.5 bg-white"
          >
            Last 30 Days
            <ChevronDown className="w-4 h-4 text-ink-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <StatCard key={card.id} {...card} />
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <LeadsChart />
          <SourceDonut />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <RecentLeads />
          </div>
          <div className="space-y-4">
            <QuickActions />
            <RecentActivity />
          </div>
        </div>

        <PromoBanner />
      </div>
    </DashboardShell>
  );
}
