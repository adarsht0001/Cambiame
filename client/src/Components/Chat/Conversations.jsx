/* eslint-disable no-underscore-dangle */
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import BackgroundLetterAvatars from '../avatar/StringAvatar';
import axios from '../../Axios/axios';
import { CHAT } from '../../Redux';

function Conversations({ conversation, userId }) {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== userId);
    axios.get(`/user/${friendId}`).then((res) => {
      setUser(res.data);
    });
  }, []);

  const handleNavigate = () => {
    dispatch(CHAT(user));
    navigate(`/chat/${conversation._id}`);
  };
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
      <Grid container flexWrap="nowrap" onClick={handleNavigate}>
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

export default Conversations;
