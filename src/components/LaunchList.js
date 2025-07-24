import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography
} from '@mui/material';
import Loading from './Loading';
import CalendarFilter from './CalendarFilter';
import FilterControls from './FilterControls';
import CustomPagination from './CustomPagination';
import './LaunchList.css'; 


const LaunchList = ({
  launches,
  launchpadMap,
  rocketMap,
  rockets,
  onRowClick,
  page,
  rowsPerPage,
  totalLaunches,
  onChangePage,
  onChangeRowsPerPage,
  isLoading,
  selectedDateRange,
  onDateRangeChange,
  filter,
  setFilter
}) => {
  const getOrbit = (rocketId) => {
    const rocket = rockets.find(rocket => rocket.id === rocketId);
    if (rocket && rocket.payload_weights && rocket.payload_weights.length > 0) {
      return rocket.payload_weights[0].id.toUpperCase();
    }
    return 'N/A';
  };

  const formatUTCDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    };

    return date.toLocaleString('en-GB', options).replace(',', ' at');
  };

  return (
    <Box className="launch-list-container">
      <Box className="launch-list-header">
        <CalendarFilter selectedDateRange={selectedDateRange} onDateRangeChange={onDateRangeChange} />
        <FilterControls filter={filter} setFilter={setFilter} />
      </Box>

      <TableContainer component={Paper} className="launch-list-table-container">
        <Table className="launch-list-table">
  <TableHead>
    <TableRow>
      {['No.', 'Launched (UTC)', 'Location', 'Mission', 'Orbit', 'Launch Status', 'Rocket'].map((label, idx) => (
        <TableCell
          key={idx}
          sx={{
            fontWeight: 'bold',
            fontSize: '0.95rem',
            backgroundColor: '#f4f4f4'
          }}
        >
          {label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>

  <TableBody>
    {isLoading ? (
  <TableRow>
    <TableCell colSpan={7} align="center">
      <Loading />
    </TableCell>
  </TableRow>
) : launches.length > 0 ? (
  launches.map((launch, index) => (
    <TableRow
      key={launch.id}
      onClick={() => onRowClick(launch)}
      className="table-row-clickable"
    >
      <TableCell>{String(index + 1 + page * rowsPerPage).padStart(2, '0')}</TableCell>
      <TableCell>{formatUTCDate(launch.date_utc)}</TableCell>
      <TableCell>{launchpadMap[launch.launchpad] || 'Unknown Location'}</TableCell>
      <TableCell>{launch.name}</TableCell>
      <TableCell>{getOrbit(launch.rocket)}</TableCell>
      <TableCell>
        <span className={`status-badge ${
          launch.upcoming
            ? 'status-upcoming'
            : launch.success
            ? 'status-success'
            : 'status-failed'
        }`}>
          {launch.upcoming ? 'Upcoming' : launch.success ? 'Success' : 'Failed'}
        </span>
      </TableCell>
      <TableCell>{rocketMap[launch.rocket] || 'Unknown Rocket'}</TableCell>
    </TableRow>
  ))
) : (
  <>
    <TableRow>
      <TableCell colSpan={7} align="center" sx={{ height: 53 }}>
        <Typography variant="body1" color="textSecondary">
          No results found for the specified filter
        </Typography>
      </TableCell>
    </TableRow>
    {Array.from({ length: rowsPerPage - 1 }).map((_, idx) => (
      <TableRow key={`empty-${idx}`} sx={{ height: 53 }}>
        {Array.from({ length: 7 }).map((__, colIdx) => (
          <TableCell key={colIdx}>&nbsp;</TableCell>
        ))}
      </TableRow>
    ))}
  </>
)}

  </TableBody>
</Table>

      </TableContainer>

      {!isLoading && launches.length > 0 && (
        <Box className="pagination-container">
          <CustomPagination
            count={totalLaunches}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </Box>
      )}
    </Box>
  );
};

export default LaunchList;
