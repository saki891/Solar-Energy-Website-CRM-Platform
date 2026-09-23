import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import PageHeader from "../../components/dashboard/PageHeader";
import StatusBadge from "../../components/dashboard/StatusBadge";
import Pagination from "../../components/dashboard/Pagination";
import Modal from "../../components/dashboard/Modal";
import { FormField, SelectInput, TextInput } from "../../components/dashboard/FormField";
import { customerService } from "../../services/customerService";

const emptyForm = {
  name: "",
  contact: "",
  email: "",
  location: "",
  propertyType: "Residential",
  status: "Active",
};

function toForm(customer) {
  return {
    name: customer.name || "",
    contact: customer.contact || "",
    email: customer.email || "",
    location: customer.location || "",
    propertyType: customer.propertyType || "Residential",
    status: customer.status || "Active",
  };
}

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadCustomers() {
    setLoading(true);
    setError("");
    try {
      const response = await customerService.getCustomers({ page, limit: 10 });
      setCustomers(response.items || []);
      setTotal(response.meta?.total || 0);
      setTotalPages(response.meta?.total_pages || response.meta?.totalPages || 1);
    } catch (err) {
      setError(err.message || "Unable to load customers.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCustomers();
  }, [page]);

  function openCreateModal() {
    setEditingCustomer(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEditModal(customer) {
    setEditingCustomer(customer);
    setForm(toForm(customer));
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
      if (editingCustomer) {
        await customerService.updateCustomer(editingCustomer.id, form);
      } else {
        await customerService.createCustomer(form);
      }
      setModalOpen(false);
      setEditingCustomer(null);
      setForm(emptyForm);
      setPage(1);
      await loadCustomers();
    } catch (err) {
      setError(err.message || "Unable to save customer.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!editingCustomer || !window.confirm("Delete this customer?")) return;
    setSaving(true);
    setError("");
    try {
      await customerService.deleteCustomer(editingCustomer.id);
      setModalOpen(false);
      setEditingCustomer(null);
      await loadCustomers();
    } catch (err) {
      setError(err.message || "Unable to delete customer.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Customers"
        subtitle="Manage your customers and their solar journey."
        actionLabel="Add New Customer"
        actionIcon={Plus}
        onAction={openCreateModal}
      />

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-[#17221B] rounded-2xl border border-line dark:border-[#293227] p-5 sm:p-6 space-y-5">
        <p className="text-sm text-ink-500">
          {loading ? "Loading customers..." : `Showing ${customers.length} of ${total} customers`}
        </p>

        <div className="overflow-x-auto no-scrollbar -mx-2">
          <table className="w-full text-sm min-w-[860px]">
            <thead>
              <tr className="text-left text-ink-400 dark:text-[#8A968C] text-xs uppercase tracking-wide">
                <th className="px-2 pb-3 font-medium">#</th>
                <th className="px-2 pb-3 font-medium">Name</th>
                <th className="px-2 pb-3 font-medium">Contact</th>
                <th className="px-2 pb-3 font-medium">Location</th>
                <th className="px-2 pb-3 font-medium">Property Type</th>
                <th className="px-2 pb-3 font-medium">Total Projects</th>
                <th className="px-2 pb-3 font-medium">Customer Since</th>
                <th className="px-2 pb-3 font-medium">Status</th>
                <th className="px-2 pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-ink-800 dark:text-[#F3F6F1]">
              {customers.map((customer, i) => (
                <tr key={customer.id} className="border-t border-line dark:border-[#293227]">
                  <td className="px-2 py-3 text-ink-400">{(page - 1) * 10 + i + 1}</td>
                  <td className="px-2 py-3 font-medium text-ink-900 dark:text-[#F3F6F1] whitespace-nowrap">{customer.name}</td>
                  <td className="px-2 py-3 text-ink-600 dark:text-[#B9C4BB] whitespace-nowrap">{customer.contact}</td>
                  <td className="px-2 py-3 text-ink-600 dark:text-[#B9C4BB]">{customer.location}</td>
                  <td className="px-2 py-3 text-ink-600 dark:text-[#B9C4BB]">{customer.propertyType}</td>
                  <td className="px-2 py-3 text-ink-600 dark:text-[#B9C4BB]">{customer.totalProjects}</td>
                  <td className="px-2 py-3 text-ink-600 dark:text-[#B9C4BB] whitespace-nowrap">{customer.customerSince}</td>
                  <td className="px-2 py-3">
                    <StatusBadge status={customer.status} />
                  </td>
                  <td className="px-2 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => openEditModal(customer)}
                      className="text-leaf-600 font-medium hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && customers.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-sm text-ink-500">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCustomer ? "Customer Details" : "Add New Customer"}
        subtitle="Customer records are stored in the CRM backend."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Full Name" required>
            <TextInput name="name" value={form.name} onChange={handleChange} placeholder="e.g. Rohan Patil" minLength={2} maxLength={150} required />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Phone Number" required>
              <TextInput name="contact" value={form.contact} onChange={handleChange} placeholder="+91 98765 43210" minLength={3} maxLength={100} required />
            </FormField>
            <FormField label="Email">
              <TextInput type="email" name="email" value={form.email} onChange={handleChange} maxLength={254} placeholder="customer@example.com" />
            </FormField>
          </div>

          <FormField label="Location" required>
            <TextInput name="location" value={form.location} onChange={handleChange} placeholder="e.g. Mumbai" minLength={2} maxLength={150} required />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Property Type">
              <SelectInput name="propertyType" value={form.propertyType} onChange={handleChange} options={["Residential", "Commercial", "Industrial"]} />
            </FormField>

            <FormField label="Status">
              <SelectInput name="status" value={form.status} onChange={handleChange} options={["Active", "Inactive"]} />
            </FormField>
          </div>

          <div className="flex items-center gap-3 pt-2">
            {editingCustomer && (
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
