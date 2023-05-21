import React from 'react';
import {
  Box, Typography, Stack,
} from '@mui/material';
// import { makeStyles } from '@mui/styles';
import { format } from 'timeago.js';
import './Styles.css';

function Message({ message, own }) {
  return (
    <Stack
      direction={own ? 'row' : 'row-reverse'}
      component="div"
      spacing={1}
      className={own ? 'chatroot1' : 'chatroot2'}
    >
      <Box>
        <Typography
          className={own ? 'chat1' : 'chat2'}
          p={1}
          borderRadius={2}
          variant="body2"
        >
          {message?.text}
        </Typography>
        <Typography
          sx={{ float: own ? 'right' : 'left' }}
          variant="caption"
        >
          {format(message?.createdAt)}
        </Typography>
      </Box>
    </Stack>
  );
}

export default Message;
