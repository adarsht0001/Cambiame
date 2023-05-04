import { Box, Paper } from '@mui/material';
import React from 'react';
import UserGraph from './UserGraph';
import PostGraph from './PostGrapgh';

function Charts() {
  return (
    <Box display="flex" p={5} gap={2} justifyContent="space-between">
      <Paper sx={{ width: '600px' }}>
        <UserGraph />
      </Paper>
      <Paper sx={{ width: '600px' }}>
        <PostGraph />
      </Paper>
    </Box>
  );
}

export default Charts;
