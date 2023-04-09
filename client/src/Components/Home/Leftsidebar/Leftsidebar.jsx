import React from 'react';
import { Stack, Box } from '@mui/material';
import {
  AiOutlineHome,
  AiOutlineMessage, AiOutlineLogout, AiOutlineUser, AiOutlineSetting, AiOutlineSearch,
} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cambie from '../../../Assets/svg/CAMBIAME.svg';
import './leftsidebar.css';
import Sidebarlink from './Sidebarlink';
import { Logout } from '../../../Redux';

function Leftsidebar() {
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
    <Stack
      position="fixed"
      justifyContent="space-between"
      alignItems="stretch"
      // spacing={2}
    >
      <Box sx={{
        display: {
          xs: 'none',
          sm: 'none',
          md: 'block',
        },
      }}
      >
        <img src={cambie} alt="Logo" />
      </Box>
      <Box
        marginTop={10}
        textAlign="center"
        letterSpacing={2}
        width="250px"
        minWidth="250px"
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'row',
            sm: 'row',
            md: 'column',
          },
        }}
      >
        <Sidebarlink text="Home" Icon={AiOutlineHome} callback={() => redirect('/')} />
        <Sidebarlink text="Messges" Icon={AiOutlineMessage} />
        <Sidebarlink text="Search" Icon={AiOutlineSearch} />
        <Sidebarlink text="Profile" Icon={AiOutlineUser} callback={() => redirect('/test')} />
        <Sidebarlink text="Settings" Icon={AiOutlineSetting} />
        <Sidebarlink text="LogOut" Icon={AiOutlineLogout} callback={handleLogout} />
      </Box>
    </Stack>
  );
  // return (
  //   <div className="sidebar">
  //     {/* <Sidebarlink text="Messages" Icon={MailOutlineIcon} />
  //     <Sidebarlink text="Bookmarks" Icon={BookmarkBorderIcon} />
  //     <Sidebarlink text="Lists" Icon={ListAltIcon} />
  //     <Sidebarlink text="Profile" Icon={PermIdentityIcon} />
  //     <Sidebarlink text="More" Icon={MoreHorizIcon} /> */}
  //   </div>
  // );
}

export default Leftsidebar;
