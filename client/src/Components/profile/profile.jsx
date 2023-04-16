/* eslint-disable no-underscore-dangle */
import {
  Grid, Paper, Box, IconButton, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { AiTwotoneEdit, AiTwotoneSave } from 'react-icons/ai';
import BackgroundLetterAvatars from '../avatar/StringAvatar';
// import PictureAvatar from '../avatar/PictureAvatar';
import axios from '../../Axios/axios';
import Inputfield from '../input/Inputfield';
import Posts from '../Home/main/Posts';
// import BackgroundLetterAvatars from '../avatar/StringAvatar';
// import Posts from '../Home/main/Posts';

function UserProfile() {
  const user = useSelector((state) => state.user);
  const [profile, setProfile] = useState({});
  const [edited, setedited] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`/profile/${user.name}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.access_Token}`,
      },
    }).then((response) => {
      console.log(response.data);
      setProfile(response.data.user);
      setPosts(response.data.posts);
    }).catch((err) => {
      alert(err.response.data.msg);
    });
  }, []);
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
          <Box display="flex" flexDirection="column" alignItems="flex-start" paddingX={5}>
            <Box position="relative">
              <BackgroundLetterAvatars
                user={profile.username || 'user'}
                width="150px"
                height="150px"
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                style={{
                  position: 'absolute',
                  bottom: '25px',
                  right: '50%',
                  transform: 'translate(50%, 50%)',
                  zIndex: '1',
                }}
              >
                <input
                  required
                  hidden
                  accept="image/*"
                  type="file"
                  name="img"
                  onChange={(e) => {
                    alert(e, 'hadsjk');
                    setedited(true);
                  // setImg(e.target.files[0]);
                  }}
                />
                <PhotoCamera />
              </IconButton>
            </Box>
            <Typography variant="h5" p={4}>{profile.username || 'user'}</Typography>
          </Box>
          <Box alignItems="center" paddingRight={10}>
            <Grid p={3} onClick={() => setedited(!edited)}>
              <AiTwotoneEdit size={30} />
              <Typography variant="h5">Edit</Typography>
            </Grid>
            {
              edited
              && (
              <Grid p={3}>
                <AiTwotoneSave size={30} />
                <Typography variant="h5">Save</Typography>
              </Grid>
              )
            }
          </Box>
        </Box>
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
          <Box sx={{ width: '50%' }} textAlign="center">
            {profile.followers?.length}
            {' '}
            Followers
          </Box>
          <Box sx={{ width: '50%' }} textAlign="center">
            {profile.following?.length}
            {' '}
            Following
          </Box>
        </Paper>
        <Box display="flex">
          <Grid width="50%" p={5}>
            <Inputfield
              disabled={!edited}
              focused={!edited}
              defaultValue={profile.username || user.name}
              label="User Name"
              fullWidth
            />
          </Grid>
          <Grid width="50%" p={5}>
            <Inputfield disabled={!edited} label="Email" size="md" focused={!edited} defaultValue={profile.email || user.email} fullWidth />
          </Grid>
        </Box>
      </Paper>
      {
        posts.length > 0
          ? (
            <>
              <Box m={5}>
                <Box>
                  <Typography variant="h5">  My Posts</Typography>
                </Box>
              </Box>
              {posts.map((post) => (
                <Posts data={post} key={post._id} />
              ))}
            </>
          )
          : <Typography variant="h5"> No Posts</Typography>

      }
    </Grid>
  );
}

export default UserProfile;

// <Grid container alignItems="center" direction="column">
//   <Grid sx={{ width: '60%', padding: '30px' }}>
//     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//         {/* <PictureAvatar image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT50hnwfx3suGC7Nhg1mTRdd1iPkFXI4eJBN8IrkAtu-w&s" width="150px" height="150px" /> */}
//       </Box>
//       <Box>
//         <Typography variant="subtitle1">Hello,</Typography>
//         <Typography variant="h3">{profile.username}</Typography>
//       </Box>
//     </Box>

//   </Grid>
// </Grid>
