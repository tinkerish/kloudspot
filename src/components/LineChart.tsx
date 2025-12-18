import { LineChart } from "@mui/x-charts/LineChart";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";
import { useDrawingArea } from "@mui/x-charts";
import { Box, Skeleton, Typography } from "@mui/material";
import { useMemo } from "react";

type Props = {
  labels: string[] | null;
  values: number[] | null;
  loading: boolean;
  error: boolean;
};

const MAX_PADDING = 3;
function getRoundedMax(values: number[] | null, step = 50, padding = 1.1) {
  if (!values || values.length == 0) return 0;
  const max = Math.max(...values);
  return Math.ceil((max * padding) / step) * step;
}

export default function LiveAreaChart({
  labels,
  values,
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

    const futureLabels = Array.from(
      { length: paddingCount },
      (_, i) => `${String(maxHour + i + 1).padStart(2, "0")}:00`
    );

    return [...labels, ...futureLabels];
  }, [labels]);
  const paddedValues = useMemo(() => {
    if (!values || values.length == 0) return [];
    return paddedLabels.map((_, i) => values[i] ?? null);
  }, [paddedLabels, values]);

  const liveIndex = labels && labels.length > 0 ? labels.length - 1 : -1;
  const liveLabel = liveIndex >= 0  && labels ? labels[liveIndex] : 0;

  const yMax = getRoundedMax(values, 50);
  if (loading) {
    return <Skeleton variant="rectangular" width={"100%"} height={348} />;
  }
  if (error || !labels || !values || labels.length == 0 || values.length == 0) {
    return null;
  }
  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#fff",
        borderRadius: 2,
        p: 2,
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
        Overall Occupancy
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
            label: "Occupancy",
            data: paddedValues,
            area: true,
            showMark: false,
            curve: "monotoneX",
            valueFormatter: (v) => {
              return v === null ? "?" : v.toString();
            },
            color: "#2A7F7D99",
          },
        ]}
        height={320}
        margin={{ left: 60, right: 50, top: 20, bottom: 40 }}
        grid={{ horizontal: true, vertical: true }}
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
        <ChartsReferenceLine
          x={liveLabel}
          lineStyle={{
            stroke: "#d32f2f",
            strokeDasharray: "4 4",
            strokeWidth: 1.5,
          }}
        />
        <LiveSvgLabel index={liveIndex} total={paddedLabels.length} />
      </LineChart>
    </Box>
  );
}
const RECT_WIDTH = 48;
const RECT_HEIGHT = 20;

function LiveSvgLabel({ index, total }: { index: number; total: number }) {
  const { left, top, width } = useDrawingArea();

  let x;
  if (total <= 1) {
    x = left + width / 2;
  } else {
    x = left + (index / (total - 1)) * width;
  }
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <g transform={`translate(${x}, ${top + 20}) rotate(-90)`}>
        <rect
          x={-RECT_WIDTH / 2}
          y={-RECT_HEIGHT / 2}
          width={RECT_WIDTH}
          height={RECT_HEIGHT}
          rx={4}
          fill="#d32f2f"
        />
        <text
          x={0}
          y={1}
          fill="white"
          fontSize={12}
          fontWeight={600}
          letterSpacing={"1.5px"}
          dominantBaseline="middle"
          textAnchor="middle"
        >
          LIVE
        </text>
      </g>
    </svg>
  );
}
