/* eslint-disable no-underscore-dangle */
import {
  Grid, IconButton, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import AssistantIcon from '@mui/icons-material/Assistant';
import AddPost from './post/AddPost';
import Post from './post/Post';
import axios from '../Axios/axios';

export default function Test() {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    axios.get('/post').then((response) => {
      setPosts(response.data);
    });
  }, [refresh]);
  return (
    <Box m={2}>
      <Box borderBottom="1px solid #ccc" padding="8px 18px">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">Home</Typography>
          </Grid>
          <Grid item>
            <IconButton>
              <AssistantIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box height="92vh" sx={{ overflowY: 'scroll', px: 4, overflowX: 'hidden' }}>
        <AddPost callback={() => {
          setRefresh(!refresh);
        }}
        />
        {posts?.map((post) => (
          <Post
            key={post._id}
            data={post}
            callback={() => {
              setRefresh(!refresh);
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
