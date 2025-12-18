import { useQuery } from "@tanstack/react-query";
import { fetchOverview } from "../api/overview";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useOccupancySnapshot(
  siteId: string,
  fromUtc?: number,
  toUtc?: number
) {
  return useQuery({
    queryKey: ["occupancy", siteId, fromUtc, toUtc],
    queryFn: async () => {
      return fetchOverview({
        queryKey: [
          "occupancy",
          {
            path: API_BASE_URL+"api/analytics/occupancy",
            params: { siteId, fromUtc, toUtc },
          },
        ],
      });
    },
  });
}
