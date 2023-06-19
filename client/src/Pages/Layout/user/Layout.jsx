import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { Grid, Hidden, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { Outlet } from 'react-router-dom';
import { io } from 'socket.io-client';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import LeftSidebar from '../../../Components/Layout/LeftSideBar';
import RightSidebar from '../../../Components/Layout/RightSideBar';
import Blocked from './Modal';

export default function Layout() {
  const theme = useTheme();
  const socket = useRef();
  const user = useSelector((state) => state.user);
  const [openModal, setOpenModal] = React.useState(false);

  useEffect(() => {
    socket.current = io('https://cambiame.site', { path: '/api/socket.io/' });
    // socket.current = io('http://localhost:5000', { path: '/api/socket.io/' });
    socket.current?.emit('adduser', user.id);

    socket.current?.on('sentNotification', (data) => {
      toast(`${data.text} from ${data.user}`, {
        icon: '📩',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    });
    socket.current?.on('blocked', () => {
      setOpenModal(true);
    });
  }, []);
  return (
    <>
      <Box
        sx={{
          maxWidth: theme.breakpoints.values.lg,
          margin: '0 auto',
        }}
      >
        <Grid container>
          <Grid item xs={1} lg={2} maxHeight="80vh">
            <LeftSidebar />
          </Grid>
          <Grid item xs={11} lg={10}>
            <Grid container>
              <Grid item xs={12} lg={8}>
                <Box
                  sx={{
                    height: '100vh',
                    margin: '0 1rem',
                    borderLeft: '1px solid #ccc',
                    borderRight: '1px solid #ccc',
                  }}
                >
                  <Outlet context={socket} />
                </Box>
              </Grid>
              <Hidden lgDown>
                <Grid item lg={4} sx={{ height: '100vh' }} maxHeight="80vh">
                  <RightSidebar />
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {openModal && (
        <Blocked open={openModal}>
          <Box>
            <Grid container alignItems="center">
              <Grid width="100%" py={4} textAlign="center">
                <Typography>Your Account Has been Blocked</Typography>
              </Grid>
            </Grid>
          </Box>
        </Blocked>
      )}
    </>
  );
}
