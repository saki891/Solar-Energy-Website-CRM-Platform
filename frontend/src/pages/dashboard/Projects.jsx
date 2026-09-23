import { useEffect, useState } from "react";
import { FolderKanban, Pencil, Plus, Trash2 } from "lucide-react";
import Modal from "../../components/dashboard/Modal";
import StatusBadge from "../../components/dashboard/StatusBadge";
import { FormField, SelectInput, TextInput } from "../../components/dashboard/FormField";
import { projectService } from "../../services/projectService";

const emptyForm = {
  name: "",
  category: "Residential",
  location: "",
  capacity: "",
  capacityKW: "",
  status: "In Progress",
  isPublic: true,
};

function toForm(project) {
  return {
    name: project.name || "",
    category: project.category || "Residential",
    location: project.location || "",
    capacity: project.capacity || "",
    capacityKW: project.capacityKW || "",
    status: project.status || "In Progress",
    isPublic: Boolean(project.isPublic),
  };
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadProjects() {
    setLoading(true);
    setError("");
    try {
      const items = await projectService.getProjects();
      setProjects(items);
    } catch (err) {
      setError(err.message || "Unable to load projects.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function openCreateModal() {
    setEditingProject(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEditModal(project) {
    setEditingProject(project);
    setForm(toForm(project));
    setModalOpen(true);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.location.trim() || !form.capacity.trim()) return;

    setSaving(true);
    setError("");
    try {
      if (editingProject) {
        await projectService.updateProject(editingProject.id, form);
      } else {
        await projectService.createProject(form);
      }
      setModalOpen(false);
      setEditingProject(null);
      setForm(emptyForm);
      await loadProjects();
    } catch (err) {
      setError(err.message || "Unable to save project.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!editingProject || !window.confirm("Delete this project?")) return;
    setSaving(true);
    setError("");
    try {
      await projectService.deleteProject(editingProject.id);
      setModalOpen(false);
      setEditingProject(null);
      await loadProjects();
    } catch (err) {
      setError(err.message || "Unable to delete project.");
    } finally {
      setSaving(false);
    }
  }

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
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-[#1F5C3E] hover:bg-[#184931] text-white text-sm font-medium rounded-xl px-4 py-2.5 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-[#17221B] border border-gray-200 dark:border-[#293227] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-[#0E1712]/80 border-b border-gray-200 dark:border-[#293227] text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">Project Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Capacity</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#293227]/60 text-gray-800 dark:text-gray-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50/70 dark:hover:bg-[#152019]/60 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-gray-900 dark:text-white">{project.name}</td>
                  <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">{project.category}</td>
                  <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">{project.location}</td>
                  <td className="py-3.5 px-4 font-medium text-gray-900 dark:text-white">{project.capacity}</td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={project.status} />
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => openEditModal(project)}
                      className="p-1.5 text-gray-500 hover:text-[#1F5C3E] rounded-lg hover:bg-gray-100 dark:hover:bg-[#0E1712] transition-colors"
                      title="Edit project"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && projects.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    No projects found.
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    Loading projects...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingProject ? "Edit Project" : "Create Project"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Project Name">
            <TextInput name="name" value={form.name} onChange={handleChange} placeholder="e.g. Pune Rooftop Solar" minLength={2} maxLength={200} required />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Category">
              <SelectInput name="category" value={form.category} onChange={handleChange} options={["Residential", "Commercial", "Industrial"]} />
            </FormField>
            <FormField label="Status">
              <SelectInput name="status" value={form.status} onChange={handleChange} options={["Planning", "In Progress", "Completed", "On Hold", "Cancelled"]} />
            </FormField>
          </div>

          <FormField label="Location">
            <TextInput name="location" value={form.location} onChange={handleChange} placeholder="e.g. Pune, MH" minLength={2} maxLength={150} required />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Capacity Label">
              <TextInput name="capacity" value={form.capacity} onChange={handleChange} placeholder="e.g. 25 kW" minLength={1} maxLength={50} required />
            </FormField>
            <FormField label="Capacity kW">
              <TextInput type="number" name="capacityKW" value={form.capacityKW} onChange={handleChange} min={0} max={100000} step="0.1" placeholder="25" />
            </FormField>
          </div>

          <label className="flex items-center gap-2 text-sm text-ink-700 dark:text-[#B9C4BB]">
            <input type="checkbox" name="isPublic" checked={form.isPublic} onChange={handleChange} className="h-4 w-4" />
            Show on public projects page
          </label>

          <div className="flex items-center gap-3 pt-2">
            {editingProject && (
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
              className="bg-leaf-600 hover:bg-leaf-700 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="ml-auto border border-line rounded-lg px-4 py-2.5 text-sm font-medium text-ink-600 hover:bg-[#f4f6f4] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
