import { ChevronDown } from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";
import LeadsChart from "../../components/dashboard/LeadsChart";
import SourceDonut from "../../components/dashboard/SourceDonut";
import RecentLeads from "../../components/dashboard/RecentLeads";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentActivity from "../../components/dashboard/RecentActivity";
import PromoBanner from "../../components/dashboard/PromoBanner";
import { statCards } from "../../data/dashboardData";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 dark:text-[#F3F6F1]">Dashboard</h1>
          <p className="text-ink-600 dark:text-[#B9C4BB] mt-1 text-sm sm:text-base">
            Welcome back, Admin! Here's what's happening with your solar business today.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 text-sm font-medium border border-line dark:border-[#293227] rounded-lg px-4 py-2.5 bg-white dark:bg-[#17221B] text-ink-900 dark:text-[#F3F6F1] focus:outline-none transition-colors"
        >
          Last 30 Days
          <ChevronDown className="w-4 h-4 text-ink-400 dark:text-[#8A968C]" />
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
  );
}
