import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Skeleton, Typography } from "@mui/material";
import { useMemo } from "react";

type Props = {
  labels: string[];
  femaleValues: number[];
  maleValues: number[];
  loading: boolean;
  error: boolean;
};

const MAX_PADDING = 3;
function getRoundedMax(values: number[], step = 50, padding = 1.1) {
  if (!values || values.length == 0) return 0;
  const max = Math.max(...values);
  return Math.ceil((max * padding) / step) * step;
}

export default function DemographicsChart({
  labels,
  maleValues,
  femaleValues,
  loading,
  error,
}: Props) {

  const paddedLabels = useMemo(() => {
    if (!labels || labels.length == 0) return [];

    const hours = labels.map((v) => Number(v.slice(0, 2)));
    const maxHour = Math.max(...hours);

    if (maxHour >= 23) {
      return labels;
    }

    const availableFutureHours = 23 - maxHour;
    const paddingCount = Math.min(MAX_PADDING, availableFutureHours);

    const futureLabels = Array.from({ length: paddingCount }, (_, i) =>
      `${String(maxHour + i + 1).padStart(2, "0")}:00`
    );

    return [...labels, ...futureLabels];
  }, [labels]);
  const paddedMaleValues = useMemo(() => {
    if (!maleValues || maleValues.length == 0) return [];
    return paddedLabels.map((_, i) => maleValues[i] ?? null);
  }, [paddedLabels, maleValues]);
  const paddedFemaleValues = useMemo(() => {
    if (!femaleValues || femaleValues.length == 0) return [];
    return paddedLabels.map((_, i) => femaleValues[i] ?? null);
  }, [paddedLabels, femaleValues]);

  if (loading) {
    return <Skeleton variant="rectangular" width={"60%"} height={348} />;
  }
  if (
    error ||
    !labels ||
    !maleValues ||
    !femaleValues ||
    !labels.length ||
    !maleValues.length ||
    !femaleValues.length
  ) {
    return null;
  }
  const yMax = getRoundedMax([...maleValues, ...femaleValues], 50);
  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#fff",
        borderRadius: 2,
        p: 2,
        flex: 1,
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          top: 12,
          left: 16,
          fontSize: 14,
          fontWeight: 600,
          zIndex: 1,
        }}
      >
        Demographics Analysis
      </Typography>
      <LineChart
        xAxis={[
          {
            data: paddedLabels,
            scaleType: "point",
            label: "Time",
          },
        ]}
        yAxis={[
          {
            min: 0,
            max: yMax,
            label: "Count",
          },
        ]}
        series={[
          {
            id: "male",
            label: "Male",
            data: paddedMaleValues,
            curve: "monotoneX",
            showMark: false,
            area: true,
            valueFormatter: (v) => {
              return v === null ? "?" : v.toString();
            },
            color: "#2A7F7D99",
          },
          {
            id: "female",
            label: "Female",
            data: paddedFemaleValues,
            curve: "monotoneX",
            showMark: false,
            valueFormatter: (v) => {
              return v === null ? "?" : v.toString();
            },
            color: "#47B2B080",
          },
        ]}
        height={320}
        margin={{ left: 60, right: 50, top: 20, bottom: 40 }}
        grid={{ horizontal: true, vertical: false }}
        sx={{
          "& .MuiLineElement-root": { strokeWidth: 2.5 },
          "& .MuiAreaElement-root": { fill: "url(#areaGradient)" },
          "& .MuiChartsGrid-line": {
            strokeDasharray: "3 3",
            opacity: 0.3,
          },
          "& .MuiChartsLegend-root": {
            justifySelf: "flex-end",
          },
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4db6ac" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#4db6ac" stopOpacity={0.05} />
          </linearGradient>
        </defs>
      </LineChart>
    </Box>
  );
}
