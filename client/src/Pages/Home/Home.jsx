/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Stack } from '@mui/material';
import { Logout } from '../../Redux';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  return (
    <Grid
      direction={{ xs: 'column', md: 'row' }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        direction: 'column',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '10px' }}
        // justifyContent="center"
        // alignItems="center"
        spacing={2}
        p={5}
        className="centerDiv"
      >
        <div>Home</div>
        <div>{user.name}</div>
        <button
          type="button"
          onClick={() => {
            dispatch(Logout());
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            navigate('/login');
          }}
        >
          LogOut
        </button>
      </Stack>
    </Grid>
  );
}

export default Home;
