import { TrendingDown, TrendingUp } from "@mui/icons-material";
import { Card, CardContent, Typography, Skeleton } from "@mui/material";

type Props = {
  title: string;
  data: OverviewData | null;
  customProps?: Record<string, number | string>;
  loading: boolean;
  error: boolean;
};
type OverviewData = {
  value: number| string;
  percentChange: number;
};

const OverviewCard = ({
  data,
  title,
  customProps = {},
  loading,
  error,
}: Props) => {
  return (
    <Card
      sx={{
        width: "100%",
        boxShadow: "none",
        ...customProps,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "500",
            fontSize: "16px",
          }}
        >
          {title}
        </Typography>

        {loading ? (
          <Skeleton variant="text" width={120} height={42} />
        ) : error ? (
          <Typography color="error">Failed to load</Typography>
        ) : (
          <Typography variant="h4">{data!.value}</Typography>
        )}
        {loading ? (
          <Skeleton variant="text" width={120} height={24} />
        ) : error ? (
          <Typography color="error">Failed to load</Typography>
        ) : data!.percentChange < 0 ? (
          <TrendingDown color="error" />
        ) : (
          <TrendingUp color="success" />
        )}
        {loading ? (
          <Skeleton variant="text" width={120} height={20} />
        ) : error ? (
          <Typography color="error">Failed to load</Typography>
        ) : data!.percentChange < 0 ? (
          <Typography variant="body2" color="text.secondary">{`${Math.abs(
            data!.percentChange
          )}% Less than previous day`}</Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">{`${
            data!.percentChange
          }% More than previous day`}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
