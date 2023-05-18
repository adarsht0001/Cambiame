/* eslint-disable no-underscore-dangle */
import {
  Grid, IconButton, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import AssistantIcon from '@mui/icons-material/Assistant';
import io from 'socket.io-client';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import AddPost from '../../Components/post/AddPost';
import Post from '../../Components/post/Post';
import axios from '../../Axios/axios';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    axios.get('/post').then((response) => {
      setPosts(response.data);
    });
  }, [refresh]);
  const socket = useRef();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    socket.current = io('http://localhost:5000');
    socket.current?.emit('adduser', user.id);

    socket.current.on('sentNotification', (data) => {
      toast(
        `${data.text} from ${data.user}`,
        {
          icon: '📩',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        },
      );
    });
  }, []);
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
