import {
  Box, Grid, Stack, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import cambie from '../../Assets/svg/CAMBIAME.svg';
// import imgs from '../../Assets/Images/and-machines-8gqqtZstztc-unsplash.jpg';
import './Signup.css';
import Form from './Form';

function Signup() {
  const navigate = useNavigate();
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
        backgroundImage: 'linear-gradient(to right, #f57c00 0%,#ace0f9 100%)',
        // backgroundImage: `url(${imgs})`,
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
          <Box component="span" sx={{ alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="subtitle1" onClick={() => navigate('/login')}>Already have Account?</Typography>
            <Typography variant="subtitle1" onClick={() => navigate('/login')}>Login here</Typography>
          </Box>
        </Box>
        <Box textAlign="center">
          <Form />
        </Box>
      </Stack>
    </Grid>
  );
}

export default Signup;
