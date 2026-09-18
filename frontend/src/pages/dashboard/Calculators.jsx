import React, { useState } from "react";
import {
  Settings2,
  Search,
  Eye,
  Trash2,
  SunMedium,
  Zap,
  Clock,
  Sprout,
  X,
  Calculator,
  TrendingUp,
  IndianRupee,
  Calendar,
} from "lucide-react";

// Seed data for calculator submissions
const INITIAL_SUBMISSIONS = [
  {
    id: "sub-1",
    name: "Rajesh Sharma",
    phone: "+91 98765 43210",
    propertyType: "Residential",
    monthlyBill: 8500,
    roofArea: 650,
    systemSizeKW: 6.5,
    annualSavings: 73440,
    date: "2026-09-15",
  },
  {
    id: "sub-2",
    name: "SunTech Logistics",
    phone: "+91 98123 45678",
    propertyType: "Industrial",
    monthlyBill: 65000,
    roofArea: 5200,
    systemSizeKW: 52,
    annualSavings: 561600,
    date: "2026-09-14",
  },
  {
    id: "sub-3",
    name: "Ananya Gupta",
    phone: "+91 97654 32109",
    propertyType: "Residential",
    monthlyBill: 4200,
    roofArea: 350,
    systemSizeKW: 3.2,
    annualSavings: 36288,
    date: "2026-09-12",
  },
  {
    id: "sub-4",
    name: "GreenPlaza Retail",
    phone: "+91 99887 76655",
    propertyType: "Commercial",
    monthlyBill: 28000,
    roofArea: 2100,
    systemSizeKW: 22,
    annualSavings: 237600,
    date: "2026-09-10",
  },
  {
    id: "sub-5",
    name: "Vikram Malhotra",
    phone: "+91 96543 21098",
    propertyType: "Residential",
    monthlyBill: 12000,
    roofArea: 950,
    systemSizeKW: 9.5,
    annualSavings: 102600,
    date: "2026-09-08",
  },
];

// Helper to style property type badges
function getPropertyTypeBadge(type) {
  switch (type) {
    case "Residential":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/50";
    case "Commercial":
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/50";
    case "Industrial":
      return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/50";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-800";
  }
}

