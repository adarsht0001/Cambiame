import { Grid } from '@mui/material';
import React from 'react';
import {
  AiOutlineHome, AiOutlineMessage, AiOutlineLogout, AiOutlineUser, AiOutlineSetting,
} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebarlink from './Sidebarlink';
import { Logout } from '../../../Redux';

function Mainside() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(Logout());
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    navigate('/login');
  };
  return (
    <Grid
      container
    //   flexDirection={{ md: 'column', sm: 'row' }}
      sx={{
        flexDirection: 'coloumn',
        // display: 'flex',
        // flexDirection: {
        //   xs: 'row',
        //   sm: 'coloum',
        //   md: 'column',
        // },
      }}
    >
      <Sidebarlink text="Home" Icon={AiOutlineHome} />
      <Sidebarlink text="Messges" Icon={AiOutlineMessage} />
      <Sidebarlink text="Profile" Icon={AiOutlineUser} />
      <Sidebarlink text="Settings" Icon={AiOutlineSetting} />
      <Sidebarlink text="LogOut" Icon={AiOutlineLogout} callback={handleLogout} />
    </Grid>
  );
}

export default Mainside;
