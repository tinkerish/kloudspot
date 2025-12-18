import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { LinearProgress, Skeleton, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useEntries } from "../hooks/useEntries";
import { useOutletContext } from "react-router";
import { fetchEntries } from "../api/entries";
import AvatarComponent from "./Avatar";
import type { DashboardOutletContext } from "./Overview";
import type { EntryRecord } from "../types/crowdEntries";

dayjs.extend(utc);
dayjs.extend(timezone);

// ---------------- styles (UNCHANGED) ----------------
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E8E8E8",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRowCell = styled(TableCell)(() => ({
  color: "#696974",
  paddingTop: 12,
  paddingBottom: 12,
}));

const SkeletonRow = ({ columns }: { columns: number }) => (
  <TableRow>
    {Array.from({ length: columns }).map((_, i) => (
      <TableCell key={i}>
        <Skeleton variant="text" height={20} />
      </TableCell>
    ))}
  </TableRow>
);

const CrowdEntries = () => {
  const [page, setPage] = useState(0); // MUI uses 0-based index
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const queryClient = useQueryClient();
  const {
    selectedUtcStart,
    selectedUtcEnd,
    site,
  } = useOutletContext<DashboardOutletContext>();

  const { data, isLoading, isFetching } = useEntries(
    site.siteId,
    page + 1,
    rowsPerPage,
    selectedUtcStart,
    selectedUtcEnd
  );
  const records = data?.records ?? [];
  const totalRecords = data?.totalRecords ?? 0;

  const formatTime = (utcValue: number | null) => {
    if (!utcValue) return "--";
    return dayjs.utc(utcValue).tz(site.timezone).format("HH:mm");
  };

  const formatDwell = (minutes: number | null) =>
    minutes == null ? "--" : `${minutes.toFixed(2)} min`;

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    if (!data) return;

    queryClient.prefetchQuery({
      queryKey: [
        "crowdEntries",
        site.siteId,
        selectedUtcStart,
        selectedUtcEnd,
        page + 2,
        rowsPerPage,
      ],
      queryFn: async () =>
        fetchEntries({
          queryKey: [
            "crowdEntries",
            {
              path: "https://hiring-dev.internal.kloudspot.com/api/analytics/entry-exit",
              params: {
                siteId: site.siteId,
                fromUtc: selectedUtcStart,
                toUtc: selectedUtcEnd,
                pageNumber: page + 2,
                pageSize: rowsPerPage,
              },
            },
          ],
        }),
      staleTime: 60_000,
    });
  }, [
    data,
    page,
    rowsPerPage,
    site.siteId,
    selectedUtcStart,
    selectedUtcEnd,
    queryClient,
  ]);

  return (
    <Paper>
      <TableContainer
        sx={{
          maxHeight: 550,
        }}
      >
        <Table
          sx={{ minWidth: 650 }}
          aria-label="crowd entries table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Sex</StyledTableCell>
              <StyledTableCell>Entry</StyledTableCell>
              <StyledTableCell>Exit</StyledTableCell>
              <StyledTableCell>Dwell Time</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading &&
              Array.from({ length: rowsPerPage }).map((_, i) => (
                <SkeletonRow key={i} columns={5} />
              ))}

            {!isLoading &&
              records.map((row: EntryRecord) => (
                <TableRow
                  key={`${row.personId}-${row.entryUtc}`}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <StyledTableRowCell
                    component="th"
                    scope="row"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <AvatarComponent name={row.personName} />{" "}
                    {row.personName ?? "--"}
                  </StyledTableRowCell>
                  <StyledTableRowCell>{row.gender ?? "--"}</StyledTableRowCell>
                  <StyledTableRowCell>
                    {formatTime(row.entryUtc)}
                  </StyledTableRowCell>
                  <StyledTableRowCell>
                    {formatTime(row.exitUtc)}
                  </StyledTableRowCell>
                  <StyledTableRowCell>
                    {formatDwell(row.dwellMinutes)}
                  </StyledTableRowCell>
                </TableRow>
              ))}

            {!isLoading && records.length === 0 && (
              <TableRow>
                <StyledTableRowCell colSpan={5}>
                  No data available
                </StyledTableRowCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        count={totalRecords}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        disabled={isFetching}
      />

      {isFetching && records.length > 0 && <LinearProgress />}
    </Paper>
  );
};

export default CrowdEntries;
