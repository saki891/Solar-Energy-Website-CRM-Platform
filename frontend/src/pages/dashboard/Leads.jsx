import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, MoreVertical, Plus, Trash2 } from "lucide-react";
import PageHeader from "../../components/dashboard/PageHeader";
import Tabs from "../../components/dashboard/Tabs";
import FilterBar from "../../components/dashboard/FilterBar";
import StatusBadge from "../../components/dashboard/StatusBadge";
import Pagination from "../../components/dashboard/Pagination";
import Modal from "../../components/dashboard/Modal";
import { FormField, TextInput, SelectInput } from "../../components/dashboard/FormField";
import { leadsTabOrder } from "../../data/dashboardData";
import { leadService } from "../../services/leadService";

const tabFilterMap = {
  "All Leads": null,
  New: "New",
  Contacted: "Contacted",
  "Site Survey": "Site Survey",
  Quoted: "Quoted",
  Converted: "Converted",
  Lost: "Lost",
};

const propertyTypeOptions = ["All Property Types", "Residential", "Commercial", "Industrial"];
const locationOptions = ["All Locations", "Mumbai", "Pune", "Nashik", "Thane", "Nagpur", "Solapur"];
const sourceOptions = [
  "All Sources",
  "Website",
  "Calculator",
  "Referral",
  "Cold Call",
  "Ad Campaign",
  "Google Ads",
  "Social Media",
  "Direct Enquiry",
];
const statusOptions = ["All Status", "New", "Contacted", "Site Survey", "Quoted", "Converted", "Lost"];

const emptyForm = {
  name: "",
  contact: "",
  location: "",
  propertyType: "Residential",
  source: "Website",
  status: "New",
};

function toForm(lead) {
  return {
    name: lead.name || "",
    contact: lead.contact || "",
    location: lead.location || "",
    propertyType: lead.propertyType || "Residential",
    source: lead.source || "Website",
    status: lead.status || "New",
  };
}

