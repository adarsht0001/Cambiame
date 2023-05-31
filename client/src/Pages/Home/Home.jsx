/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import {
  Grid, IconButton, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useRef, useState } from 'react';
import AssistantIcon from '@mui/icons-material/Assistant';
import clsx from 'clsx';
import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';
import { useSelector } from 'react-redux';
import AddPost from '../../Components/post/AddPost';
import Post from '../../Components/post/Post';
import axios from '../../Axios/axios';
import useLazyLoad from '../../hooks/useLazyload';
import LoadingPost from '../../Components/post/Skeleton';

export default function Home() {
  const triggerRef = useRef(null);
  const [limit, setLimit] = useState();
  const [end, setEnded] = useState(false);
  const scrollRef = useRef();
  const user = useSelector((state) => state.user);

  // eslint-disable-next-line no-unused-vars
  const onGrabData = (currentPage) => new Promise((resolve, reject) => {
    if (limit >= currentPage) {
      setEnded(true);
    }
    axios.get(`/post?page=${currentPage}`, {
      headers: {
        Authorization: `Bearer ${user.access_Token}`,
      },
    }).then((response) => {
      setLimit(response.data.totalPages);
      resolve(response.data.results);
    });
  });
  const { data, loading, refetch } = useLazyLoad({ triggerRef, onGrabData });

  return (
    <Box>
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
      <Box
        height="92vh"
        sx={{
          overflowY: 'scroll',
          px: 4,
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <div
          ref={scrollRef}
        >
          <AddPost
            callback={() => {
              refetch();
              setEnded(false);
            }}
          />
        </div>
        {data?.map((post) => (
          <Post
            key={post._id}
            data={post}
            callback={() => {
              refetch();
              setEnded(false);
            }}
          />
        ))}
        {end ? (
          // eslint-disable-next-line max-len
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
            onClick={() => {
              scrollRef.current.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Fab
              variant="extended"
            >
              <NavigationIcon style={{ marginRight: '8px' }} />
              Navigate to Top
            </Fab>
          </div>

        ) : (
          <div ref={triggerRef} className={clsx('trigger', { visible: loading })}>
            <LoadingPost />
          </div>
        )}
      </Box>
    </Box>
  );
}
