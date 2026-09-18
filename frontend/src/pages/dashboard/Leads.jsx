import { useMemo, useState } from "react";
import { Plus, Download, MoreVertical } from "lucide-react";
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
      date: formatTodayLong(),
      status: "New",
    };

    setLeads((prev) => [newLead, ...prev]);
    setForm(emptyForm);
    setModalOpen(false);
  }

  return (
    <div className="space-y-5">
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

          <div className="overflow-x-auto no-scrollbar border border-line rounded-xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f6f8f6] text-ink-500 font-semibold border-b border-line text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Lead Name</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Property</th>
                  <th className="py-3.5 px-4">Source</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-ink-800 font-medium">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#f9faf9] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-ink-900">{lead.name}</td>
                    <td className="py-3.5 px-4 text-ink-600">{lead.contact}</td>
                    <td className="py-3.5 px-4 text-ink-600">{lead.location}</td>
                    <td className="py-3.5 px-4">{lead.propertyType}</td>
                    <td className="py-3.5 px-4 text-ink-500">{lead.source}</td>
                    <td className="py-3.5 px-4 text-ink-500 text-xs">{lead.date}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={lead.status} />
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add New Lead">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Full Name">
            <TextInput
              name="name"
              placeholder="e.g. Rahul Sharma"
              value={form.name}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField label="Contact (Phone / Email)">
            <TextInput
              name="contact"
              placeholder="e.g. +91 98765 43210"
              value={form.contact}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField label="Location">
            <TextInput
              name="location"
              placeholder="e.g. Pune, Maharashtra"
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

            <FormField label="Source">
              <SelectInput
                name="source"
                value={form.source}
                onChange={handleChange}
                options={["Website", "Calculator", "Referral", "Cold Call", "Ad Campaign"]}
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
  );
}
