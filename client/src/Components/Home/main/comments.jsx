import { Box, Typography } from '@mui/material';
import React from 'react';
import BackgroundLetterAvatars from '../../avatar/StringAvatar';

function Comments({ comments }) {
  return (
    <Box
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
        <BackgroundLetterAvatars user={comments.name} />
        <Typography variant="body2" sx={{ marginLeft: '8px' }}>{comments.name}</Typography>
      </Box>
      <Box p={1}>
        <Typography variant="caption">{comments.comment}</Typography>
      </Box>
    </Box>
  );
}

export default Comments;
