import { apiRequest, unwrapData } from "./api";
import {
  toCalculatorPayload,
  toCalculatorSettings,
  toCalculatorSettingsPayload,
  toCalculatorSubmission,
} from "./mappers";

export const calculatorService = {
  async getSubmissions(params = {}) {
    const response = await apiRequest("/calculators/submissions", { params });
    return {
      ...response,
      items: (response.items || []).map(toCalculatorSubmission),
    };
  },

  async submitCalculator(payload) {
    const response = await apiRequest("/calculators/submissions", {
      method: "POST",
      body: toCalculatorPayload(payload),
    });
    return toCalculatorSubmission(unwrapData(response));
  },

  async calculateSavings(payload) {
    const response = await apiRequest("/calculators/savings-estimate", {
      method: "POST",
      auth: false,
      body: {
        monthly_bill: Number(payload.monthlyBill ?? payload.monthly_bill),
        roof_area: Number(payload.roofArea ?? payload.roof_area),
      },
    });
    return unwrapData(response);
  },

  async calculateRoofCapacity(payload) {
    const response = await apiRequest("/calculators/roof-capacity", {
      method: "POST",
      auth: false,
      body: {
        roof_area: Number(payload.roofArea ?? payload.roof_area),
        shading: payload.shading,
        orientation: payload.orientation,
      },
    });
    return unwrapData(response);
  },

  async calculateRoi(payload) {
    const response = await apiRequest("/calculators/roi-estimate", {
      method: "POST",
      auth: false,
      body: {
        system_size_kw: Number(payload.systemSizeKW ?? payload.system_size_kw),
        monthly_savings: Number(payload.monthlySavings ?? payload.monthly_savings),
        subsidy: Number(payload.subsidy ?? 0),
      },
    });
    return unwrapData(response);
  },

  async deleteSubmission(id) {
    const response = await apiRequest(`/calculators/submissions/${id}`, {
      method: "DELETE",
    });
    return unwrapData(response);
  },

  async getSettings() {
    const response = await apiRequest("/calculators/settings", { auth: false });
    return toCalculatorSettings(unwrapData(response));
  },

  async updateSettings(payload) {
    const response = await apiRequest("/calculators/settings", {
      method: "PUT",
      body: toCalculatorSettingsPayload(payload),
    });
    return toCalculatorSettings(unwrapData(response));
  },
};
