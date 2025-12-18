import { io } from "socket.io-client";
import { useEffect } from "react";
import { useAlerts } from "./useAlerts";
const API = import.meta.env.VITE_API_BASE_URL;

export function useLiveAlerts(siteId: string) {
  const { addAlert } = useAlerts();

  useEffect(() => {
    if (!siteId) return;

    const socket = io(API, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socket.on("alert", (event) => {
      if (event.siteId === siteId) {
        addAlert({
          ...event,
          read: false,
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [siteId, addAlert]);
}
