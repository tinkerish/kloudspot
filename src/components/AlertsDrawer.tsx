import { useEffect } from "react";
import { useAlerts } from "../hooks/useAlerts";
import {
  Box,
  Drawer,
  IconButton,
  Skeleton,
  styled,
  Typography,
} from "@mui/material";
import AlertItem from "./AlertItem";
import { Close } from "@mui/icons-material";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "1rem",
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

type Props = {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  timezone: string;
  loading: boolean;
  error: boolean;
};
function AlertsDrawer({ open, onClose, timezone, loading }: Props) {
  const { alerts, markAllRead } = useAlerts();

  useEffect(() => {
    if (open) {
      markAllRead();
    }
  }, [open, markAllRead]);
  if (loading) {
    return <Skeleton />;
  }
  
  return (
    <Drawer anchor="right" open={open}>
      <DrawerHeader>
        <Typography variant="h4">Alerts</Typography>
        <IconButton
          onClick={() => {
            markAllRead();
            onClose(false);
          }}
        >
          <Close />
        </IconButton>
      </DrawerHeader>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {alerts.map((alert) => (
          <AlertItem key={alert.eventId} alert={alert} timezone={timezone} />
        ))}
      </Box>
    </Drawer>
  );
}
export default AlertsDrawer;
