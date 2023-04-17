/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
import React, { useEffect, useState } from 'react';
import './main.css';
import {
  Box, Typography, Stack, Paper,
  InputAdornment, CircularProgress,
} from '@mui/material';
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import BackgroundLetterAvatars from '../../avatar/StringAvatar';
import axios from '../../../Axios/axios';
import LongMenu from './postactions';
import Inputfield from '../../input/Inputfield';
import Comments from './comments';

function Posts({ data, callback }) {
  const [post, setPosts] = useState(data);
  const [liked, setLiked] = useState(false);
  const [isUser, setisUser] = useState(false);
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(null);
  const [refresh, setRefresh] = useState(null);
  const changevisibilty = () => {
    setShowComment(!showComment);
  };
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (post.user === user.name) {
      setisUser(true);
    }
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

  const hadnleComment = () => {
    setLoading(true);
    const commentData = {
      id: user.id,
      name: user.name,
      profle: user.profile || null,
      postid: post._id,
      comment,
    };
    axios.post('/add-comment', commentData).then(() => {
      // callback();
      setComment('');
      setLoading(false);
      setRefresh(!refresh);
    }).catch((err) => console.log(err));
  };
  return (
    <Paper
      sx={{
        width: '30%', border: 'red', padding: '20px', marginTop: '20px',
      }}
      elevation={10}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BackgroundLetterAvatars user={post.user} />
          <Typography variant="body2" sx={{ marginLeft: '8px' }}>{post.user}</Typography>
        </Box>
        <Box>
          <LongMenu postid={post._id} isUser={isUser} callback={callback} />
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
          onClick={() => like(post)}
        >
          {liked
            ? <AiFillHeart style={{ color: 'red' }} size={20} />
            : <AiOutlineHeart size={20} />}
          {post.likes}
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
        {post.comments.length > 0
          ? <Comments postid={post._id} refresh={refresh} />
          : <Typography variant="caption">No comments</Typography>}
      </Box>
      )}

      <div width="100%" className="TextField-without-border-radius">
        <Inputfield
          variant="outlined"
          fullWidth
          placeholder="Add a comment..."
          value={comment}
          callback={(e) => setComment(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment p={2} position="start">
                <BackgroundLetterAvatars user={user.name} width="2rem" height="2rem" />
              </InputAdornment>),
            endAdornment: (
              <InputAdornment position="end">
                {
                  loading ? (
                    <CircularProgress
                      color="secondary"
                      size={20}
                      thickness={4}
                      value={100}
                    />
                  )
                    : (
                      <SendIcon onMouseOver={(e) => e.target.style.cursor = 'pointer'} onClick={hadnleComment} />
                    )
                }
              </InputAdornment>
            ),
          }}
        />
      </div>
    </Paper>

  );
}

export default Posts;
