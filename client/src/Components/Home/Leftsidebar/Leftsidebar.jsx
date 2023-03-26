import React from 'react';
import { Stack, Box } from '@mui/material';
import {
  AiOutlineHome, AiOutlineMessage, AiOutlineLogout, AiOutlineUser, AiOutlineSetting,
} from 'react-icons/ai';
import cambie from '../../../Assets/svg/CAMBIAME.svg';
import './leftsidebar.css';
import Sidebarlink from './Sidebarlink';

function Leftsidebar() {
  return (
    <Stack
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
        <Sidebarlink text="Home" Icon={AiOutlineHome} />
        <Sidebarlink text="Messges" Icon={AiOutlineMessage} />
        <Sidebarlink text="Profile" Icon={AiOutlineUser} />
        <Sidebarlink text="Settings" Icon={AiOutlineSetting} />
        <Sidebarlink text="LogOut" Icon={AiOutlineLogout} />
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