export default function Calculators() {
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("All");

  // Modals state
  const [selectedSubmission, setSelectedSubmission] = useState(null); // for detail modal
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Calculation Settings State
  const [settings, setSettings] = useState({
    electricityRate: 8, // ₹ per unit
    generationPerKW: 120, // units/month per kW
    installationCostPerKW: 55000, // ₹ per kW
    billOffsetPercent: 85, // %
  });

  // Filter logic
  const filteredSubmissions = submissions.filter((sub) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q || sub.name.toLowerCase().includes(q) || sub.phone.toLowerCase().includes(q);
    const matchesType =
      propertyFilter === "All" || sub.propertyType === propertyFilter;
    return matchesQuery && matchesType;
  });

  // Computed live stats across all submissions
  const totalSubmissions = submissions.length;
  const avgSystemSize =
    totalSubmissions > 0
      ? (
          submissions.reduce((acc, curr) => acc + curr.systemSizeKW, 0) /
          totalSubmissions
        ).toFixed(1)
      : "0.0";

  const avgAnnualSavings =
    totalSubmissions > 0
      ? Math.round(
          submissions.reduce((acc, curr) => acc + curr.annualSavings, 0) /
            totalSubmissions
        )
      : 0;

  const handleDeleteSubmission = (id) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setIsSettingsOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Calculators
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
            Savings estimates submitted through the public calculator.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsSettingsOpen(true)}
          className="inline-flex items-center gap-2 border border-[#1F5C3E] text-[#1F5C3E] dark:border-[#4ADE80] dark:text-[#4ADE80] hover:bg-[#1F5C3E]/10 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Settings2 className="w-4 h-4" />
          <span>Calculation Settings</span>
        </button>
      </div>

      {/* Summary Cards (4-column grid) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Submissions */}
        <div className="bg-white dark:bg-[#17221B] border border-gray-200 dark:border-[#293227] rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Submissions
            </span>
            <div className="w-8 h-8 rounded-full bg-[#EFF3EC] dark:bg-[#1C2A21] text-[#1F5C3E] dark:text-[#4ADE80] flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {totalSubmissions}
          </p>
        </div>

        {/* Card 2: Average System Size */}
        <div className="bg-white dark:bg-[#17221B] border border-gray-200 dark:border-[#293227] rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Avg System Size
            </span>
            <div className="w-8 h-8 rounded-full bg-[#EFF3EC] dark:bg-[#1C2A21] text-[#1F5C3E] dark:text-[#4ADE80] flex items-center justify-center">
              <SunMedium className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {avgSystemSize} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">kW</span>
          </p>
        </div>

        {/* Card 3: Average Annual Savings */}
        <div className="bg-white dark:bg-[#17221B] border border-gray-200 dark:border-[#293227] rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Avg Annual Savings
            </span>
            <div className="w-8 h-8 rounded-full bg-[#EFF3EC] dark:bg-[#1C2A21] text-[#1F5C3E] dark:text-[#4ADE80] flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            ₹{avgAnnualSavings.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Card 4: This Week */}
        <div className="bg-white dark:bg-[#17221B] border border-gray-200 dark:border-[#293227] rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              This Week
            </span>
            <div className="w-8 h-8 rounded-full bg-[#EFF3EC] dark:bg-[#1C2A21] text-[#1F5C3E] dark:text-[#4ADE80] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {totalSubmissions}
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#17221B] border border-gray-200 dark:border-[#293227] rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1F5C3E]/30 focus:border-[#1F5C3E] transition-colors"
          />
        </div>

        {/* Property Type Dropdown Filter */}
        <div className="w-full sm:w-56">
          <select
            value={propertyFilter}
            onChange={(e) => setPropertyFilter(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white dark:bg-[#17221B] border border-gray-200 dark:border-[#293227] rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F5C3E]/30 focus:border-[#1F5C3E] transition-colors cursor-pointer"
          >
            <option value="All">All Property Types</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white dark:bg-[#17221B] border border-gray-200 dark:border-[#293227] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-sm border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-[#0E1712]/80 border-b border-gray-200 dark:border-[#293227] text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">Name</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Property Type</th>
                <th className="py-3.5 px-4">Monthly Bill</th>
                <th className="py-3.5 px-4">System Size</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#293227]/60 text-gray-800 dark:text-gray-200">
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-gray-50/70 dark:hover:bg-[#152019]/60 transition-colors"
                  >
                    <td className="py-3.5 px-5 font-semibold text-gray-900 dark:text-white">
                      {sub.name}
                    </td>

                    <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">
                      {sub.phone}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getPropertyTypeBadge(
                          sub.propertyType
                        )}`}
                      >
                        {sub.propertyType}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-gray-900 dark:text-white font-medium">
                      ₹{sub.monthlyBill.toLocaleString("en-IN")}
                    </td>

                    <td className="py-3.5 px-4 text-gray-900 dark:text-white font-medium">
                      {sub.systemSizeKW} kW
                    </td>

                    <td className="py-3.5 px-4 text-gray-500 dark:text-gray-400 text-xs">
                      {sub.date}
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <div className="inline-flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setSelectedSubmission(sub)}
                          title="View Submission Details"
                          className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-[#293227] transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSubmission(sub.id)}
                          title="Delete Submission"
                          className="p-1.5 text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center text-gray-500 dark:text-gray-400 text-sm"
                  >
                    No submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL (Eye Icon View) */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#17221B] border border-gray-200 dark:border-[#293227] rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 dark:border-[#293227] pb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  {selectedSubmission.name}
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPropertyTypeBadge(
                      selectedSubmission.propertyType
                    )}`}
                  >
                    {selectedSubmission.propertyType}
                  </span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Contact: {selectedSubmission.phone}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2x2 Grid of Result Stat Boxes */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* Box 1: Recommended System Size */}
              <div className="bg-[#EFF3EC] dark:bg-[#1C2A21] border border-[#1F5C3E]/20 dark:border-[#4ADE80]/20 rounded-xl p-3.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1F5C3E] dark:text-[#4ADE80] mb-1">
                  <SunMedium className="w-4 h-4" />
                  <span>Recommended System</span>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {selectedSubmission.systemSizeKW} kW
                </p>
              </div>

              {/* Box 2: Annual Savings */}
              <div className="bg-[#EFF3EC] dark:bg-[#1C2A21] border border-[#1F5C3E]/20 dark:border-[#4ADE80]/20 rounded-xl p-3.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1F5C3E] dark:text-[#4ADE80] mb-1">
                  <Zap className="w-4 h-4" />
                  <span>Annual Savings</span>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  ₹{selectedSubmission.annualSavings.toLocaleString("en-IN")}
                </p>
              </div>

              {/* Box 3: Payback Period */}
              <div className="bg-[#EFF3EC] dark:bg-[#1C2A21] border border-[#1F5C3E]/20 dark:border-[#4ADE80]/20 rounded-xl p-3.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1F5C3E] dark:text-[#4ADE80] mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Payback Period</span>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {(
                    (selectedSubmission.systemSizeKW * settings.installationCostPerKW) /
                    selectedSubmission.annualSavings
                  ).toFixed(1)}{" "}
                  yrs
                </p>
              </div>

              {/* Box 4: CO2 Reduction */}
              <div className="bg-[#EFF3EC] dark:bg-[#1C2A21] border border-[#1F5C3E]/20 dark:border-[#4ADE80]/20 rounded-xl p-3.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1F5C3E] dark:text-[#4ADE80] mb-1">
                  <Sprout className="w-4 h-4" />
                  <span>CO₂ Offset / yr</span>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {(selectedSubmission.systemSizeKW * 1.2).toFixed(1)} tons
                </p>
              </div>
            </div>

            {/* Submitter Detail Info Lines */}
            <div className="space-y-2 border-t border-gray-100 dark:border-[#293227] pt-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Monthly Bill:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ₹{selectedSubmission.monthlyBill.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Roof Area:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {selectedSubmission.roofArea} sq. ft.
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Submission Date:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {selectedSubmission.date}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="bg-[#1F5C3E] hover:bg-[#184931] text-white text-sm font-medium rounded-xl px-5 py-2.5 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATION SETTINGS MODAL */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#17221B] border border-gray-200 dark:border-[#293227] rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 dark:border-[#293227] pb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Calculation Settings
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  These values control how the public calculator estimates savings.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Electricity Rate (₹ / unit)
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={settings.electricityRate}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      electricityRate: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-[#0E1712] border border-gray-200 dark:border-[#293227] rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F5C3E]/30 focus:border-[#1F5C3E] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Generation per kW (units / month)
                </label>
                <input
                  type="number"
                  min="1"
                  value={settings.generationPerKW}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      generationPerKW: parseInt(e.target.value, 10) || 0,
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-[#0E1712] border border-gray-200 dark:border-[#293227] rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F5C3E]/30 focus:border-[#1F5C3E] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Installation Cost per kW (₹)
                </label>
                <input
                  type="number"
                  min="1000"
                  step="1000"
                  value={settings.installationCostPerKW}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      installationCostPerKW: parseInt(e.target.value, 10) || 0,
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-[#0E1712] border border-gray-200 dark:border-[#293227] rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F5C3E]/30 focus:border-[#1F5C3E] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Bill Offset (%)
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={settings.billOffsetPercent}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      billOffsetPercent: parseInt(e.target.value, 10) || 0,
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-[#0E1712] border border-gray-200 dark:border-[#293227] rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F5C3E]/30 focus:border-[#1F5C3E] transition-colors"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100 dark:border-[#293227]">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#293227] rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1F5C3E] hover:bg-[#184931] text-white text-sm font-medium rounded-xl px-4 py-2.5 transition-colors shadow-sm cursor-pointer"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
