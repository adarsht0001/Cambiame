import {
  Box, Typography, TextField, Button, Grid, Stack,
} from '@mui/material';
import React from 'react';
import cambie from '../../Assets/svg/CAMBIAME.svg';
import imgs from '../../Assets/Images/shubham-dhage-4MDR5izP5sY-unsplash.jpg';
import './Login.css';

function Login() {
  return (
    <Grid
      minHeight="100vh"
      direction={{ xs: 'column', md: 'row' }}
      rowSpacing={2}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        direction: 'column',
        // backgroundImage: 'linear-gradient(to right, #f57c00 0%,#ace0f9 100%)',
        backgroundImage: `url(${imgs})`,
        backgroundPosition: 'right',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '10px' }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
        p={5}
        className="centerDiv"
      >
        <Box>
          <img src={cambie} alt="" />
          {/* <Typography variant="body1">Lorem, ipsum doljashfj</Typography> */}
          {/* <Typography color="white" variant="h6">Dont Have A Acooount?</Typography> */}
        </Box>
        <Box textAlign="center">
          <form>
            <Typography variant="h5" color="initial">
              Login
            </Typography>
            <Form />
          </form>
        </Box>
      </Stack>
    </Grid>
  );
}

export default Login;

function Form() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      paddingTop={2}
    >
      <TextField
        variant="outlined"
        label="username"
        fullWidth
        style={{ marginBlock: '1rem' }}
      />
      <TextField
        variant="outlined"
        label="Password"
        fullWidth
        type="password"
        style={{ marginBlock: '1rem' }}
      />
      <Button size="large" variant="contained" color="primary">
        Login
      </Button>
    </Grid>
  );
}
