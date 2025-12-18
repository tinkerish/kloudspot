import React, { useCallback, useMemo, useState } from "react";
import type { LiveAlert } from "../types/alerts";
import { AlertsContext } from "./AlertsContext";

export function AlertsProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<LiveAlert[]>([]);

  const unreadCount = useMemo(
    () => alerts.reduce((c, a) => c + (a.read ? 0 : 1), 0),
    [alerts]
  );

  const addAlert = useCallback((alert: LiveAlert) => {
    setAlerts((prev) => [{ ...alert, read: false }, ...prev]);
  }, []);

  const markAllRead = useCallback(() => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })));
  }, []);

  return (
    <AlertsContext.Provider
      value={{ alerts, unreadCount, addAlert, markAllRead }}
    >
      {children}
    </AlertsContext.Provider>
  );
}
