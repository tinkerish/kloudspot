import { Box, Skeleton, Typography, styled } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts";
import { useMemo } from "react";
import {  Man, Woman } from "@mui/icons-material";


type Props = {
  labels: string[];
  maleValues: number[];
  femaleValues: number[];
  loading: boolean;
  error: boolean;
};


const MALE_COLOR = "#2A7F7D99";
const FEMALE_COLOR = "#47B2B080";


const CenterText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
}));

function PieCenterLabel() {
  const { width, height, left, top } = useDrawingArea();

  const cx = left + width / 2;
  const cy = top + height / 2;

  return (
    <>
      <CenterText x={cx} y={cy - 8} fontSize={14} opacity={0.7}>
        Total Crowd
      </CenterText>
      <CenterText x={cx} y={cy + 14} fontSize={22} fontWeight={600}>
        100%
      </CenterText>
    </>
  );
}


export default function DemographicsPieChart({
  labels,
  maleValues,
  femaleValues,
  loading,
  error,
}: Props) {
  const pieChartData = useMemo(() => {
    if (
      !maleValues ||
      !femaleValues ||
      !maleValues.length ||
      !femaleValues.length
    )
      return [];

    const count = Math.min(maleValues.length, femaleValues.length);

    const avgMale =
      maleValues.slice(0, count).reduce((s, v) => s + v, 0) / count;

    const avgFemale =
      femaleValues.slice(0, count).reduce((s, v) => s + v, 0) / count;

    const total = avgMale + avgFemale;

    return [
      {
        id: "female",
        label: "Female",
        value: Math.round((avgFemale / total) * 100),
        color: FEMALE_COLOR,
      },
      {
        id: "male",
        label: "Male",
        value: Math.round((avgMale / total) * 100),
        color: MALE_COLOR,
      },
    ];
  }, [maleValues, femaleValues]);

  if (loading) {
    return <Skeleton variant="rounded" width={"37%"} height={348} />;
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

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#fff",
        borderRadius: 2,
        p: 4,

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
        Chart of Demographics
      </Typography>
      <PieChart
        series={[
          {
            data: pieChartData,
            innerRadius: 70,
            outerRadius: 100,
            paddingAngle: 2,
            cornerRadius: 10,
            startAngle: -45,
            endAngle: 315,
          },
        ]}
        hideLegend={true}
        width={220}
        height={220}
        margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
        sx={{
          "& .MuiChartsLegend-root": {
            justifySelf: "flex-end",
          },
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <PieCenterLabel />
      </PieChart>
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Man className="text-[#7FB7B3]" />
          <Typography variant="body2">
            {pieChartData[0]?.value}% Males
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 1,
          }}
        >
          <Woman className="text-[#C4E6E3]" />
          <Typography variant="body2">
            {pieChartData[1]?.value}% Females
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
