import { apiRequest, unwrapData } from "./api";

export const userService = {
  async getUsers(params = {}) {
    const response = await apiRequest("/users", { params });
    return unwrapData(response) || [];
  },

  async createUser(payload) {
    const response = await apiRequest("/users", {
      method: "POST",
      body: payload,
    });
    return unwrapData(response);
  },

  async updateUser(id, payload) {
    const response = await apiRequest(`/users/${id}`, {
      method: "PATCH",
      body: payload,
    });
    return unwrapData(response);
  },

  async deleteUser(id) {
    const response = await apiRequest(`/users/${id}`, { method: "DELETE" });
    return unwrapData(response);
  },
};
