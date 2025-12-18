import {
  KeyboardArrowDown,
  LocationOn,
} from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Skeleton,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
type Site = {
  siteId: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
};

type Props = {
  sites: Site[];
  value: string;
  onChange: (site: string) => void;
  loading: boolean;
  error: boolean
};

const LocationSelect = ({ sites, value, onChange,loading,error }: Props) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const site = sites.find(s => s.siteId === event.target.value);
    if (site) onChange(site.siteId);
  };
  if (loading) {
    return <Skeleton variant="rounded" width={220} height={40} />;
  }

  if (error) {
    return (
      <Box
        sx={{
          width: 220,
          height: 40,
          borderRadius: "8px",
          border: "1px solid",
          borderColor: "error.main",
          display: "flex",
          alignItems: "center",
          px: 1.5,
        }}
      >
        <Typography color="error" variant="body2">
          Failed to load sites
        </Typography>
      </Box>
    );
  }

  return (
    <FormControl>
      <Select
        value={value}
        onChange={handleChange}
        IconComponent={KeyboardArrowDown}
        input={
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <LocationOn />
              </InputAdornment>
            }
          />
        }
        sx={{
          borderRadius: "8px",
          "& .MuiSelect-select": { padding: "8px" },
          "& .MuiSelect-icon": { color: "black" },
        }}
      >
        {sites.map((site) => (
          <MenuItem key={site.siteId} value={site.siteId}>
            {site.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LocationSelect;
