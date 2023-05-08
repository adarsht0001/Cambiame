import {
  Typography, useTheme, Button, Grid, IconButton,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { followAccount, followingAccount } from '../api';
// import { getFollowers, getFollowings } from '../redux/followSlice';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BackgroundLetterAvatars from '../../Components/avatar/StringAvatar';
import axios from '../../Axios/axios';

export default function WhoToFollow({ user }) {
  const [follwing, setFollowing] = useState(user.isfollowing);
  const theme = useTheme();
  const handleFollow = () => {
    const follower = {
      id: user.id,
      name: user.name,
      email: user.email,
      profle: user.profile || null,
    };
    axios.put(`/follow/${user.username}`, follower).then((res) => {
      console.log(res);
      setFollowing(!follwing);
    }).catch(() => {
      setFollowing(false);
    });
  };
  return (
    <Box margin="1rem 0">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Grid container>
            <Link to={`/profile/${user.username}`}>
              <Grid item sx={{ paddingRight: '12px' }}>
                {/* <img src="/logo.png" width="50px" alt="logo" /> */}
                <BackgroundLetterAvatars width="50px" height="50px" user={user.username} />
              </Grid>
            </Link>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
                    {user.username}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography
                      sx={{ fontSize: '9px', mr: '3px', color: '#555' }}
                    >
                      {user.email}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {follwing && (
          <IconButton>
            <MailOutlineIcon />
          </IconButton>
          )}
          {follwing ? (
            <Button
              onClick={handleFollow}
              size="small"
              sx={{
                borderRadius: theme.shape.borderRadius,
                textTransform: 'capitalize',
                ml: '12px',
                background: 'black',
                '&:hover': {
                  background: '#333',
                },
              }}
              variant="contained"
            >
              UnFollow
            </Button>
          )
            : (
              <Button
                onClick={handleFollow}
                size="small"
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  textTransform: 'capitalize',
                  ml: '12px',
                  background: 'black',
                  '&:hover': {
                    background: '#333',
                  },
                }}
                variant="contained"
              >
                Follow
              </Button>
            )}

        </Grid>
      </Grid>
    </Box>
  );
}
