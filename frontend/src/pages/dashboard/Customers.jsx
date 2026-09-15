import { useState } from "react";
import { Plus } from "lucide-react";
import DashboardShell from "../../components/dashboard/DashboardShell";
import PageHeader from "../../components/dashboard/PageHeader";
import FilterBar from "../../components/dashboard/FilterBar";
import StatusBadge from "../../components/dashboard/StatusBadge";
import Pagination from "../../components/dashboard/Pagination";
import Modal from "../../components/dashboard/Modal";
import { FormField, TextInput, SelectInput } from "../../components/dashboard/FormField";
import { customers as initialCustomers } from "../../data/dashboardData";
import { formatTodayLong } from "../../utils/dashboardDate";

const emptyForm = {
  name: "",
  contact: "",
  location: "",
  propertyType: "Residential",
  status: "Active",
};

// Drop this in as a route element directly, e.g. <Route path="/customers" element={<Customers />} />
export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim() || !form.location.trim()) return;

    const newCustomer = {
      id: Date.now(),
      name: form.name.trim(),
      contact: form.contact.trim(),
      location: form.location.trim(),
      propertyType: form.propertyType,
      totalProjects: 0,
      customerSince: formatTodayLong(),
      status: form.status,
    };

    setCustomers((prev) => [newCustomer, ...prev]);
    setForm(emptyForm);
    setModalOpen(false);
  }

  return (
    <DashboardShell
      active="Customers"
      tagline={["Happy Customers,", "Brighter Communities"]}
      searchPlaceholder="Search customers by name, email or phone..."
    >
      <div className="p-5 sm:p-8 space-y-5">
        <PageHeader
          title="Customers"
          subtitle="Manage your customers and their solar journey."
          actionLabel="Add New Customer"
          actionIcon={Plus}
          onAction={() => setModalOpen(true)}
        />

        <div className="bg-white rounded-2xl border border-line p-5 sm:p-6 space-y-5">
          <FilterBar
            searchPlaceholder="Search customers by name, email or phone..."
            filters={["All Locations", "All Property Types", "All Status"]}
          />

          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm min-w-[860px]">
              <thead>
                <tr className="text-left text-ink-400 text-xs uppercase tracking-wide">
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
              <tbody>
                {customers.map((c, i) => (
                  <tr key={c.id} className="border-t border-line">
                    <td className="px-2 py-3 text-ink-400">{i + 1}</td>
                    <td className="px-2 py-3 font-medium text-ink-900 whitespace-nowrap">{c.name}</td>
                    <td className="px-2 py-3 text-ink-600 whitespace-nowrap">{c.contact}</td>
                    <td className="px-2 py-3 text-ink-600">{c.location}</td>
                    <td className="px-2 py-3 text-ink-600">{c.propertyType}</td>
                    <td className="px-2 py-3 text-ink-600">{c.totalProjects}</td>
                    <td className="px-2 py-3 text-ink-600 whitespace-nowrap">{c.customerSince}</td>
                    <td className="px-2 py-3">
                      <StatusBadge status={c.status} />
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

          <Pagination
            page={1}
            totalPages={11}
            showing={`Showing 1 to ${customers.length} of ${86 + (customers.length - initialCustomers.length)} customers`}
          />
        </div>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Add New Customer"
          subtitle="Fill in the details to create a new customer."
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

              <FormField label="Status">
                <SelectInput name="status" value={form.status} onChange={handleChange} options={["Active", "Inactive"]} />
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
                Add Customer
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardShell>
  );
}
