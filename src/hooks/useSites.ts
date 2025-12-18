import { useQuery } from "@tanstack/react-query";
import { fetchSites } from "../api/sites";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useSites() {
  return useQuery({
    queryKey: ["dwell"],
    queryFn: async () => {
      return fetchSites({
        queryKey: [
          "dwell",
          {
            path: API_BASE_URL + "api/sites",
          },
        ],
      });
    },
  });
}
