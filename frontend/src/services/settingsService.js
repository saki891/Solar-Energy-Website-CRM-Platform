import { apiRequest, unwrapData } from "./api";
import { toSystemSettings, toSystemSettingsPayload } from "./mappers";

export const settingsService = {
  async getSettings() {
    const response = await apiRequest("/settings");
    return toSystemSettings(unwrapData(response));
  },

  async updateSettings(payload) {
    const response = await apiRequest("/settings", {
      method: "PUT",
      body: toSystemSettingsPayload(payload),
    });
    return toSystemSettings(unwrapData(response));
  },
};
