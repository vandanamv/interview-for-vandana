import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
      }}
    >
      <CircularProgress
        sx={{
          color: '#1976d2', 
        }}
      />
    </Box>
  );
};

export default Loading;
