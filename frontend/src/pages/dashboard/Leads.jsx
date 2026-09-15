import { useMemo, useState } from "react";
import { Plus, Download, MoreVertical } from "lucide-react";
import DashboardShell from "../../components/dashboard/DashboardShell";
import PageHeader from "../../components/dashboard/PageHeader";
import Tabs from "../../components/dashboard/Tabs";
import FilterBar from "../../components/dashboard/FilterBar";
import StatusBadge from "../../components/dashboard/StatusBadge";
import Pagination from "../../components/dashboard/Pagination";
import Modal from "../../components/dashboard/Modal";
import { FormField, TextInput, SelectInput } from "../../components/dashboard/FormField";
import { allLeads as initialLeads, leadsTabOrder } from "../../data/dashboardData";
import { formatTodayLong } from "../../utils/dashboardDate";

const tabFilterMap = {
  "All Leads": null,
  New: "New",
  Contacted: "Contacted",
  "Site Survey": "Site Survey",
  Quoted: "Quoted",
  Converted: "Converted",
  Lost: "Lost",
};

const emptyForm = {
  name: "",
  contact: "",
  location: "",
  propertyType: "Residential",
  source: "Website",
};

// Drop this in as a route element directly, e.g. <Route path="/leads" element={<Leads />} />
export default function Leads() {
  const [leads, setLeads] = useState(initialLeads);
  const [activeTab, setActiveTab] = useState("All Leads");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const tabs = useMemo(
    () =>
      leadsTabOrder.map((label) => ({
        label,
        count: label === "All Leads" ? leads.length : leads.filter((l) => l.status === tabFilterMap[label]).length,
      })),
    [leads]
  );

  const filtered = useMemo(() => {
    const status = tabFilterMap[activeTab];
    return status ? leads.filter((l) => l.status === status) : leads;
  }, [activeTab, leads]);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim() || !form.location.trim()) return;

    const newLead = {
      id: Date.now(),
      name: form.name.trim(),
      contact: form.contact.trim(),
      location: form.location.trim(),
      propertyType: form.propertyType,
      source: form.source,
      status: "New",
      createdAt: formatTodayLong(),
    };

    setLeads((prev) => [newLead, ...prev]);
    setForm(emptyForm);
    setModalOpen(false);
    setActiveTab("All Leads");
  }

  return (
    <DashboardShell
      active="Leads"
      tagline={["Powering a", "Sustainable Future"]}
      searchPlaceholder="Search leads, phone, email..."
    >
      <div className="p-5 sm:p-8 space-y-5">
        <PageHeader
          title="Leads Management"
          subtitle="View and manage all your leads from website, calculators and enquiries."
          actionLabel="Add New Lead"
          actionIcon={Plus}
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
                  searchPlaceholder="Search by name, phone, email..."
                  filters={["All Property Types", "All Locations", "All Sources", "All Status"]}
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

            {filtered.length === 0 ? (
              <p className="text-center text-sm text-ink-400 py-12">No leads in this status yet.</p>
            ) : (
              <div className="overflow-x-auto -mx-2">
                <table className="w-full text-sm min-w-[900px]">
                  <thead>
                    <tr className="text-left text-ink-400 text-xs uppercase tracking-wide">
                      <th className="px-2 pb-3 font-medium">#</th>
                      <th className="px-2 pb-3 font-medium">Name</th>
                      <th className="px-2 pb-3 font-medium">Contact</th>
                      <th className="px-2 pb-3 font-medium">Location</th>
                      <th className="px-2 pb-3 font-medium">Property Type</th>
                      <th className="px-2 pb-3 font-medium">Lead Source</th>
                      <th className="px-2 pb-3 font-medium">Status</th>
                      <th className="px-2 pb-3 font-medium">Created At</th>
                      <th className="px-2 pb-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((lead, i) => (
                      <tr key={lead.id} className="border-t border-line">
                        <td className="px-2 py-3 text-ink-400">{i + 1}</td>
                        <td className="px-2 py-3 font-medium text-ink-900 whitespace-nowrap">{lead.name}</td>
                        <td className="px-2 py-3 text-ink-600 whitespace-nowrap">{lead.contact}</td>
                        <td className="px-2 py-3 text-ink-600">{lead.location}</td>
                        <td className="px-2 py-3 text-ink-600">{lead.propertyType}</td>
                        <td className="px-2 py-3 text-ink-600">{lead.source}</td>
                        <td className="px-2 py-3">
                          <StatusBadge status={lead.status} />
                        </td>
                        <td className="px-2 py-3 text-ink-600 whitespace-nowrap">{lead.createdAt}</td>
                        <td className="px-2 py-3">
                          <div className="flex items-center justify-end gap-3">
                            <button type="button" className="text-leaf-600 font-medium hover:underline">
                              View
                            </button>
                            <button type="button" className="text-ink-400 hover:text-ink-700">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <Pagination page={1} totalPages={16} showing={`Showing 1 to ${filtered.length} of ${leads.length} leads`} />
          </div>
        </div>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Add New Lead"
          subtitle="Fill in the details to create a new lead."
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Full Name" required>
              <TextInput name="name" value={form.name} onChange={handleChange} placeholder="e.g. Rohan Patil" required />
            </FormField>

            <FormField label="Phone Number" required>
              <TextInput name="contact" value={form.contact} onChange={handleChange} placeholder="+91 98765 43210" required />
            </FormField>

            <FormField label="Location" required>
              <TextInput name="location" value={form.location} onChange={handleChange} placeholder="e.g. Mumbai" required />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Property Type">
                <SelectInput
                  name="propertyType"
                  value={form.propertyType}
                  onChange={handleChange}
                  options={["Residential", "Commercial", "Industrial"]}
                />
              </FormField>

              <FormField label="Lead Source">
                <SelectInput
                  name="source"
                  value={form.source}
                  onChange={handleChange}
                  options={["Website", "Google Ads", "Referral", "Social Media", "Calculator"]}
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
                Add Lead
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardShell>
  );
}
