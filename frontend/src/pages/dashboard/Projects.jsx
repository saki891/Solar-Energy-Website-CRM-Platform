import React from "react";
import { FolderKanban } from "lucide-react";

export default function Projects() {
  const projectsList = [
    { id: 1, name: "Green Valley Solar Residence", category: "Residential", location: "Pune, MH", capacity: "12 kW", status: "In Progress" },
    { id: 2, name: "Apex Logistics Hub", category: "Commercial", location: "Navi Mumbai, MH", capacity: "250 kW", status: "Completed" },
    { id: 3, name: "Summit Steel Microgrid", category: "Industrial", location: "Nagpur, MH", capacity: "750 kW", status: "Planning" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Projects
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
            Track and manage active solar installations across all customer sites.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#17221B] border border-gray-200 dark:border-[#293227] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-[#0E1712]/80 border-b border-gray-200 dark:border-[#293227] text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">Project Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Capacity</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#293227]/60 text-gray-800 dark:text-gray-200">
              {projectsList.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50/70 dark:hover:bg-[#152019]/60 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-gray-900 dark:text-white">
                    {project.name}
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">{project.category}</td>
                  <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">{project.location}</td>
                  <td className="py-3.5 px-4 font-medium text-gray-900 dark:text-white">{project.capacity}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                      {project.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
