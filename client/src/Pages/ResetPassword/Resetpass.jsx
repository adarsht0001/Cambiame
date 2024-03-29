import {
  Box, Grid, Stack, Typography,
} from '@mui/material';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cambie from '../../Assets/svg/CAMBIAME.svg';
import Form from './Form';

function Resetpass() {
  const navigate = useNavigate();
  const { id, token } = useParams();
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
        <Box onClick={() => navigate('/')}>
          <img src={cambie} alt="" />
          <Box
            component="span"
            p={2}
            sx={{ alignItems: 'center', textAlign: 'center' }}
          >
            <Typography variant="body1" p={3}>
              Reset Password
            </Typography>
          </Box>
        </Box>
        <Box textAlign="center">
          <Form id={id} token={token} />
        </Box>
      </Stack>
    </Grid>
  );
}

export default Resetpass;
