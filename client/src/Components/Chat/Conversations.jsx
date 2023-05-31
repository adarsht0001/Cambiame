/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import { Grid, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TimeAgo from 'react-timeago';
import BackgroundLetterAvatars from '../avatar/StringAvatar';
import axios from '../../Axios/axios';
import { CHAT } from '../../Redux';
import PictureAvatar from '../avatar/PictureAvatar';

function Conversations({ conversation, userId }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState('');
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== userId);
    axios.get(`/user/${friendId}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${data.access_Token}`,
      },
    }).then((res) => {
      setUser(res.data);
      console.log(loading);
      setLoading(false);
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
          { loading ? (<Skeleton animation="wave" variant="circular" width={40} height={40} />)
            : (user.profile
              ? <PictureAvatar name={user?.name || ''} image={user.profile} />
              : <BackgroundLetterAvatars user={user.username || ''} />)}
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
                  {
                    loading ? (
                      <Skeleton animation="wave" height={10} width="40%" />
                    )
                      : (
                        <Typography
                          sx={{ fontSize: '16px', fontWeight: 500, mr: '6px' }}
                        >
                          {user.username}
                        </Typography>
                      )
                  }
                </Box>
                <Box>
                  {
                    loading ? (
                      <Skeleton animation="wave" height={10} width="60%" />
                    )
                      : (
                        <Typography sx={{ fontSize: '15px', color: '#555' }}>
                          {conversation?.message?.text ? conversation.message.text : 'start a coversation'}
                        </Typography>
                      )
                  }
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Typography
          sx={{
            fontSize: '15px', ml: 'auto', color: '#555',
          }}
        >
          <TimeAgo date={conversation?.message?.text
            ? conversation.message.createdAt : conversation.createdAt}
          />
        </Typography>
      </Grid>
    </Box>
  );
}

export default Conversations;
