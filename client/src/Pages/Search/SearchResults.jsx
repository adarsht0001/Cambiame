import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import BackgroundLetterAvatars from '../../Components/avatar/StringAvatar';
import Buttons from '../../Components/button/Button';
import axios from '../../Axios/axios';

function SearchResults({ userData }) {
  const user = useSelector((state) => state.user);
  const [followed, setFollowed] = useState(false);
  useEffect(() => {
    if (userData.isfollowing) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, []);

  const follow = (name) => {
    const follower = {
      id: user.id,
      name: user.name,
      email: user.email,
      profle: user.profile || null,
    };
    axios.put(`/follow/${name}`, follower).then((res) => {
      console.log(res);
      setFollowed(true);
    }).catch(() => {
      setFollowed(false);
    });
  };
  return (
    <Box
      width="60%"
      key={userData.username}
      m={2}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      p={4}
      sx={{
        marginX: 'auto',
        backgroundColor: '#f0f0f0',
        borderRadius: 6,
        boxShadow: '2px 2px 8px #c7c7c7, -2px -2px 8px #ffffff',
      }}
    >
      <Box display="flex" flexDirection="row" alignItems="center">
        <BackgroundLetterAvatars user={userData.username || 'user'} />
        <Box marginLeft={4}>
          <Typography variant="h6">{userData.username}</Typography>
          <Typography variant="caption">
            {userData.email}
          </Typography>
        </Box>
      </Box>
      <Box>
        {
        followed
          ? <Buttons size="medium" variant="contained" color="primary" Text="UnFollow" callback={() => follow(userData.username)} />
          : <Buttons size="medium" variant="contained" color="secondar.main" Text="Follow" callback={() => follow(userData.username)} />
      }
      </Box>
    </Box>
  );
}

export default SearchResults;
