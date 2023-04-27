import React from 'react';
import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';
import Sidebar from '../../../Components/sidebar/Sidebar';

function Layout() {
  return (
    <Stack display="flex" sx={{ flexDirection: { md: 'row', sm: 'column' } }}>
      <Sidebar />
      <Outlet />
    </Stack>
  );
}

export default Layout;
