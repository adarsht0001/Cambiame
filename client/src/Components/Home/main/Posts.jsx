/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import React, { useRef, useState } from 'react';
import './main.css';
import {
  Box, Typography, Stack, Paper,
} from '@mui/material';
import { CiMenuKebab } from 'react-icons/ci';
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import BackgroundLetterAvatars from '../../avatar/StringAvatar';
import axios from '../../../Axios/axios';

function Posts({ data }) {
  // eslint-disable-next-line no-unused-vars
  const [post, setPosts] = useState(data);
  const user = useSelector((state) => state.user);

  const checkLiked = (likeedby) => {
    const islikedby = likeedby.some((obj) => obj && obj.id === user.id);
    if (islikedby) {
      return true;
    }
    return false;
  };

  const Likesdiv = useRef();
  const like = (values) => {
    if (checkLiked(values.likedby)) {
      values.likes -= 1;
    } else {
      values.likes += 1;
    }
    axios.put(`/like/${user.id}/${values._id}`, {}, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.access_Token}`,
      },
    }).then(() => {
      setPosts({ ...post, likedby: [...post.likedby, user.id] });
    }).catch((err) => console.log(err));
  };
  return (
    <Paper
      sx={{
        width: '30%', border: 'red', padding: '20px', marginTop: '20px',
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
      <Box sx={{ display: 'flex', width: '100%' }} ref={Likesdiv}>
        <Stack
          direction="row"
          sx={{
            width: '50%',
            justifyContent: 'center',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
          onClick={() => like(post)}
        >
          {checkLiked(post.likedby)
            ? <AiFillHeart style={{ color: 'orange' }} size={20} />
            : <AiOutlineHeart size={20} />}
          {post.likes}
          Likes
        </Stack>
        <Stack direction="row" sx={{ width: '50%', justifyContent: 'center' }}>
          <AiOutlineComment size={20} />
          Comments
        </Stack>
      </Box>
    </Paper>

  );
}

export default Posts;
