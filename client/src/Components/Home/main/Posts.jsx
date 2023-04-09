/* eslint-disable no-underscore-dangle */
import React from 'react';
import './main.css';
import {
  Grid, Box, Typography, Stack,
} from '@mui/material';
import { CiMenuKebab } from 'react-icons/ci';
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import BackgroundLetterAvatars from '../../avatar/StringAvatar';

function Posts({ posts }) {
  return (
    posts.map((post) => (
      <Grid
        key={post._id}
        sx={{
          width: '30%', backgroundColor: 'red', padding: '20px', marginTop: '20px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <BackgroundLetterAvatars user={post.user} />
            <Typography variant="body2" sx={{ marginLeft: '8px' }}>{post.user}</Typography>
          </Box>
          <Box>
            <CiMenuKebab />
          </Box>
        </Box>
        <Box sx={{
          display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '10px',
        }}
        >
          <Box>
            <Typography variant="subtitle2">{post.caption}</Typography>
          </Box>
          {
              post.link
              && (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              >
                <img src={post.link} width="100%" height="60%" alt="" srcSet="" />
              </Box>
              )
          }
        </Box>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Stack direction="row" sx={{ width: '50%', justifyContent: 'center' }}>
            <AiFillHeart style={{ color: 'blue' }} />
            <AiOutlineHeart />
            {5}
            Likes
          </Stack>
          <Stack direction="row" sx={{ width: '50%', justifyContent: 'center' }}>
            <AiOutlineComment />
            Comments
          </Stack>
        </Box>
      </Grid>

    ))
  );
}

export default Posts;
