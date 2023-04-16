import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box, Grid, Paper, Typography,
} from '@mui/material';
import axios from '../../Axios/axios';
import BackgroundLetterAvatars from '../../Components/avatar/StringAvatar';
import Buttons from '../../Components/button/Button';

function Viewprofile() {
  const { username } = useParams();
  const [profile, setProfile] = useState({});
  //   const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    axios.get(`/profile/${username}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.access_Token}`,
      },
    }).then((response) => {
      setProfile(response.data.user);
    //   setPosts(response.data.posts);
    });
  });
  return (
    <Grid container alignItems="center" direction="column">
      <Paper
        sx={{
          width: '60%',
          padding: '30px',
          marginX: 'auto',
          marginTop: '4%',
          backgroundColor: '#f0f0f0',
          borderRadius: 6,
          boxShadow: '2px 2px 8px #c7c7c7, -2px -2px 8px #ffffff',
        }}
        elevation={20}
      >
        <Box display="flex" justifyContent="space-between" p={5}>
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" paddingX={5} textAlign="center">
            <BackgroundLetterAvatars user={profile.username || 'user'} width="150px" height="150px" />
            <Box marginLeft={2}>
              <Typography variant="h6">{profile.username}</Typography>
              <Paper
                sx={{
                  display: 'flex',
                  margin: 'auto',
                  padding: '1rem',
                  backgroundColor: '#f0f0f0',
                  borderRadius: 6,
                  boxShadow: '2px 2px 8px #c7c7c7, -2px -2px 8px #ffffff',
                }}
                elevation={15}
              >
                <Box textAlign="center" m={2}>
                  {profile.followers?.length}
                  {' '}
                  Followers
                </Box>
                <Box textAlign="center" m={2}>
                  {profile.following?.length}
                  {' '}
                  Following
                </Box>
              </Paper>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column">
            <Buttons variant="contained" Text="Message" />
            <Buttons variant="outlined" Text="Follow" color="secondary.main" />
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Viewprofile;
