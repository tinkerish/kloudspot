import { useMemo } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { calculatePercentageChange } from "../lib/percentCalculate";
import type { BucketData, OccupancyData } from "../types/occupancy";

dayjs.extend(utc);
dayjs.extend(timezone);

export function useOccupancyMetrics(
  snapshotData: OccupancyData,
  todayStart: number
) {
  return useMemo(() => {
    if (!snapshotData?.buckets?.length) return null;
    const todayBuckets = snapshotData.buckets.filter(
      (b) => b.utc >= todayStart
    );

    const yesterdayBuckets = snapshotData.buckets.filter(
      (b) => b.utc < todayStart
    );
    const avg = (arr: BucketData[]) =>
      arr.length ? arr.reduce((s, b) => s + b.avg, 0) / arr.length : 0;

    const todayAvg = avg(todayBuckets);
    const yesterdayAvg = avg(yesterdayBuckets);

    const percentChange = calculatePercentageChange(yesterdayAvg, todayAvg);

    return {
      todayAvg,
      yesterdayAvg,
      percentChange: percentChange,
      todayBuckets,
      timezone: snapshotData.timezone,
    };
  }, [snapshotData, todayStart]);
}
