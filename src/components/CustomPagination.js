import React from 'react';
import { Box, Pagination, PaginationItem } from '@mui/material';

const CustomPagination = ({ count, page, rowsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(count / rowsPerPage);

  return (
    <Box display="flex" justifyContent="center" px={2} py={1} mt={2}>
      <Pagination
        count={totalPages}
        page={page + 1} 
        onChange={(event, newPage) => onPageChange(event, newPage - 1)} 
        shape="rounded"
        color="grey"
        siblingCount={0} 
        boundaryCount={1} 
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: (props) => <span {...props}>&lt;</span>,
              next: (props) => <span {...props}>&gt;</span>
            }}
            {...item}
          />
        )}
      />
    </Box>
  );
};

export default CustomPagination;
