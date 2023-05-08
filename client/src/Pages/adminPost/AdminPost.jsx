/* eslint-disable no-underscore-dangle */
import {
  Box, Paper, Stack, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import BackgroundLetterAvatars from '../../Components/avatar/StringAvatar';
import Comments from '../../Components/post/Comment';
import axios from '../../Axios/axios';
import LongMenu from '../../Components/post/PostAction';

function AdminPost() {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const [showComment, setShowComment] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/admin/post/${id}`).then((response) => {
      console.log(response);
      setPost(response.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const changevisibilty = () => {
    setShowComment(!showComment);
  };
  const liked = true;
  return (
    <Paper
      sx={{
        width: '30%', border: 'red', padding: '20px', marginTop: '20px',
      }}
      elevation={10}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BackgroundLetterAvatars user={post?.user || 'user'} />
          <Typography variant="body2" sx={{ marginLeft: '8px' }}>{post?.user}</Typography>
        </Box>
        <Box>
          <LongMenu postid={post._id} isUser callback={() => navigate('/admin/post')} />
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
      <Box
        sx={{
          display: 'flex', width: '100%', alignItems: 'center',
        }}
      >
        <Stack
          direction="row"
          sx={{
            width: '50%',
            justifyContent: 'center',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          {liked
            ? <AiFillHeart style={{ color: 'red' }} size={20} />
            : <AiOutlineHeart size={20} />}
          {' '}
          {post.likes}
          {' '}
          Likes
        </Stack>
        <Stack
          direction="row"
          sx={{
            width: '50%',
            justifyContent: 'center',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
          onClick={changevisibilty}
        >
          <AiOutlineComment size={20} />
          Comments
        </Stack>
      </Box>
      {showComment && (
      <Box
        sx={{
          overflowY: 'scroll', scrollbarWidth: '0px', maxHeight: '250px', minHeight: '100px', padding: '5px',
        }}
      >
        {post?.comments?.length > 0
          ? <Comments postid={id} />
          : <Typography variant="caption">No comments</Typography>}
      </Box>
      )}
    </Paper>
  );
}

export default AdminPost;
