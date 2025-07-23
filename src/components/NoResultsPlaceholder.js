import React from 'react';
import { TableRow, TableCell, Typography } from '@mui/material';

const NoResultsPlaceholder = ({ rowsPerPage }) => {
  return (
    <>
      {/* No Results Message */}
      <TableRow>
        <TableCell colSpan={7} align="center" sx={{ height: 53 }}>
          <Typography variant="body1" color="textSecondary">
            No results found for the specified filter
          </Typography>
        </TableCell>
      </TableRow>

      {/* Empty rows to simulate 12-row page height */}
      {Array.from({ length: rowsPerPage - 1 }).map((_, idx) => (
        <TableRow key={`empty-${idx}`} sx={{ height: 53 }}>
          {Array.from({ length: 7 }).map((__, colIdx) => (
            <TableCell key={colIdx}>&nbsp;</TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default NoResultsPlaceholder;
