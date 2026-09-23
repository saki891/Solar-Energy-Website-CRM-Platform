import { apiRequest } from "./api";

export const dashboardService = {
  async getSummary() {
    return apiRequest("/dashboard/summary");
  },
};
