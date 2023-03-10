import {
  Box, Grid, Stack,
} from '@mui/material';
import React from 'react';
import cambie from '../../Assets/svg/CAMBIAME.svg';
import imgs from '../../Assets/Images/and-machines-8gqqtZstztc-unsplash.jpg';
import './Signup.css';
import Form from './Form';

function Signup() {
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
        sx={{ backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '10px' }}
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
          <Form />
        </Box>
      </Stack>
    </Grid>
  );
}

export default Signup;
