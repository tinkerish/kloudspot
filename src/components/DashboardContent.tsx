import { Box, Skeleton, styled, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { Outlet } from "react-router";
import DatePickerComponent from "./DatePicker";
import { getEndOfDayUtc, getPreviousDay, getStartOfDayUtc } from "../lib/dates";
import { useLiveAlerts } from "../hooks/useLiveAlerts";
import type { SiteData } from "../types/commonContext";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
type Props = {
  site: SiteData;
  loading: boolean;
  error: boolean;
};
const DashboardContent = ({ site, loading, error }: Props) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );
  const previousUtcStart = useMemo(() => {
    if (!selectedDate || !site) return null;
    const prevDate = getPreviousDay(selectedDate, site.timezone);
    return getStartOfDayUtc(prevDate, site.timezone);
  }, [selectedDate, site]);
  const previousUtcEnd = useMemo(() => {
    if (!selectedDate || !site) return null;
    const prevDate = getPreviousDay(selectedDate, site.timezone);
    return getEndOfDayUtc(prevDate, site.timezone);
  }, [selectedDate, site]);
  const selectedUtcStart = useMemo(() => {
    if (!selectedDate || !site) return null;
    return getStartOfDayUtc(selectedDate, site.timezone);
  }, [selectedDate, site]);
  const selectedUtcEnd = useMemo(() => {
    if (!selectedDate || !site) return null;
    return getEndOfDayUtc(selectedDate, site.timezone);
  }, [selectedDate, site]);
  useLiveAlerts(site?.siteId);
  if (loading) {
    return (
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Skeleton variant="text" width={120} height={32} />
          <Skeleton variant="rounded" width={160} height={40} />
        </Box>

        <Skeleton variant="rounded" width="100%" height={500} />
      </Box>
    );
  }
  if (error) {
    return (
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h6">Overview</Typography>
        </Box>

        <Box
          sx={{
            border: "1px solid",
            borderColor: "error.main",
            borderRadius: 2,
            p: 2,
            backgroundColor: "",
            height: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography color="error">Failed to load dashboard data</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, backgroundColor: "#f7f8fa", minWidth: 0,overflowX:"scroll" }}
    >
      <DrawerHeader />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "1rem",
          minWidth: "700px"
        }}
      >
        <Typography variant="h6">Overview</Typography>
        <DatePickerComponent date={selectedDate} handleDate={setSelectedDate} />
      </Box>
      <Outlet
        context={{
          selectedDate,
          selectedUtcStart,
          selectedUtcEnd,
          previousUtcStart,
          previousUtcEnd,
          site,
        }}
      />
    </Box>
  );
};

export default DashboardContent;
