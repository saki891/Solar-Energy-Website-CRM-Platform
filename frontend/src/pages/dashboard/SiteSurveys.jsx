import { useEffect, useMemo, useState } from "react";
import { CalendarPlus, Download, MoreVertical, Pencil, Trash2 } from "lucide-react";
import PageHeader from "../../components/dashboard/PageHeader";
import Tabs from "../../components/dashboard/Tabs";
import FilterBar from "../../components/dashboard/FilterBar";
import StatusBadge from "../../components/dashboard/StatusBadge";
import Pagination from "../../components/dashboard/Pagination";
import Modal from "../../components/dashboard/Modal";
import { FormField, TextInput, SelectInput } from "../../components/dashboard/FormField";
import { surveyTabOrder } from "../../data/dashboardData";
import { todayISO } from "../../utils/dashboardDate";
import { surveyService } from "../../services/surveyService";

const tabFilterMap = {
  "All Surveys": null,
  Scheduled: "Scheduled",
  Completed: "Completed",
  Cancelled: "Cancelled",
};

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const surveyors = ["Rahul", "Priya", "Karan", "Neha"];

const emptyForm = {
  customerName: "",
  location: "",
  propertyType: "Residential",
  surveyDate: todayISO(),
  timeSlot: timeSlots[0],
  assignedTo: surveyors[0],
  status: "Scheduled",
};

