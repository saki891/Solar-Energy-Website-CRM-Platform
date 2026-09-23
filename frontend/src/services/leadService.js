import { apiRequest, unwrapData } from "./api";
import { toLead, toLeadPayload } from "./mappers";

export const leadService = {
  async getLeads(params = {}) {
    const response = await apiRequest("/leads", { params });
    return {
      ...response,
      items: (response.items || []).map(toLead),
      tabCounts: response.tab_counts ?? response.tabCounts ?? {},
    };
  },

  async getLead(id) {
    const response = await apiRequest(`/leads/${id}`);
    return toLead(unwrapData(response));
  },

  async createLead(payload) {
    const response = await apiRequest("/leads", {
      method: "POST",
      body: toLeadPayload(payload),
    });
    return toLead(unwrapData(response));
  },

  async updateLead(id, payload) {
    const response = await apiRequest(`/leads/${id}`, {
      method: "PATCH",
      body: toLeadPayload(payload),
    });
    return toLead(unwrapData(response));
  },

  async deleteLead(id) {
    const response = await apiRequest(`/leads/${id}`, { method: "DELETE" });
    return unwrapData(response);
  },
};
