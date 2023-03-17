/* eslint-disable import/no-named-as-default-member */
import {
  Box, Grid, Stack, Typography,
} from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import cambie from '../../Assets/svg/CAMBIAME.svg';
// import imgs from '../../Assets/Images/shubham-dhage-4MDR5izP5sY-unsplash.jpg';
import './Login.css';
import Form from './Form';
import Buttons from '../../Components/button/Button';
import { auth, provider } from '../../firebase/config';
import axios from '../../Axios/axios';
import Modals from '../../Components/Modal/Modal';

function Login() {
  const navigate = useNavigate();
  const googleSignIn = () => {
    signInWithPopup(auth, provider).then((data) => {
      const value = {
        usernam: data.user.displayName,
        email: data.user.email,
      };
      localStorage.setItem('user', data.user.email);
      navigate('/');
      axios.post('/test', value).then(() => console.log());
    });
  };

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
          <Box
            component="span"
            p={2}
            sx={{ alignItems: 'center', textAlign: 'center' }}
          >
            <Typography
              variant="body1"
              p={3}
              onClick={() => navigate('/signup')}
            >
              Create an account here
            </Typography>
            <Box onClick={googleSignIn}>
              <Buttons
                size="sm"
                variant="contained"
                color="secondary"
                Text={(
                  <>
                    <FcGoogle style={{ padding: '5px' }} />
                    Continue With Google
                  </>
                )}
              />
            </Box>
            <Box pt={3}>
              <Modals />
            </Box>
          </Box>
        </Box>
        <Box textAlign="center">
          <Form />
        </Box>
      </Stack>
    </Grid>
  );
}

export default Login;
