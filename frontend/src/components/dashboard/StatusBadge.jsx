import { Circle } from "lucide-react";

const styles = {
  New: "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Contacted: "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "Site Survey": "bg-leaf-100 text-leaf-700 dark:bg-leaf-900/50 dark:text-leaf-300",
  Quoted: "bg-violet-50 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  Converted: "bg-leaf-100 text-leaf-700 dark:bg-leaf-900/50 dark:text-leaf-300",
  Lost: "bg-red-50 text-red-600 dark:bg-red-900/40 dark:text-red-300",
  Active: "bg-leaf-100 text-leaf-700 dark:bg-leaf-900/50 dark:text-leaf-300",
  Inactive: "bg-red-50 text-red-600 dark:bg-red-900/40 dark:text-red-300",
  Scheduled: "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Completed: "bg-leaf-100 text-leaf-700 dark:bg-leaf-900/50 dark:text-leaf-300",
  "In Progress": "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Planning: "bg-sky-50 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  "On Hold": "bg-orange-50 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  Cancelled: "bg-red-50 text-red-600 dark:bg-red-900/40 dark:text-red-300",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
        styles[status] ?? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
      }`}
    >
      <Circle className="w-2 h-2 fill-current" strokeWidth={0} />
      {status}
    </span>
  );
}
