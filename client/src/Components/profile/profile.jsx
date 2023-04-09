import {
  Grid, Box, Typography, Paper,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import PictureAvatar from '../avatar/PictureAvatar';
import axios from '../../Axios/axios';
import BackgroundLetterAvatars from '../avatar/StringAvatar';
import Posts from '../Home/main/Posts';

function UserProfile() {
  const user = useSelector((state) => state.user);
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`/profile/${user.name}`).then((response) => {
      console.log(response.data);
      setProfile(response.data.user);
      setPosts(response.data.posts);
    }).catch((err) => {
      alert(err.response.data.msg);
    });
  }, []);
  return (
    <Grid container alignItems="center" direction="column">
      <Grid sx={{ width: '60%', backgroundColor: 'red', padding: '30px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <PictureAvatar image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT50hnwfx3suGC7Nhg1mTRdd1iPkFXI4eJBN8IrkAtu-w&s" width="150px" height="150px" /> */}
            <BackgroundLetterAvatars user={profile.username || 'user'} width="100px" height="100px" />
          </Box>
          <Box>
            <Typography variant="subtitle1">Hello,</Typography>
            <Typography variant="h3">{profile.username}</Typography>
          </Box>
        </Box>
        <Paper sx={{ display: 'flex', padding: '2rem', marginTop: '2rem' }}>
          <Box sx={{ width: '50%' }}>
            followers
          </Box>
          <Box sx={{ width: '50%' }}>
            Following
          </Box>
        </Paper>
      </Grid>
      <Box>
        <Box>
          <Typography variant="h5">  My Posts</Typography>
        </Box>
      </Box>
      {posts.map((post) => (
        <Posts data={post} />
      ))}
    </Grid>
  );
}

export default UserProfile;
