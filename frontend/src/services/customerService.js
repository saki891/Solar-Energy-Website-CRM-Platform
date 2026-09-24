import { apiRequest, unwrapData } from "./api";
import { toCustomer, toCustomerPayload } from "./mappers";

export const customerService = {
  async getCustomers(params = {}) {
    const response = await apiRequest("/customers", { params });
    return {
      ...response,
      items: (response.items || []).map(toCustomer),
    };
  },

  async getCustomer(id) {
    const response = await apiRequest(`/customers/${id}`);
    return toCustomer(unwrapData(response));
  },

  async createCustomer(payload) {
    const response = await apiRequest("/customers", {
      method: "POST",
      body: toCustomerPayload(payload),
    });
    return toCustomer(unwrapData(response));
  },

  async updateCustomer(id, payload) {
    const response = await apiRequest(`/customers/${id}`, {
      method: "PATCH",
      body: toCustomerPayload(payload),
    });
    return toCustomer(unwrapData(response));
  },

  async deleteCustomer(id) {
    const response = await apiRequest(`/customers/${id}`, { method: "DELETE" });
    return unwrapData(response);
  },
};