function downloadCsv(filename, rows) {
  const headers = ["Lead Name", "Contact", "Location", "Property", "Source", "Date", "Status"];
  const values = rows.map((lead) => [
    lead.name,
    lead.contact,
    lead.location,
    lead.propertyType,
    lead.source,
    lead.date || lead.createdAt,
    lead.status,
  ]);
  const csv = [headers, ...values]
    .map((row) => row.map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [tabCounts, setTabCounts] = useState({});
  const [activeTab, setActiveTab] = useState("All Leads");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("All Property Types");
  const [location, setLocation] = useState("All Locations");
  const [source, setSource] = useState("All Sources");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const tabs = useMemo(
    () =>
      leadsTabOrder.map((label) => ({
        label,
        count: tabCounts[label] ?? 0,
      })),
    [tabCounts]
  );

  const loadLeads = useCallback(
    async (targetPage = page) => {
      setLoading(true);
      setError("");
      try {
        const response = await leadService.getLeads({
          page: targetPage,
          limit: 10,
          search,
          property_type: propertyType,
          location,
          source,
          status: tabFilterMap[activeTab] || statusFilter,
        });
        setLeads(response.items || []);
        setTabCounts(response.tabCounts || {});
        setTotal(response.total || 0);
        setTotalPages(response.total_pages || response.totalPages || 1);
      } catch (err) {
        setError(err.message || "Unable to load leads.");
      } finally {
        setLoading(false);
      }
    },
    [activeTab, location, page, propertyType, search, source, statusFilter]
  );

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  function updateFilter(setter, value) {
    setter(value);
    setPage(1);
  }

  function openCreateModal() {
    setEditingLead(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEditModal(lead) {
    setEditingLead(lead);
    setForm(toForm(lead));
    setModalOpen(true);
  }

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim() || !form.location.trim()) return;

    setSaving(true);
    setError("");
    try {
      if (editingLead) {
        await leadService.updateLead(editingLead.id, form);
      } else {
        await leadService.createLead({ ...form, status: "New" });
      }
      setModalOpen(false);
      setEditingLead(null);
      setForm(emptyForm);
      setPage(1);
      await loadLeads(1);
    } catch (err) {
      setError(err.message || "Unable to save lead.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!editingLead || !window.confirm("Delete this lead?")) return;
    setSaving(true);
    setError("");
    try {
      await leadService.deleteLead(editingLead.id);
      setModalOpen(false);
      setEditingLead(null);
      await loadLeads(page);
    } catch (err) {
      setError(err.message || "Unable to delete lead.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Leads Management"
        subtitle="View and manage all your leads from website, calculators and enquiries."
        actionLabel="Add New Lead"
        actionIcon={Plus}
        onAction={openCreateModal}
      />

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-[#17221B] rounded-2xl border border-line dark:border-[#293227]">
        <div className="px-5 sm:px-6 pt-2">
          <Tabs tabs={tabs} active={activeTab} onChange={(tab) => updateFilter(setActiveTab, tab)} />
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex-1 min-w-[260px]">
              <FilterBar
                searchPlaceholder="Search by name, phone, email..."
                searchValue={search}
                onSearchChange={(value) => updateFilter(setSearch, value)}
                onApply={() => loadLeads(1)}
                filters={[
                  { name: "propertyType", label: "Property Type", value: propertyType, onChange: (value) => updateFilter(setPropertyType, value), options: propertyTypeOptions },
                  { name: "location", label: "Location", value: location, onChange: (value) => updateFilter(setLocation, value), options: locationOptions },
                  { name: "source", label: "Source", value: source, onChange: (value) => updateFilter(setSource, value), options: sourceOptions },
                  { name: "status", label: "Status", value: statusFilter, onChange: (value) => updateFilter(setStatusFilter, value), options: statusOptions },
                ]}
              />
            </div>
            <button
              type="button"
              onClick={() => downloadCsv("leads.csv", leads)}
              className="flex items-center gap-2 text-sm font-medium border border-line rounded-lg px-4 py-2.5 text-ink-600 hover:bg-[#f4f6f4] transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          <p className="text-sm text-ink-500">
            {loading ? "Loading leads..." : `Showing ${leads.length} of ${total} leads`}
          </p>

          <div className="overflow-x-auto no-scrollbar border border-line rounded-xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f6f8f6] dark:bg-[#0E1712] text-ink-500 dark:text-[#B9C4BB] font-semibold border-b border-line dark:border-[#293227] text-xs uppercase tracking-wider">
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
              <tbody className="divide-y divide-line dark:divide-[#293227] text-ink-800 dark:text-[#F3F6F1] font-medium">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#f9faf9] dark:hover:bg-[#152019] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-ink-900 dark:text-[#F3F6F1]">{lead.name}</td>
                    <td className="py-3.5 px-4 text-ink-600 dark:text-[#B9C4BB]">{lead.contact}</td>
                    <td className="py-3.5 px-4 text-ink-600 dark:text-[#B9C4BB]">{lead.location}</td>
                    <td className="py-3.5 px-4">{lead.propertyType}</td>
                    <td className="py-3.5 px-4 text-ink-500 dark:text-[#8A968C]">{lead.source}</td>
                    <td className="py-3.5 px-4 text-ink-500 dark:text-[#8A968C] text-xs">{lead.date || lead.createdAt}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => openEditModal(lead)}
                        className="p-1 rounded text-ink-400 dark:text-[#8A968C] hover:text-ink-900 dark:hover:text-[#F3F6F1] transition-colors"
                        aria-label={`Edit ${lead.name}`}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {!loading && leads.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-sm text-ink-500">
                      No leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingLead ? "Lead Details" : "Add New Lead"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Full Name">
            <TextInput name="name" placeholder="e.g. Rahul Sharma" value={form.name} onChange={handleChange} minLength={2} maxLength={150} required />
          </FormField>

          <FormField label="Contact (Phone / Email)">
            <TextInput name="contact" placeholder="e.g. +91 98765 43210" value={form.contact} onChange={handleChange} minLength={3} maxLength={100} required />
          </FormField>

          <FormField label="Location">
            <TextInput name="location" placeholder="e.g. Pune, Maharashtra" value={form.location} onChange={handleChange} minLength={2} maxLength={150} required />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Property Type">
              <SelectInput name="propertyType" value={form.propertyType} onChange={handleChange} options={["Residential", "Commercial", "Industrial"]} />
            </FormField>

            <FormField label="Source">
              <SelectInput name="source" value={form.source} onChange={handleChange} options={sourceOptions.filter((option) => option !== "All Sources")} />
            </FormField>
          </div>

          {editingLead && (
            <FormField label="Status">
              <SelectInput name="status" value={form.status} onChange={handleChange} options={statusOptions.filter((option) => option !== "All Status")} />
            </FormField>
          )}

          <div className="flex items-center gap-3 pt-2">
            {editingLead && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="inline-flex items-center gap-2 border border-red-200 rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            )}
            <button
              type="submit"
              disabled={saving}
              className="bg-[#1F5C3E] hover:bg-[#184A32] dark:bg-[#3FA46A] dark:hover:bg-[#4CBE7C] text-white dark:text-[#0E1712] rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="ml-auto border border-line dark:border-[#293227] rounded-lg px-4 py-2.5 text-sm font-medium text-ink-600 dark:text-[#B9C4BB] hover:bg-[#f4f6f4] dark:hover:bg-[#152019] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
