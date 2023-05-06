/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Link,
  Typography,
  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'; import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Link as RouteLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import format from 'date-fns/format';
import axios from '../../Axios/axios';
import Post from '../../Components/post/Post';
import BackgroundLetterAvatars from '../../Components/avatar/StringAvatar';

export default function Profile() {
  const theme = useTheme();
  const { username } = useParams();
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [following, setfollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setrefresh] = useState(false);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    axios.get(`/profile/${username}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.access_Token}`,
      },
    }).then((response) => {
      setProfile(response.data.user);
      setPosts(response.data.posts);
      setLoading(false);
      const isfollowing = response.data?.user.followers.some((obj) => obj.id === user.id);
      if (isfollowing) {
        setfollowing(true);
      } else {
        setfollowing(false);
      }
    });
  }, [refresh]);
  const handleFollow = () => {
    const follower = {
      id: user.id,
      name: user.name,
      email: user.email,
      profle: user.profile || null,
    };
    axios.put(`/follow/${profile.username}`, follower).then((res) => {
      console.log(res);
      setfollowing(true);
      setrefresh(!refresh);
    }).catch(() => {
      setfollowing(false);
    });
  };

  function isUser() {
    if (user.id === profile._id) {
      return true;
    }
    return false;
  }

  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container alignItems="center">
          <Grid item sx={{ mr: '10px' }}>
            <RouteLink to="/">
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
      <Box height="90vh" sx={{ overflowY: 'scroll' }}>
        <Box position="relative">
          <img
            width="100%"
            height="200px"
            src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
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
            <BackgroundLetterAvatars width="140px" height="140px" user={profile.username} />
          </Box>
        </Box>
        <Box textAlign="right" padding="10px 20px">

          {isUser() ? (
            <IconButton>
              <ManageAccountsIcon />
            </IconButton>
          ) : (
            <>
              {following && (
              <IconButton>
                <MailOutlineIcon />
              </IconButton>
              )}
              {following
                ? (
                  <Button
                    onClick={handleFollow}
                    size="small"
                    sx={{
                      borderRadius: theme.shape.borderRadius,
                      textTransform: 'capitalize',
                      padding: '6px 20px',
                      background: 'black',
                      '&:hover': {
                        background: '#333',
                      },
                    }}
                    variant="contained"
                  >
                    Unfollow
                  </Button>

                ) : (
                  <Button
                    onClick={handleFollow}
                    size="small"
                    sx={{
                      borderRadius: theme.shape.borderRadius,
                      textTransform: 'capitalize',
                      padding: '6px 20px',
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
            </>
          )}

        </Box>

        <Box padding="10px 20px">
          <Typography variant="h6" sx={{ fontWeight: '500' }}>
            {profile.username}
          </Typography>
          {/* <Typography fontSize="16px" color="#333" padding="10px 0">
            {profile.bio}
            test
          </Typography> */}
          <Box
            display="flex"
            alignItems="center"
            padding="6px 0"
            flexWrap="wrap"
          >
            <Box display="flex">
              <LocationOnIcon htmlColor="#555" />
              <Typography sx={{ ml: '6px', color: '#555' }}>
                {/* {profile.location} */}
                kochi
              </Typography>
            </Box>
            <Box display="flex" marginLeft="1rem">
              <InsertLinkIcon htmlColor="#555" />
              <Link
                sx={{ textDecoration: 'none', marginLeft: '6px' }}
                href={'www.google.com ' || 'https:/wasifbaliyan.com'}
              >
                {/* {profile.website ? profile.website : 'www'} */}
              </Link>
            </Box>
            <Box display="flex" marginLeft="1rem">
              <DateRangeIcon htmlColor="#555" />
              <Typography sx={{ ml: '6px', color: '#555' }}>
                {/* {profile.userId
                    && profile.userId
                    && profile.userId.createdAt
                    && format(new Date(profile.userId.createdAt), 'MMM dd yyyy')} */}
                2:30
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
