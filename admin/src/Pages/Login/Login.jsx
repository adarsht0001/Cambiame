import React from 'react';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';
import cambie from '../../Assets/svg/CAMBIAME.svg';
import Form from './Form';

function Login() {
  return (
    <Grid
      style={{ minHeight: '100vh' }}
      container
      sx={{
        p: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        direction: 'column',
      }}
    >
      <Paper elevation={20} container sx={{ padding: 10 }}>
        <Grid
          item
          display="flex"
          justifyContent="center"
        >
          <img src={cambie} alt="" />
        </Grid>
        <Grid
          item
          textAlign="center"
          paddingTop={5}
        >
          <Typography variant="h5" color="initial">Admin Login</Typography>
          <Form />
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Login;
