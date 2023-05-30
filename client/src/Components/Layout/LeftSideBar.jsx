import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import {
  AiOutlineHome, AiOutlineLogout, AiOutlineMessage, AiOutlineUser,
} from 'react-icons/ai';
import {
  // Button
  // Grid,
  Hidden,
  //  IconButton
  // Input,
} from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cambie from '../../Assets/svg/CAMBIAME.svg';
import SidebarLinks from './SidebarLinks';
import { Logout } from '../../Redux';

export default function LeftSidebar() {
  const user = useSelector((state) => state.user);
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
    <Box sx={{ maxWidth: '100%' }}>
      <Hidden lgDown>
        <Box
          textAlign="center"
          marginY={7}
        >
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              backgroundColor: 'inherit',
            }}
          >
            <img src={cambie} alt="logo" />
          </Link>
        </Box>
      </Hidden>
      <List>
        <NavLink
          to="/"
          style={{
            textDecoration: 'none',
            color: 'inherit',
            backgroundColor: 'inherit',
          }}
        >
          <SidebarLinks text="Home" Icon={AiOutlineHome} callback={() => redirect('/')} />
        </NavLink>
        <SidebarLinks text="Messges" Icon={AiOutlineMessage} callback={() => redirect('/chat')} />
        <SidebarLinks text="Profile" Icon={AiOutlineUser} callback={() => redirect(`/profile/${user.name}`)} />
        <SidebarLinks text="Logout" Icon={AiOutlineLogout} callback={handleLogout} />
      </List>
    </Box>
  );
}
