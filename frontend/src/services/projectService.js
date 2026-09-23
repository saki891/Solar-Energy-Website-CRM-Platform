import { apiRequest, unwrapData } from "./api";
import { toProject, toProjectPayload } from "./mappers";

export const projectService = {
  async getProjects(params = {}) {
    const response = await apiRequest("/projects", { params });
    return (unwrapData(response) || []).map(toProject);
  },

  async getProject(id) {
    const response = await apiRequest(`/projects/${id}`);
    return toProject(unwrapData(response));
  },

  async createProject(payload) {
    const response = await apiRequest("/projects", {
      method: "POST",
      body: toProjectPayload(payload),
    });
    return toProject(unwrapData(response));
  },

  async updateProject(id, payload) {
    const response = await apiRequest(`/projects/${id}`, {
      method: "PATCH",
      body: toProjectPayload(payload),
    });
    return toProject(unwrapData(response));
  },

  async deleteProject(id) {
    const response = await apiRequest(`/projects/${id}`, { method: "DELETE" });
    return unwrapData(response);
  },
};
