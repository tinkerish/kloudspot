import { Box, Chip, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

type AlertItemProps = {
  alert: {
    eventId: string;
    personName: string;
    direction: "entry" | "exit";
    zoneName: string;
    severity: "low" | "medium" | "high";
    ts: number;
    read: boolean;
  };
  timezone: string;
};

const severityColor = {
  high: "error",
  medium: "warning",
  low: "success",
} as const;

export default function AlertItem({ alert, timezone }: AlertItemProps) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: alert.read ? "grey.300" : "primary.main",
        backgroundColor: alert.read ? "#fff" : "#E6FAF7", 
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="body2" color="text.secondary">
          {formatAlertDate(alert.ts, timezone)} &nbsp;{" "}
          {formatAlertTime(alert.ts, timezone)}
        </Typography>

        <Typography fontWeight={600}>
          {alert.personName}{" "}
          {alert.direction === "entry" ? "Entered" : "Exited"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mt: 0.5,
          }}
        >
          <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />
          <Typography variant="body2" color="text.secondary">
            {alert.zoneName}
          </Typography>
        </Box>
      </Box>

      <Chip
        label={capitalize(alert.severity)}
        color={severityColor[alert.severity]}
        size="small"
        sx={{ height: 24 }}
      />
    </Box>
  );
}


function formatAlertDate(ts: number, tz: string) {
  return dayjs.utc(ts).tz(tz).format("MMMM DD YYYY");
}

function formatAlertTime(ts: number, tz: string) {
  return dayjs.utc(ts).tz(tz).format("HH:mm");
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
