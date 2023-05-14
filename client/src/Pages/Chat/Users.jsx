/* eslint-disable no-underscore-dangle */
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundLetterAvatars from '../../Components/avatar/StringAvatar';
import axios from '../../Axios/axios';

function Users({ conversation, userId }) {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== userId);
    axios.get(`/user/${friendId}`).then((res) => {
      setUser(res.data);
    });
  }, []);
  return (
    <Box
      padding="1rem"
      marginY={2}
      sx={{
        '&:hover': {
          backgroundColor: '#eee',
        },
      }}
    >
      <Grid container flexWrap="nowrap" onClick={() => navigate(`/chat/${conversation._id}`)}>
        <Grid item sx={{ paddingRight: '1rem' }}>
          <BackgroundLetterAvatars user={user?.username || ''} />
        </Grid>
        <Grid item flexGrow="1">
          <Box>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              flexWrap="nowrap"
            >
              <Grid item>
                <Box display="flex">
                  <Typography
                    sx={{ fontSize: '16px', fontWeight: 500, mr: '6px' }}
                  >
                    {user.username}
                  </Typography>
                </Box>
                <Box>
                  {/* <Typography sx={{ fontSize: '15px', color: '#555' }}>
                    dhsajs
                    {' '}

                  </Typography> */}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {/* <Typography
          sx={{
            fontSize: '15px', ml: 'auto', color: '#555',
          }}
        >
          2:34
        </Typography> */}
      </Grid>
    </Box>
  );
}

export default Users;
