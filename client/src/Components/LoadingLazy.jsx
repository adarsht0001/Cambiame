import { Skeleton, Stack } from '@mui/material';
import React from 'react';

function LoadingLazy() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
  );
}

export default LoadingLazy;
