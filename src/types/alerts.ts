export type LiveAlert = {
  eventId: string;
  siteId: string;
  siteName: string;
  zoneId: string;
  zoneName: string;
  personId: string;
  personName: string;
  severity: "low" | "medium" | "high";
  direction: "entry" | "exit";
  ts: number;
  read: boolean
};

export type AlertsContextType = {
  alerts: LiveAlert[];
  unreadCount: number;
  addAlert: (alert: LiveAlert) => void;
  markAllRead: () => void;
};
