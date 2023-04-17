/* eslint-disable react/no-array-index-key */
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BackgroundLetterAvatars from '../../avatar/StringAvatar';
import axios from '../../../Axios/axios';

function Comments({ postid, refresh }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios.get(`/get-comments/${postid}`).then((response) => {
      setComments(response.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [refresh]);
  return (

    comments.map((data, i) => (

      <Box
        key={data.name + i}
        sx={{
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
          borderRadius: 6,
          boxShadow: '2px 2px 8px #c7c7c7, -2px -2px 8px #ffffff',
        }}
        marginY={2}
        p={1}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BackgroundLetterAvatars user={data.name} />
          <Typography variant="body2" sx={{ marginLeft: '8px' }}>{data.name}</Typography>
        </Box>
        <Box p={1}>
          <Typography variant="caption">{data.comment}</Typography>
        </Box>
      </Box>
    ))
  );
}

export default Comments;
