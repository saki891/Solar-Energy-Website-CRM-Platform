import { apiRequest, unwrapData } from "./api";
import { toFaq, toFaqPayload } from "./mappers";

export const faqService = {
  async getFaqs(params = {}) {
    const response = await apiRequest("/faqs", { params });
    return (unwrapData(response) || []).map(toFaq);
  },

  async getFaq(id) {
    const response = await apiRequest(`/faqs/${id}`);
    return toFaq(unwrapData(response));
  },

  async createFaq(payload) {
    const response = await apiRequest("/faqs", {
      method: "POST",
      body: toFaqPayload(payload),
    });
    return toFaq(unwrapData(response));
  },

  async updateFaq(id, payload) {
    const response = await apiRequest(`/faqs/${id}`, {
      method: "PATCH",
      body: toFaqPayload(payload),
    });
    return toFaq(unwrapData(response));
  },

  async deleteFaq(id) {
    const response = await apiRequest(`/faqs/${id}`, { method: "DELETE" });
    return unwrapData(response);
  },
};
