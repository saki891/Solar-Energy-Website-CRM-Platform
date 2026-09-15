import { useMemo, useState } from "react";
import { CalendarPlus, Download, MoreVertical } from "lucide-react";
import PageHeader from "../../components/dashboard/PageHeader";
import Tabs from "../../components/dashboard/Tabs";
import FilterBar from "../../components/dashboard/FilterBar";
import StatusBadge from "../../components/dashboard/StatusBadge";
import Pagination from "../../components/dashboard/Pagination";
import Modal from "../../components/dashboard/Modal";
import { FormField, TextInput, SelectInput } from "../../components/dashboard/FormField";
import { siteSurveys as initialSurveys, surveyTabOrder } from "../../data/dashboardData";
import { formatDateLong, todayISO } from "../../utils/dashboardDate";

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
};

export default function SiteSurveys() {
  const [surveys, setSurveys] = useState(initialSurveys);
  const [activeTab, setActiveTab] = useState("All Surveys");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const tabs = useMemo(
    () =>
      surveyTabOrder.map((label) => ({
        label,
        count:
          label === "All Surveys" ? surveys.length : surveys.filter((s) => s.status === tabFilterMap[label]).length,
      })),
    [surveys]
  );

  const filtered = useMemo(() => {
    const status = tabFilterMap[activeTab];
    return status ? surveys.filter((s) => s.status === status) : surveys;
  }, [activeTab, surveys]);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.customerName.trim() || !form.location.trim() || !form.surveyDate) return;

    const newSurvey = {
      id: Date.now(),
      customerName: form.customerName.trim(),
      location: form.location.trim(),
      propertyType: form.propertyType,
      surveyDate: formatDateLong(form.surveyDate),
      timeSlot: form.timeSlot,
      assignedTo: form.assignedTo,
      status: "Scheduled",
    };

    setSurveys((prev) => [newSurvey, ...prev]);
    setForm(emptyForm);
    setModalOpen(false);
    setActiveTab("All Surveys");
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Site Surveys"
        subtitle="Manage and track all site survey requests."
        actionLabel="Book New Survey"
        actionIcon={CalendarPlus}
        onAction={() => setModalOpen(true)}
      />

      <div className="bg-white rounded-2xl border border-line">
        <div className="px-5 sm:px-6 pt-2">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex-1 min-w-[260px]">
              <FilterBar
                searchPlaceholder="Search by customer, location or surveyor..."
                filters={["All Status", "All Surveyors", "All Property Types"]}
              />
            </div>
            <button
              type="button"
              className="flex items-center gap-2 text-sm font-medium border border-line rounded-lg px-4 py-2.5 text-ink-600 hover:bg-[#f4f6f4] transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          <div className="overflow-x-auto border border-line rounded-xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f6f8f6] text-ink-500 font-semibold border-b border-line text-xs uppercase tracking-wider">
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
              <tbody className="divide-y divide-line text-ink-800 font-medium">
                {filtered.map((survey) => (
                  <tr key={survey.id} className="hover:bg-[#f9faf9] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-ink-900">{survey.customerName}</td>
                    <td className="py-3.5 px-4 text-ink-600">{survey.location}</td>
                    <td className="py-3.5 px-4">{survey.propertyType}</td>
                    <td className="py-3.5 px-4 text-ink-600 text-xs">
                      {survey.surveyDate} at {survey.timeSlot}
                    </td>
                    <td className="py-3.5 px-4 text-ink-700">{survey.assignedTo}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={survey.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button type="button" className="p-1 rounded text-ink-400 hover:text-ink-900 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination totalItems={filtered.length} itemsPerPage={10} />
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Book New Site Survey">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Customer Name">
            <TextInput
              name="customerName"
              placeholder="e.g. Ananya Patil"
              value={form.customerName}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField label="Location / Address">
            <TextInput
              name="location"
              placeholder="e.g. Kothrud, Pune"
              value={form.location}
              onChange={handleChange}
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

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Survey Date">
              <TextInput
                type="date"
                name="surveyDate"
                value={form.surveyDate}
                onChange={handleChange}
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
              className="flex-1 border border-line rounded-lg px-4 py-2.5 text-sm font-medium text-ink-600 hover:bg-[#f4f6f4] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-leaf-600 hover:bg-leaf-700 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
            >
              Book Survey
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
