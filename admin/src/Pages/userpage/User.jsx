/* eslint-disable import/no-named-as-default-member */
import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import AccessibleTable from '../../Components/table/Table';
import axios from '../../Axios/Axios';

function User() {
  const [values, setValues] = useState([]);
  useEffect(() => {
    axios.get('/users').then((res) => {
      console.log(res);
      setValues(res.data.data);
    }).catch((err) => console.log(err));
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
      {values.length > 0 ? <AccessibleTable data={values} /> : 'loading' }
    </Stack>
  );
}

export default User;
