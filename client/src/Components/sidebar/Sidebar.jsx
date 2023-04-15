import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import {
  AiOutlineHome, AiOutlineMessage, AiOutlineLogout,
  AiOutlineUser, AiOutlineSetting, AiOutlineSearch,
} from 'react-icons/ai';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cambie from '../../Assets/svg/CAMBIAME.svg';
import SidebarLinks from './SidebarLinks';
import { Logout } from '../../Redux';

function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(Logout());
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    navigate('/login');
  };
  const redirect = (route) => {
    navigate(route);
  };
  return (
    <Paper
      sx={{
        height: {
          md: '100vh',
          xs: '10vh',
        },
        width: {
          md: '17%',
          xs: '80%',
        },
        zIndex: 3,
        position: 'fixed',
        [theme.breakpoints.down('md')]: {
          bottom: '0',
          marginBottom: '15px',
          alignSelf: 'center',
          borderRadius: '25px',
        },
      }}
      elevation={20}
    >

      <Grid
        container
        item
        xs={12}
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'row',
            sm: 'row',
            md: 'column',
          },
          justifyContent: 'center',
          alignSelf: 'center',
          [theme.breakpoints.up('sm')]: {
            margin: '30px',
          },
          [theme.breakpoints.down('md')]: {
            paddingTop: '20px',
            margin: 'auto',
          },
        }}
      >
        <Box sx={{
          display: {
            xs: 'none',
            sm: 'none',
            md: 'block',
          },
          paddingTop: '60px',
          paddingBottom: '50px',
        }}
        >
          <img src={cambie} alt="Logo" />
        </Box>
        <SidebarLinks text="Home" Icon={AiOutlineHome} callback={() => redirect('/')} />
        <SidebarLinks text="Messges" Icon={AiOutlineMessage} />
        <SidebarLinks text="Search" Icon={AiOutlineSearch} callback={() => redirect('/search')} />
        <SidebarLinks text="Profile" Icon={AiOutlineUser} callback={() => redirect('/profile')} />
        <SidebarLinks text="Settings" Icon={AiOutlineSetting} />
        <SidebarLinks text="Logout" Icon={AiOutlineLogout} callback={handleLogout} />
      </Grid>

    </Paper>
  );
}

export default Sidebar;
