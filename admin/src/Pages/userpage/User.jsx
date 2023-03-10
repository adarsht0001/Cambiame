import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import BasicTable from '../../Components/table/Table';
import axios from '../../Axios/Axios';

function User() {
  useEffect(() => {
    axios.get('/users').then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <Stack
      minHeight="100vh"
      minWidth="100vh"
      direction={{ xs: 'column', md: 'row' }}
      container
      sx={{ width: '80%' }}
      justifyContent="center"
      alignItems="center"
    >
      <BasicTable />

    </Stack>
  );
}

export default User;
