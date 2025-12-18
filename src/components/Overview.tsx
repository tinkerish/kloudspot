import { Box, Divider, Typography } from "@mui/material";
import { useOccupancySnapshot } from "../hooks/useOccupancy";
import { useLiveOccupancy } from "../hooks/useLiveOccupancy";
import { useOccupancyMetrics } from "../hooks/useOccupancyMetrics";
import BasicArea from "./LineChart";
import { useFootfall } from "../hooks/useFootfall";
import formatHourToHH00 from "../lib/formatDateToHour";
import { useOutletContext } from "react-router";
import OverviewCard from "./OverviewCard";
import { useMemo } from "react";
import { useDwell } from "../hooks/useDwellTime";
import { formatMinutes } from "../lib/dates";
import { calculatePercentageChange } from "../lib/percentCalculate";
import DemographicsChart from "./Demographics";
import { useDemographics } from "../hooks/useDemographics";
import DemographicsPieChart from "./DemographicsPieChart";
import type { SiteData } from "../types/commonContext";
import type { DemoGraphicsBucketData } from "../types/demographics";
import type { BucketData } from "../types/occupancy";
// outletContext.ts (or near the router)
export type DashboardOutletContext = {
  selectedDate: Date;
  selectedUtcStart: number;
  selectedUtcEnd: number;
  previousUtcStart?: number;
  previousUtcEnd?: number;
  site: SiteData;
};

const Overview = () => {
  const {
    selectedUtcStart,
    selectedUtcEnd,
    previousUtcStart,
    previousUtcEnd,
    site,
  } = useOutletContext<DashboardOutletContext>();
  const occupancyData = useOccupancySnapshot(
    site.siteId,
    previousUtcStart,
    selectedUtcEnd
  );
  const demographicsData = useDemographics(
    site.siteId,
    selectedUtcStart,
    selectedUtcEnd
  );
  const liveOccupany = useLiveOccupancy(site.siteId);
  const footfallDataCurrentDay = useFootfall(
    site.siteId,
    selectedUtcStart,
    selectedUtcEnd
  );
  const footfallDataPreviousDay = useFootfall(
    site.siteId,
    previousUtcStart,
    previousUtcEnd
  );
  const dwellTimeDataCurrentDay = useDwell(
    site.siteId,
    selectedUtcStart,
    selectedUtcEnd
  );
  const dwellTimeDataPreviousDay = useDwell(
    site.siteId,
    previousUtcStart,
    previousUtcEnd
  );
  const dwellData = useMemo(() => {
    if (
      !dwellTimeDataCurrentDay.isSuccess ||
      !dwellTimeDataPreviousDay.isSuccess
    ) {
      return null;
    }

    return {
      value: formatMinutes(dwellTimeDataCurrentDay.data.avgDwellMinutes),
      percentChange: calculatePercentageChange(
        dwellTimeDataPreviousDay.data.avgDwellMinutes,
        dwellTimeDataCurrentDay.data.avgDwellMinutes
      ),
    };
  }, [dwellTimeDataCurrentDay, dwellTimeDataPreviousDay]);
  const footfallData = useMemo(() => {
    if (!footfallDataCurrentDay.isSuccess || !footfallDataPreviousDay.isSuccess)
      return null;
    return {
      value: footfallDataCurrentDay.data.footfall,
      percentChange: calculatePercentageChange(
        footfallDataPreviousDay.data.footfall,
        footfallDataCurrentDay.data.footfall
      ),
    };
  }, [footfallDataCurrentDay, footfallDataPreviousDay]);

  const occupancyMetrics = useOccupancyMetrics(
    occupancyData.data,
    selectedUtcStart
  );
  const occupancyLiveData = useMemo(() => {
    if (!occupancyMetrics) return null;
    return {
      value: liveOccupany || occupancyMetrics.todayAvg,
      percentChange: occupancyMetrics.percentChange,
    };
  }, [occupancyMetrics, liveOccupany]);
  const occupancyLabels = useMemo(() => {
    if (!occupancyMetrics) return null;

    return occupancyMetrics.todayBuckets.map((b: BucketData) =>
      formatHourToHH00(b.utc, occupancyMetrics.timezone)
    );
  }, [occupancyMetrics]);

  const occupancyValues = useMemo(() => {
    if (!occupancyMetrics) return null;
    return occupancyMetrics.todayBuckets.map((b: BucketData) => b.avg);
  }, [occupancyMetrics]);

  const demographicsLabels = useMemo(() => {
    if (!demographicsData.isSuccess) return null;
    return demographicsData.data.buckets.map((b: DemoGraphicsBucketData) =>
      formatHourToHH00(b.utc, demographicsData.data.timezone)
    );
  }, [demographicsData]);
  const demographicsMaleValues = useMemo(() => {
    if (!demographicsData.isSuccess) return null;
    return demographicsData.data.buckets.map(
      (b: DemoGraphicsBucketData) => b.male
    );
  }, [demographicsData]);
  const demographicsFemaleValues = useMemo(() => {
    if (!demographicsData.isSuccess) return null;
    return demographicsData.data.buckets.map(
      (b: DemoGraphicsBucketData) => b.female
    );
  }, [demographicsData]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        minWidth: "700px"
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: "18px",
        }}
      >
        Occupancy
      </Typography>
      <Box sx={{ display: "flex", gap: "12px" }}>
        <Box
          sx={{
            display: "flex",
            flex: 2,
            width: "100%",
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        >
          <OverviewCard
            title="Live Occupancy"
            data={occupancyLiveData}
            loading={occupancyData.isLoading}
            error={occupancyData.isError}
            customProps={{
              borderRadius: 0,
              borderTopRightRadius: "0",
              borderTopLeftRadius: "8px",
              borderBottomRightRadius: "0",
              borderBottomLeftRadius: "8px",
            }}
          />

          <Divider orientation="vertical" flexItem variant="middle" />
          <OverviewCard
            title="Today's Footfall"
            data={footfallData}
            loading={
              footfallDataCurrentDay.isLoading ||
              footfallDataPreviousDay.isLoading
            }
            error={
              footfallDataCurrentDay.isError || footfallDataPreviousDay.isError
            }
            customProps={{
              borderRadius: 0,
              borderTopRightRadius: "8px",
              borderTopLeftRadius: "0",
              borderBottomRightRadius: "8px",
              borderBottomLeftRadius: "0",
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <OverviewCard
            title="Avg Dwell Time"
            data={dwellData}
            loading={
              dwellTimeDataCurrentDay.isLoading ||
              dwellTimeDataPreviousDay.isLoading
            }
            error={
              dwellTimeDataCurrentDay.isError ||
              dwellTimeDataPreviousDay.isError
            }
          />
        </Box>
      </Box>
      <Box>
        <BasicArea
          labels={occupancyLabels}
          values={occupancyValues}
          loading={occupancyData.isLoading}
          error={occupancyData.isError}
        />
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontSize: "18px",
        }}
      >
        Demographics
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <DemographicsPieChart
          loading={demographicsData.isLoading}
          error={demographicsData.isError}
          labels={demographicsLabels}
          maleValues={demographicsMaleValues}
          femaleValues={demographicsFemaleValues}
        />
        <DemographicsChart
          loading={demographicsData.isLoading}
          error={demographicsData.isError}
          labels={demographicsLabels}
          maleValues={demographicsMaleValues}
          femaleValues={demographicsFemaleValues}
        />
      </Box>
    </Box>
  );
};

export default Overview;