export default function SiteSurveys() {
  const [surveys, setSurveys] = useState([]);
  const [tabCounts, setTabCounts] = useState({});
  const [activeTab, setActiveTab] = useState("All Surveys");
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [surveyorFilter, setSurveyorFilter] = useState("All Surveyors");
  const [propertyFilter, setPropertyFilter] = useState("All Property Types");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const [loadError, setLoadError] = useState("");

  const tabs = useMemo(
    () =>
      surveyTabOrder.map((label) => ({
        label,
        count: tabCounts[label] ?? 0,
      })),
    [tabCounts]
  );

  async function loadSurveys() {
    setLoading(true);
    setLoadError("");

    try {
      const params = {};
      const trimmedSearch = searchValue.trim();
      if (trimmedSearch) params.search = trimmedSearch;
      if (statusFilter && statusFilter !== "All Status" && statusFilter !== "All Statuses") {
        params.status = statusFilter;
      } else if (tabFilterMap[activeTab]) {
        params.status = tabFilterMap[activeTab];
      }
      if (surveyorFilter && surveyorFilter !== "All Surveyors") params.surveyor = surveyorFilter;
      if (propertyFilter && propertyFilter !== "All Property Types") params.property_type = propertyFilter;

      const response = await surveyService.getSurveys(params);
      const items = Array.isArray(response.items) ? response.items : [];
      setSurveys(items);
      setTabCounts(response.tabCounts ?? response.tab_counts ?? {});
    } catch (err) {
      setSurveys([]);
      setTabCounts({});
      setLoadError(err.message || "Unable to load site surveys.");
    } finally {
      setLoading(false);
    }
  }

  async function handleExport() {
    setExporting(true);
    setExportError("");
    try {
      const params = {};
      const trimmedSearch = searchValue.trim();
      if (trimmedSearch) params.search = trimmedSearch;
      if (statusFilter && statusFilter !== "All Status" && statusFilter !== "All Statuses") {
        params.status = statusFilter;
      } else if (tabFilterMap[activeTab]) {
        params.status = tabFilterMap[activeTab];
      }
      if (surveyorFilter && surveyorFilter !== "All Surveyors") params.surveyor = surveyorFilter;
      if (propertyFilter && propertyFilter !== "All Property Types") params.property_type = propertyFilter;

      const blob = await surveyService.exportSurveys(params);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "site-surveys.csv";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setExportError(err.message || "Unable to export site surveys.");
    } finally {
      setExporting(false);
    }
  }

  useEffect(() => {
    loadSurveys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, searchValue, statusFilter, surveyorFilter, propertyFilter]);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function openCreateModal() {
    setEditingSurvey(null);
    setForm(emptyForm);
    setModalOpen(true);
    setOpenMenuId(null);
  }

  function openEditModal(survey) {
    setEditingSurvey(survey);
    setForm({
      customerName: survey.customerName || "",
      location: survey.location || "",
      propertyType: survey.propertyType || "Residential",
      surveyDate: survey.surveyDate || todayISO(),
      timeSlot: survey.timeSlot || timeSlots[0],
      assignedTo: survey.assignedTo || surveyors[0],
      status: survey.status || "Scheduled",
    });
    setModalOpen(true);
    setOpenMenuId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.customerName.trim() || !form.location.trim() || !form.surveyDate) return;

    setSaving(true);

    try {
      const payload = {
        customerName: form.customerName.trim(),
        location: form.location.trim(),
        propertyType: form.propertyType,
        surveyDate: form.surveyDate,
        timeSlot: form.timeSlot,
        assignedTo: form.assignedTo,
        status: editingSurvey ? form.status : "Scheduled",
      };

      if (editingSurvey) {
        await surveyService.updateSurvey(editingSurvey.id, payload);
      } else {
        await surveyService.createSurvey(payload);
      }

      setForm(emptyForm);
      setModalOpen(false);
      setEditingSurvey(null);
      setActiveTab("All Surveys");
      setStatusFilter("All Status");
      setSurveyorFilter("All Surveyors");
      setPropertyFilter("All Property Types");
      await loadSurveys();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(survey) {
    if (!window.confirm(`Delete the survey for ${survey.customerName}?`)) return;
    setSaving(true);
    setLoadError("");
    try {
      await surveyService.deleteSurvey(survey.id);
      setOpenMenuId(null);
      await loadSurveys();
    } catch (err) {
      setLoadError(err.message || "Unable to delete site survey.");
    } finally {
      setSaving(false);
    }
  }

  const filtered = useMemo(() => {
    if (!activeTab || activeTab === "All Surveys") return surveys;
    return surveys.filter((survey) => survey.status === tabFilterMap[activeTab]);
  }, [activeTab, surveys]);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Site Surveys"
        subtitle="Manage and track all site survey requests."
        actionLabel="Book New Survey"
        actionIcon={CalendarPlus}
        onAction={openCreateModal}
      />

      <div className="bg-white dark:bg-[#17221B] rounded-2xl border border-line dark:border-[#293227]">
        <div className="px-5 sm:px-6 pt-2">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex-1 min-w-[260px]">
              <FilterBar
                searchPlaceholder="Search by customer, location or surveyor..."
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                filters={[
                  {
                    name: "status",
                    label: "Status",
                    value: statusFilter,
                    options: ["All Status", "Scheduled", "Completed", "Cancelled"],
                    onChange: (value) => {
                      setStatusFilter(value);
                      setActiveTab("All Surveys");
                    },
                  },
                  {
                    name: "surveyor",
                    label: "Surveyor",
                    value: surveyorFilter,
                    options: ["All Surveyors", ...surveyors],
                    onChange: setSurveyorFilter,
                  },
                  {
                    name: "propertyType",
                    label: "Property Type",
                    value: propertyFilter,
                    options: ["All Property Types", "Residential", "Commercial", "Industrial"],
                    onChange: setPropertyFilter,
                  },
                ]}
                onApply={() => loadSurveys()}
              />
            </div>
            <button
              type="button"
              onClick={handleExport}
              disabled={exporting}
              className="flex items-center gap-2 text-sm font-medium border border-line dark:border-[#293227] rounded-lg px-4 py-2.5 text-ink-600 dark:text-[#B9C4BB] hover:bg-[#f4f6f4] dark:hover:bg-[#152019] transition-colors disabled:opacity-60"
            >
              <Download className="w-4 h-4" />
              {exporting ? "Exporting..." : "Export"}
            </button>
          </div>

          {exportError && <p className="text-sm text-red-600 dark:text-red-300">{exportError}</p>}

          {loadError && <p className="text-sm text-red-600 dark:text-red-300">{loadError}</p>}
          <div className="overflow-x-auto no-scrollbar border border-line rounded-xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f6f8f6] dark:bg-[#0E1712] text-ink-500 dark:text-[#B9C4BB] font-semibold border-b border-line dark:border-[#293227] text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Property</th>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Assigned To</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line dark:divide-[#293227] text-ink-800 dark:text-[#F3F6F1] font-medium">
                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-sm text-ink-500">
                      No site surveys found.
                    </td>
                  </tr>
                )}
                {loading && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-sm text-ink-500">
                      Loading site surveys...
                    </td>
                  </tr>
                )}
                {!loading && filtered.map((survey) => (
                  <tr key={survey.id} className="hover:bg-[#f9faf9] dark:hover:bg-[#152019] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-ink-900 dark:text-[#F3F6F1]">{survey.customerName}</td>
                    <td className="py-3.5 px-4 text-ink-600 dark:text-[#B9C4BB]">{survey.location}</td>
                    <td className="py-3.5 px-4">{survey.propertyType}</td>
                    <td className="py-3.5 px-4 text-ink-600 dark:text-[#B9C4BB] text-xs">
                      {survey.surveyDate} at {survey.timeSlot}
                    </td>
                    <td className="py-3.5 px-4 text-ink-700 dark:text-[#B9C4BB]">{survey.assignedTo}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={survey.status} />
                    </td>
                    <td className="relative py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setOpenMenuId((currentId) => (currentId === survey.id ? null : survey.id))}
                        className="p-1 rounded text-ink-400 hover:text-ink-900 dark:hover:text-[#F3F6F1] transition-colors"
                        aria-label={`Actions for ${survey.customerName}`}
                        aria-expanded={openMenuId === survey.id}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {openMenuId === survey.id && (
                        <div className="absolute right-4 top-10 z-20 w-32 rounded-lg border border-line dark:border-[#293227] bg-white dark:bg-[#17221B] py-1 text-left shadow-lg">
                          <button
                            type="button"
                            onClick={() => openEditModal(survey)}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-ink-700 dark:text-[#F3F6F1] hover:bg-[#f4f6f4] dark:hover:bg-[#152019]"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(survey)}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination totalItems={filtered.length} itemsPerPage={10} />
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingSurvey ? "Edit Site Survey" : "Book New Site Survey"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Customer Name">
            <TextInput
              name="customerName"
              placeholder="e.g. Ananya Patil"
              value={form.customerName}
              onChange={handleChange}
              minLength={2}
              maxLength={150}
              required
            />
          </FormField>

          <FormField label="Location / Address">
            <TextInput
              name="location"
              placeholder="e.g. Kothrud, Pune"
              value={form.location}
              onChange={handleChange}
              minLength={2}
              maxLength={150}
              required
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Property Type">
              <SelectInput
                name="propertyType"
                value={form.propertyType}
                onChange={handleChange}
                options={["Residential", "Commercial", "Industrial"]}
              />
            </FormField>

            <FormField label="Assigned Surveyor">
              <SelectInput
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                options={surveyors}
              />
            </FormField>
          </div>

          {editingSurvey && (
            <FormField label="Status">
              <SelectInput
                name="status"
                value={form.status}
                onChange={handleChange}
                options={["Scheduled", "In Progress", "Completed", "Cancelled"]}
              />
            </FormField>
          )}

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Survey Date">
              <TextInput
                type="date"
                name="surveyDate"
                value={form.surveyDate}
                onChange={handleChange}
                maxLength={50}
                required
              />
            </FormField>

            <FormField label="Time Slot">
              <SelectInput
                name="timeSlot"
                value={form.timeSlot}
                onChange={handleChange}
                options={timeSlots}
              />
            </FormField>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="flex-1 border border-line dark:border-[#293227] rounded-lg px-4 py-2.5 text-sm font-medium text-ink-600 dark:text-[#B9C4BB] hover:bg-[#f4f6f4] dark:hover:bg-[#152019] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-[#1F5C3E] hover:bg-[#184A32] dark:bg-[#3FA46A] dark:hover:bg-[#4CBE7C] text-white dark:text-[#0E1712] rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}