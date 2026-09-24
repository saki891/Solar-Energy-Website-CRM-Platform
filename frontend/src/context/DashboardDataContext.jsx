import { createContext, useCallback, useContext, useMemo, useState } from "react";

const DashboardDataContext = createContext(null);

const initialProfile = {
  customerName: "",
  location: "",
  propertyType: "Residential",
};

export function DashboardDataProvider({ children }) {
  const [records, setRecords] = useState({
    leads: [],
    customers: [],
    projects: [],
    surveys: [],
  });
  const [commonProfile, setCommonProfile] = useState(initialProfile);

  const setEntityList = useCallback((entityType, items) => {
    if (!entityType) return;
    setRecords((prev) => ({
      ...prev,
      [entityType]: Array.isArray(items) ? items : [],
    }));
  }, []);

  const updateCommonProfile = useCallback((nextProfile = {}) => {
    setCommonProfile((prev) => ({
      ...prev,
      ...nextProfile,
    }));
  }, []);

  const upsertEntity = useCallback((entityType, item) => {
    if (!entityType || !item) return;

    setRecords((prev) => {
      const current = Array.isArray(prev[entityType]) ? prev[entityType] : [];
      const existingIndex = item.id != null ? current.findIndex((entry) => entry.id === item.id) : -1;

      if (existingIndex >= 0) {
        const next = [...current];
        next[existingIndex] = { ...next[existingIndex], ...item };
        return { ...prev, [entityType]: next };
      }

      return { ...prev, [entityType]: [item, ...current] };
    });
  }, []);

  const syncSharedCommonFields = useCallback((entityType, item) => {
    if (!entityType || !item) return;

    const nextProfile = {
      customerName: item.customerName || item.name || commonProfile.customerName || "",
      location: item.location || commonProfile.location || "",
      propertyType: item.propertyType || commonProfile.propertyType || "",
    };

    if (nextProfile.customerName || nextProfile.location || nextProfile.propertyType) {
      updateCommonProfile(nextProfile);
    }

    setRecords((prev) => {
      const next = { ...prev };

      ["leads", "customers", "projects", "surveys"].forEach((type) => {
        if (type === entityType) return;

        next[type] = (prev[type] || []).map((entry) => {
          const entryName = entry.customerName || entry.name || "";
          const entryLocation = entry.location || "";

          const matchesName = !nextProfile.customerName || !entryName || entryName.toLowerCase() === nextProfile.customerName.toLowerCase();
          const matchesLocation = !nextProfile.location || !entryLocation || entryLocation.toLowerCase() === nextProfile.location.toLowerCase();

          if (!matchesName && !matchesLocation) return entry;

          return {
            ...entry,
            ...(nextProfile.customerName ? { customerName: nextProfile.customerName, name: nextProfile.customerName } : {}),
            ...(nextProfile.location ? { location: nextProfile.location } : {}),
            ...(nextProfile.propertyType ? { propertyType: nextProfile.propertyType } : {}),
          };
        });
      });

      return next;
    });
  }, [commonProfile, updateCommonProfile]);

  const deleteEntity = useCallback((entityType, itemId) => {
    if (!entityType || itemId == null) return;

    setRecords((prev) => ({
      ...prev,
      [entityType]: (prev[entityType] || []).filter((entry) => entry.id !== itemId),
    }));
  }, []);

  const value = useMemo(
    () => ({
      ...records,
      commonProfile,
      setEntityList,
      upsertEntity,
      deleteEntity,
      syncSharedCommonFields,
      updateCommonProfile,
    }),
    [commonProfile, deleteEntity, records, setEntityList, syncSharedCommonFields, upsertEntity, updateCommonProfile]
  );

  return <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>;
}

export function useDashboardData() {
  const context = useContext(DashboardDataContext);

  if (!context) {
    throw new Error("useDashboardData must be used within a DashboardDataProvider");
  }

  return context;
}
