import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
const API = import.meta.env.VITE_API_BASE_URL;
export function useLiveOccupancy(siteId: string) {
  const queryClient = useQueryClient();
  const [liveOccupancy, setLiveOccupancy] = useState<number | null>(null);
  useEffect(() => {
    const socket = io(API, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socket.on("live_occupancy", (event) => {
      if (event.siteId === siteId) {
        setLiveOccupancy(event.siteOccupancy);
      }
    });

    return () => {
      socket.disconnect();
    }
  }, [siteId, queryClient]);
  return liveOccupancy;
}
