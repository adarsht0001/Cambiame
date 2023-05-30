/* eslint-disable no-underscore-dangle */
import {
  Grid,
  IconButton,
  Input,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import TimeAgo from 'react-timeago';
import axios from '../../Axios/axios';
import Modal from './Modal';
import BackgroundLetterAvatars from '../avatar/StringAvatar';
import PostActions from './PostAction';
import PictureAvatar from '../avatar/PictureAvatar';

export default function Post({ data, callback }) {
  const [post, setPosts] = useState(data);
  const user = useSelector((state) => state.user);
  const [liked, setLiked] = useState(false);
  const [isUser, setisUser] = useState(false);
  const [commentText, setCommentText] = useState('');
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
    axios.put(`/post/like/${user.id}/${values._id}`, {}, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.access_Token}`,
      },
    }).then((res) => {
      if (res.data) {
        if (res.data.msg === 'liked the post') {
          setPosts({ ...post, likedby: [...post.likedby, user.id], likes: post.likes + 1 });
          setLiked(true);
          toast.success(res.data.msg);
        } else {
          const newlikedby = post.likedby.filter((e) => e !== user.id);
          setPosts({ ...post, likedby: newlikedby, likes: post.likes - 1 });
          setLiked(false);
          toast.error(res.data.msg);
        }
      }
    }).catch((err) => console.log(err));
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
      // setRefresh(!refresh);
    }).catch((err) => toast.error(err.messsage));
  };

  const copyClipboard = async () => {
    navigator.clipboard.writeText(`http://localhost:3000/post/${post._id}`);
    toast('Copied To ClipBoard!', {
      icon: '📋',
    });
  };

  const [openModal, setOpenModal] = React.useState(false);
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  return (
    <>
      <Link to={`/post/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Box
          padding="1rem"
          sx={{
            '&:hover': {
              backgroundColor: '#eee',
            },
          }}
        >
          <Grid container flexWrap="nowrap">
            <Grid item sx={{ paddingRight: '1rem' }}>
              <Link to={`/profile/${post.user}`}>
                {
                  post.userProfile
                    ? <PictureAvatar user={post.username || ''} image={post.userProfile} />
                    : <BackgroundLetterAvatars user={post?.user} />
                }
              </Link>
            </Grid>
            <Grid item flexGrow="1">
              <Box>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="nowrap"
                >
                  <Grid item>
                    <Box display="flex">
                      <Typography sx={{ fontSize: '16px', fontWeight: 500, mr: '6px' }}>
                        {post.user}
                      </Typography>
                      <Typography
                        sx={{ fontSize: '15px', mr: '6px', color: '#555' }}
                      >
                        <TimeAgo date={post?.date} />
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '17px', color: '#555' }}>
                        {post.caption}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <PostActions postid={post?._id} isUser={isUser} callback={callback} />
                  </Grid>
                </Grid>
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
                    height="400rem"
                    alt=""
                    srcSet=""
                  />
                </Box>
                )}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginRight="5rem"
                  marginTop=".8rem"
                >
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      handleModalOpen();
                    }}
                    size="small"
                  >
                    <ChatBubbleOutlineIcon fontSize="small" />
                  </IconButton>
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
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.preventDefault();
                      copyClipboard();
                    }}
                  >
                    <IosShareIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Link>
      {openModal && (
      <Modal
        open={openModal}
        handleClose={handleModalClose}
        saveText="Comment"
        len={commentText.trimStart().length}
        handleSave={handleAddComment}
      >
        <Box>
          <Grid container>
            <Grid item>
              {
                user.profile
                  ? <PictureAvatar user={user?.name || ''} image={user.profile} />
                  : <BackgroundLetterAvatars user={user.username} />
              }
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
            </Grid>
          </Grid>
        </Box>
      </Modal>
      )}
    </>
  );
}
