import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import {
  AiOutlineHome, AiOutlineLogout, AiOutlineMessage, AiOutlineSearch, AiOutlineUser,
} from 'react-icons/ai';
import {
  Button, Grid, Hidden, IconButton, Input,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cambie from '../../Assets/svg/CAMBIAME.svg';
import SidebarLinks from './SidebarLinks';
import { Logout } from '../../Redux';

export default function LeftSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(Logout());
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    navigate('/login');
  };
  const [openModal, setOpenModal] = React.useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const [postText, setPostText] = React.useState('');
  const redirect = (route) => {
    navigate(route);
  };

  return (
    <>
      <Box sx={{ height: '100vh', maxWidth: '100%' }}>
        <Hidden mdDown>
          <Box textAlign="center" marginY={7}>
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
          <SidebarLinks text="Messges" Icon={AiOutlineMessage} />
          <SidebarLinks text="Search" Icon={AiOutlineSearch} callback={() => redirect('/search')} />
          <SidebarLinks text="Profile" Icon={AiOutlineUser} callback={() => redirect('/profile')} />
          <SidebarLinks text="Logout" Icon={AiOutlineLogout} callback={handleLogout} />

        </List>
        <Hidden lgDown>
          <Button
            onClick={handleModalOpen}
            variant="contained"
            color="primary"
            fullWidth
            style={{
              borderRadius: '28px',
              padding: '10px',
              textTransform: 'capitalize',
            }}
          >
            Post
          </Button>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            onClick={handleModalOpen}
            variant="contained"
            color="primary"
            style={{
              borderRadius: '28px',
              padding: '0 15px',
              textTransform: 'capitalize',
              textAlign: 'center',
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Hidden>
      </Box>
      {openModal && (
      // <Modal
      //   open={openModal}
      //   handleClose={handleModalClose}
      //   saveText="Post"
      //   len={postText.trimStart().length}
      // >
      <Box>
        <Grid container>
          <Grid item>
            <img src="/logo.png" alt="logo" width="60px" />
          </Grid>
          <Grid item flexGrow="1">
            <Box padding=".5rem 0">
              <Input
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                multiline
                rows="2"
                disableUnderline
                type="text"
                placeholder="What's happening?"
                sx={{ width: '100%' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      // </Modal>
      )}
    </>
  );
}
