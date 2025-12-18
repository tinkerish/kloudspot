import { useOutletContext } from "react-router";
import CrowdEntries from "./CrowdEntries";
import { useMemo } from "react";
import type { DashboardOutletContext } from "./Overview";

const CrowdEntriesRoute = () => {
  const {
    site,
    selectedUtcStart,
    selectedUtcEnd,
  } = useOutletContext<DashboardOutletContext>();

  const tableKey = useMemo(
    () => `${site.siteId}-${selectedUtcStart}-${selectedUtcEnd}`,
    [site.siteId, selectedUtcStart, selectedUtcEnd]
  );

  return <CrowdEntries key={tableKey} />;
};

export default CrowdEntriesRoute;
