import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Sidebar from "../../components/Sidebar";
import Location from "../../components/Location";
import { Divider } from "@mui/material";
import Language from "../../components/Language";
import Notification from "../../components/Notification";
import AvatarComponent from "../../components/Avatar";
import DashboardContent from "../../components/DashboardContent";
import { useSites } from "../../hooks/useSites";
import AlertsDrawer from "../../components/AlertsDrawer";
import type { SiteData } from "../../types/commonContext";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer - 1,
  marginLeft: open ? drawerWidth : 0,
  backgroundColor: "white",
  boxShadow: "none",
  width: open ? `calc(100% - ${drawerWidth}px)` : "calc(100% - 50px)",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const Dashboard = () => {
  const [open, setOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const sitesData = useSites();
  const [selectedSiteId, setSelectedSiteId] = React.useState<string>(
    sitesData.data ? sitesData.data[0].siteId : ""
  );
  React.useEffect(() => {
    if (sitesData.data?.length) {
      setSelectedSiteId((prev) => prev || sitesData.data[0].siteId);
    }
  }, [sitesData.data]);

  const selectedSite = React.useMemo(() => {
    if (!selectedSiteId || !sitesData.data?.length) return null;

    return (
      sitesData.data.find((s: SiteData) => s.siteId === selectedSiteId) ?? null
    );
  }, [selectedSiteId, sitesData.data]);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar open={open} handleDrawerOpen={setOpen} />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="h4"
              noWrap
              component="h1"
              className="text-black"
              sx={{
                fontWeight: "500",
                lineHeight: "20px",
                fontSize: "18px",
                letterSpacing: "1px",
              }}
            >
              Crowd Solutions
            </Typography>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ borderColor: "#1E1E1F80" }}
            />
            <Location
              sites={sitesData.data}
              value={selectedSiteId}
              onChange={setSelectedSiteId}
              loading={sitesData.isLoading}
              error={sitesData.isError}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Language />
            <Notification
              handleAlertDrawer={setAlertOpen}
              alertDrawerOpen={alertOpen}
              loading={sitesData.isLoading}
              error={sitesData.isError}
            />
            <AvatarComponent name="Priya Pandey" />
          </Box>
        </Toolbar>
      </AppBar>
      <DashboardContent
        site={selectedSite}
        loading={sitesData.isLoading || !selectedSite}
        error={sitesData.isError}
      />
      <AlertsDrawer
        onClose={setAlertOpen}
        open={alertOpen}
        timezone={sitesData.data?.timezone}
        loading={sitesData.isLoading}
        error={sitesData.isError}
      />
    </Box>
  );
};

export default Dashboard;
