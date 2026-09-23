import { apiRequest, unwrapData } from "./api";
import { toBlog, toBlogPayload } from "./mappers";

export const blogService = {
  async getBlogs(params = {}) {
    const response = await apiRequest("/blogs", { params });
    return {
      ...response,
      items: (response.items || []).map(toBlog),
    };
  },

  async getBlog(idOrSlug) {
    const response = await apiRequest(`/blogs/${idOrSlug}`);
    return toBlog(unwrapData(response));
  },

  async createBlog(payload) {
    const response = await apiRequest("/blogs", {
      method: "POST",
      body: toBlogPayload(payload),
    });
    return toBlog(unwrapData(response));
  },

  async updateBlog(id, payload) {
    const response = await apiRequest(`/blogs/${id}`, {
      method: "PATCH",
      body: toBlogPayload(payload),
    });
    return toBlog(unwrapData(response));
  },

  async deleteBlog(id) {
    const response = await apiRequest(`/blogs/${id}`, { method: "DELETE" });
    return unwrapData(response);
  },
};
