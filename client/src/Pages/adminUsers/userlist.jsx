/* eslint-disable no-underscore-dangle */
import {
  CircularProgress, Grid, IconButton, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { Link as RouteLink, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TimeAgo from 'react-timeago';
import DateRangeIcon from '@mui/icons-material/DateRange';
import axios from '../../Axios/axios';
import PictureAvatar from '../../Components/avatar/PictureAvatar';
import BackgroundLetterAvatars from '../../Components/avatar/StringAvatar';
import Post from '../../Components/post/Post';

function UserView() {
  const theme = useTheme();
  const { username } = useParams();
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setrefresh] = useState(false);
  const admin = useSelector((state) => state.admin);
  useEffect(() => {
    axios.get(`/profile/${username}`, {
      headers: {
        Authorization: `Bearer ${admin.access_Token}`,
      },
    }).then((response) => {
      setProfile(response.data.user);
      setPosts(response.data.posts);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }, [refresh, username]);
  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container alignItems="center">
          <Grid item sx={{ mr: '10px' }}>
            <RouteLink to="/admin/user">
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </RouteLink>
          </Grid>

          {!loading && (
            <Grid item>
              <Typography variant="h6">
                {profile.username}
              </Typography>
              <Typography sx={{ fontSize: '12px', color: '#555' }}>
                {posts && posts.length}
                {' '}
                posts
              </Typography>
              {' '}
            </Grid>
          )}
        </Grid>
      </Box>
      <Box textAlign="center">
        {loading && (
          <Box marginTop="1rem">
            <CircularProgress size={20} color="primary" />
          </Box>
        )}
      </Box>
      {!loading && (
        <Box
          height="90vh"
          sx={{
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Box position="relative">
            <img
              width="100%"
              height="200px"
              src={profile.cover ? profile.cover : 'https://images.pexels.com/photos/129539/pexels-photo-129539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
              alt="background"
            />
            <Box
              sx={{
                position: 'absolute',
                top: 120,
                left: 15,
                background: '#eee',
                borderRadius: '50%',
              }}
            >
              {
              profile.profile
                ? <PictureAvatar name={profile.username || ''} image={profile.profile} width="140px" height="140px" />
                : <BackgroundLetterAvatars width="140px" height="140px" user={profile.username} />
            }
            </Box>
          </Box>

          <Box padding="10px 20px" mt={7}>
            <Typography variant="h6" sx={{ fontWeight: '500' }}>
              {profile.username}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              padding="6px 0"
              flexWrap="wrap"
            >
              <Box display="flex" marginLeft="1rem">
                <DateRangeIcon htmlColor="#555" />
                <Typography sx={{ ml: '6px', color: '#555' }}>
                  <TimeAgo date={profile?.date} />
                </Typography>
              </Box>
            </Box>
            <Box display="flex">
              <Typography color="#555" marginRight="1rem">
                <strong style={{ color: 'black' }}>
                  {profile.following?.length}
                </strong>
                Following
              </Typography>
              <Typography color="#555" marginRight="1rem">
                <strong style={{ color: 'black' }} />
                {profile.followers?.length}
                Followers
              </Typography>
            </Box>
          </Box>
          <Box borderBottom="1px solid #ccc">
            <Typography
              display="inline-block"
              variant="caption"
              fontSize="16px"
              marginX="1rem"
              padding="6px 0"
              fontWeight="500"
              borderBottom={`4px solid ${theme.palette.primary.main}`}
            >
              Posts
            </Typography>
          </Box>
          {posts.map((post) => (
            <Post data={post} key={post._id} callback={() => setrefresh(!refresh)} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default UserView;
