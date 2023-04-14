/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import './main.css';
import {
  Box, Typography, Stack, Paper, Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import BackgroundLetterAvatars from '../../avatar/StringAvatar';
import axios from '../../../Axios/axios';
import LongMenu from './postactions';

function Posts({ data }) {
  const [post, setPosts] = useState(data);
  const [liked, setLiked] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const islikedby = post.likedby.some((obj) => obj.id === user.id);
    if (islikedby) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, []);

  const like = (values) => {
    axios.put(`/like/${user.id}/${values._id}`, {}, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.access_Token}`,
      },
    }).then((res) => {
      if (res.data) {
        if (res.data.msg === 'liked the post') {
          setPosts({ ...post, likedby: [...post.likedby, user.id], likes: post.likes + 1 });
          setLiked(true);
        } else {
          const newlikedby = post.likedby.filter((e) => e !== user.id);
          setPosts({ ...post, likedby: newlikedby, likes: post.likes - 1 });
          setLiked(false);
        }
      }
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
          <LongMenu postid={post._id} />
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
          {liked
            ? <AiFillHeart style={{ color: 'red' }} size={20} />
            : <AiOutlineHeart size={20} />}
          {post.likes}
          Likes
        </Stack>
        <Stack sx={{ width: '50%', justifyContent: 'center' }}>
          <Accordion sx={{ boxShadow: 'none' }}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <AiOutlineComment size={20} />
              Comments
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{ overflowY: 'scroll', height: '30%' }}
              >
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>

        </Stack>
      </Box>
    </Paper>

  );
}

export default Posts;
