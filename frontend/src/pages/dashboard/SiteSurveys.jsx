import { useMemo, useState } from "react";
import { CalendarPlus } from "lucide-react";
import DashboardShell from "../../components/dashboard/DashboardShell";
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

// Drop this in as a route element directly, e.g. <Route path="/site-surveys" element={<SiteSurveys />} />
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
    <DashboardShell
      active="Site Surveys"
      tagline={["On-site Insights,", "For a Brighter Tomorrow"]}
      searchPlaceholder="Search surveys, customers, location..."
    >
      <div className="p-5 sm:p-8 space-y-5">
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
            <FilterBar
              searchPlaceholder="Search by name or location..."
              filters={["All Locations", "All Surveyors", "All Status"]}
            />

            {filtered.length === 0 ? (
              <p className="text-center text-sm text-ink-400 py-12">No surveys in this status yet.</p>
            ) : (
              <div className="overflow-x-auto -mx-2">
                <table className="w-full text-sm min-w-[920px]">
                  <thead>
                    <tr className="text-left text-ink-400 text-xs uppercase tracking-wide">
                      <th className="px-2 pb-3 font-medium">#</th>
                      <th className="px-2 pb-3 font-medium">Customer Name</th>
                      <th className="px-2 pb-3 font-medium">Location</th>
                      <th className="px-2 pb-3 font-medium">Property Type</th>
                      <th className="px-2 pb-3 font-medium">Survey Date</th>
                      <th className="px-2 pb-3 font-medium">Time Slot</th>
                      <th className="px-2 pb-3 font-medium">Assigned To</th>
                      <th className="px-2 pb-3 font-medium">Status</th>
                      <th className="px-2 pb-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((s, i) => (
                      <tr key={s.id} className="border-t border-line">
                        <td className="px-2 py-3 text-ink-400">{i + 1}</td>
                        <td className="px-2 py-3 font-medium text-ink-900 whitespace-nowrap">{s.customerName}</td>
                        <td className="px-2 py-3 text-ink-600">{s.location}</td>
                        <td className="px-2 py-3 text-ink-600">{s.propertyType}</td>
                        <td className="px-2 py-3 text-ink-600 whitespace-nowrap">{s.surveyDate}</td>
                        <td className="px-2 py-3 text-ink-600 whitespace-nowrap">{s.timeSlot}</td>
                        <td className="px-2 py-3 text-ink-600">{s.assignedTo}</td>
                        <td className="px-2 py-3">
                          <StatusBadge status={s.status} />
                        </td>
                        <td className="px-2 py-3 text-right">
                          <button type="button" className="text-leaf-600 font-medium hover:underline">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <Pagination page={1} totalPages={6} showing={`Showing 1 to ${filtered.length} of ${surveys.length} surveys`} />
          </div>
        </div>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Book New Survey"
          subtitle="Schedule a site survey for a customer."
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Customer Name" required>
              <TextInput
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                placeholder="e.g. Rohan Patil"
                required
              />
            </FormField>

            <FormField label="Location" required>
              <TextInput name="location" value={form.location} onChange={handleChange} placeholder="e.g. Mumbai" required />
            </FormField>

            <FormField label="Property Type">
              <SelectInput
                name="propertyType"
                value={form.propertyType}
                onChange={handleChange}
                options={["Residential", "Commercial", "Industrial"]}
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Survey Date" required>
                <TextInput type="date" name="surveyDate" value={form.surveyDate} onChange={handleChange} required />
              </FormField>

              <FormField label="Time Slot">
                <SelectInput name="timeSlot" value={form.timeSlot} onChange={handleChange} options={timeSlots} />
              </FormField>
            </div>

            <FormField label="Assigned To">
              <SelectInput name="assignedTo" value={form.assignedTo} onChange={handleChange} options={surveyors} />
            </FormField>

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
    </DashboardShell>
  );
}
