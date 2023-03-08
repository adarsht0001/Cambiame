import React from 'react';
import Paper from '@mui/material/Paper';
import {
  Button, Grid, TextField, Typography,
} from '@mui/material';
import cambie from '../../Assets/svg/CAMBIAME.svg';

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

function Form() {
  return (
    <Grid container direction="column" alignItems="center" justify="center" paddingTop={2}>
      <TextField variant="outlined" label="username" fullWidth style={{ marginBlock: '1rem' }} />
      <TextField variant="outlined" label="Password" fullWidth type="password" style={{ marginBlock: '1rem' }} />
      <Button size="large" variant="contained" color="primary">Login</Button>
    </Grid>
  );
}
