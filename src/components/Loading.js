import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="400px">
      <CircularProgress />
      <Typography variant="body1" color="textSecondary" mt={2}>
        Loading launches...
      </Typography>
    </Box>
  );
};

export default Loading;
