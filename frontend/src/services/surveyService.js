import { apiRequest, downloadRequest, unwrapData } from "./api";
import { toSurvey, toSurveyPayload } from "./mappers";

export const surveyService = {
  async getSurveys(params = {}) {
    const response = await apiRequest("/site-surveys", { params });
    return {
      ...response,
      items: (response.items || []).map(toSurvey),
      tabCounts: response.tab_counts ?? response.tabCounts ?? {},
    };
  },

  async getSurvey(id) {
    const response = await apiRequest(`/site-surveys/${id}`);
    return toSurvey(unwrapData(response));
  },

  async createSurvey(payload) {
    const response = await apiRequest("/site-surveys", {
      method: "POST",
      body: toSurveyPayload(payload),
    });
    return toSurvey(unwrapData(response));
  },

  async updateSurvey(id, payload) {
    const response = await apiRequest(`/site-surveys/${id}`, {
      method: "PATCH",
      body: toSurveyPayload(payload),
    });
    return toSurvey(unwrapData(response));
  },

  async deleteSurvey(id) {
    const response = await apiRequest(`/site-surveys/${id}`, { method: "DELETE" });
    return unwrapData(response);
  },

  async exportSurveys(params = {}) {
    return downloadRequest("/site-surveys/export", params);
  },
};
