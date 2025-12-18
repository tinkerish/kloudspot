import { useContext } from "react";
import type { AlertsContextType } from "../types/alerts";
import { AlertsContext } from "../context/AlertsContext";

export function useAlerts(): AlertsContextType {
  const ctx = useContext(AlertsContext);

  if (!ctx) {
    throw new Error("useAlerts must be used inside AlertsProvider");
  }

  return ctx;
}
