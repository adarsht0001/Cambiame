/* eslint-disable no-underscore-dangle */
import {
  Button,
  CircularProgress,
  //   CircularProgress,
  Grid,
  IconButton,
  Input,
  //   Menu,
  //   MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
// import format from 'date-fns/format';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import TimeAgo from 'react-timeago';
import axios from '../../Axios/axios';
import BackgroundLetterAvatars from '../avatar/StringAvatar';
import Comment from './Comment';
import PostActions from './PostAction';

export default function PostDetails() {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [post, setPost] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [isUser, setisUser] = useState(false);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get(`/post/get-post/${id}`).then((response) => {
      const { data } = response;
      if (data?.user === user.name) {
        setisUser(true);
      }
      const islikedby = data?.likedby?.some((obj) => obj.id === user.id);
      if (islikedby) {
        setLiked(true);
      } else {
        setLiked(false);
      }
      setPost(data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  const like = (values) => {
    axios.put(`/post/like/${user.id}/${values._id}`, {}, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.access_Token}`,
      },
    }).then((res) => {
      if (res.data) {
        if (res.data.msg === 'liked the post') {
          setPost({ ...post, likedby: [...post.likedby, user.id], likes: post.likes + 1 });
          setLiked(true);
          toast.success(res.data.msg);
        } else {
          const newlikedby = post.likedby.filter((e) => e !== user.id);
          setPost({ ...post, likedby: newlikedby, likes: post.likes - 1 });
          setLiked(false);
          toast.error(res.data.msg);
        }
      }
    }).catch((err) => console.log(err));
  };

  const callback = () => {
    navigate('/');
  };
  const handleAddComment = async () => {
    const commentData = {
      id: user.id,
      name: user.name,
      profle: user.profile || null,
      postid: post._id,
      comment: commentText,
    };
    axios.post('/post/add-comment', commentData).then(() => {
      setCommentText('');
      toast.success('Comment Added');
      // setLoading(false);
      setRefresh(!refresh);
    }).catch((err) => {
      toast.error(err.messsage);
      navigate('/');
    });
  };
  const copyClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/post/${id}`);
    toast('Copied To ClipBoard!', {
      icon: '📋',
    });
  };
  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container alignItems="center">
          <Grid item sx={{ mr: '10px' }}>
            <IconButton onClick={() => navigate('/')}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h6">Post</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box height="92vh" sx={{ overflowY: 'scroll' }}>
        <Box textAlign="center" marginTop="1rem">
          {Loading && (
          <CircularProgress size={20} color="primary" />
          )}
        </Box>
        {!Loading && (
        <Box padding="0 20px">
          <Box>
            <Grid container alignItems="center">
              <Grid item>
                <Link to={`/profile/${post.user}`}>
                  <BackgroundLetterAvatars user={post?.user} />
                </Link>
              </Grid>
              <Grid item flexGrow="1" mx={2}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
                      {post.user}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <PostActions postid={post?._id} isUser={isUser} callback={callback} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Typography sx={{ fontSize: '20px', mt: '5px' }}>
              {post.caption}
            </Typography>
          </Box>
          {post?.link && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={post.link}
              width="100%"
              height="30%"
              alt=""
              srcSet=""
            />
          </Box>
          )}
          <Box display="flex" padding="1rem 0" borderBottom="1px solid #ccc">
            <Typography sx={{ fontSize: '14px', mr: '6px', color: '#555' }}>
              <TimeAgo date={post?.date} />
            </Typography>
            {/* <Typography sx={{ fontSize: '14px', mr: '6px', color: '#555' }}>
              .
            </Typography> */}
            {/* <Typography sx={{ fontSize: '14px', mr: '6px', color: '#555' }}>
              {/* {postDetails
                    && postDetails.createdAt
                    && format(new Date(postDetails.createdAt), 'MMM dd yyyy')} */}
            {/* sj */}
            {/* </Typography>  */}
          </Box>
          <Box display="flex" padding="1rem 0" borderBottom="1px solid #ccc">
            <Typography sx={{ fontSize: '14px', mr: '6px', color: '#555' }}>
              <strong>{post.likes}</strong>
              {' '}
              Likes
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-around"
            padding=".5rem 0"
            borderBottom="1px solid #ccc"
          >
            <IconButton
              size="small"
              onClick={(e) => {
                e.preventDefault();
                like(post);
              }}
            >
              {liked ? (
                <FavoriteIcon fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>
            <IconButton size="small">
              <IosShareIcon
                fontSize="small"
                onClick={(e) => {
                  e.preventDefault();
                  copyClipboard();
                }}
              />
            </IconButton>
          </Box>
          <Box>
            <Grid container mt={2}>
              <Grid item>
                <BackgroundLetterAvatars user={post.user} />
              </Grid>
              <Grid item flexGrow="1" mx={2}>
                <Box padding=".5rem 0">
                  <Input
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                    multiline
                    rows="2"
                    disableUnderline
                    type="text"
                    placeholder="Post your comment"
                    sx={{ width: '100%' }}
                  />
                </Box>
                <Box textAlign="right" paddingBottom=".5rem">
                  <Button
                    disabled={commentText.length === 0}
                    onClick={handleAddComment}
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{
                      borderRadius: theme.shape.borderRadius,
                      fontSize: '12px',
                    }}
                  >
                    Comment
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Comment postid={post._id} refresh={refresh} />
          </Box>
        </Box>
        )}
      </Box>
    </Box>
  );
}
