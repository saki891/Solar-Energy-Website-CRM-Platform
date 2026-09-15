import { Circle } from "lucide-react";

const styles = {
  New: "bg-blue-50 text-blue-accent",
  Contacted: "bg-amber-50 text-amber-accent",
  "Site Survey": "bg-leaf-100 text-leaf-600",
  Quoted: "bg-violet-50 text-violet-accent",
  Converted: "bg-leaf-100 text-leaf-600",
  Lost: "bg-red-50 text-red-500",
  Active: "bg-leaf-100 text-leaf-600",
  Inactive: "bg-red-50 text-red-500",
  Scheduled: "bg-blue-50 text-blue-accent",
  Completed: "bg-leaf-100 text-leaf-600",
  "In Progress": "bg-amber-50 text-amber-accent",
  Cancelled: "bg-red-50 text-red-500",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
        styles[status] ?? "bg-line text-ink-600"
      }`}
    >
      <Circle className="w-2 h-2 fill-current" strokeWidth={0} />
      {status}
    </span>
  );
}
