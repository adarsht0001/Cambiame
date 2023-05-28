/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import {
  Badge,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TimeAgo from 'react-timeago';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Link as RouteLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PhotoCamera } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import axios from '../../Axios/axios';
import Post from '../../Components/post/Post';
import BackgroundLetterAvatars from '../../Components/avatar/StringAvatar';
import { CHAT, EditProfile } from '../../Redux';
import Editprofile from '../../Components/profile/Editprofile';
import PictureAvatar from '../../Components/avatar/PictureAvatar';
// import EditImage from '../../Components/profile/EditImage';
// import Cropper from '../../Components/profile/Cropper';

export default function Profile() {
  const theme = useTheme();
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [editform, seteditform] = useState({});
  const [posts, setPosts] = useState([]);
  const [following, setfollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setrefresh] = useState(false);
  const user = useSelector((state) => state.user);
  const [openModal, setOpenModal] = React.useState(false);
  // const [openCrop, setOpenCrop] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [coverphoto, setCoverphoto] = useState();
  const [preview, setPreview] = useState();

  const handleModalClose = () => {
    seteditform({});
    setOpenModal(false);
  };

  // const handleCropperClose = () => {
  //   setOpenCrop(false);
  // };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  // const handleCropperlOpen = () => {
  //   setOpenCrop(true);
  // };

  useEffect(() => {
    axios.get(`/profile/${username}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.access_Token}`,
      },
    }).then((response) => {
      setProfile(response.data.user);
      setPosts(response.data.posts);
      setLoading(false);
      const isfollowing = response.data?.user.followers.some((obj) => obj.id === user.id);
      if (isfollowing) {
        setfollowing(true);
      } else {
        setfollowing(false);
      }
    }).catch((err) => {
      console.log(err);
    });
  }, [refresh, username, user.name]);

  const handleFollow = () => {
    const follower = {
      id: user.id,
      name: user.name,
      email: user.email,
      profle: user.profile || null,
    };
    axios.put(`/follow/${profile.username}`, follower).then((res) => {
      console.log(res);
      setfollowing(true);
      setrefresh(!refresh);
    }).catch(() => {
      setfollowing(false);
    });
  };

  const handleMessage = () => {
    const data = {
      senderId: user.id,
      receiverId: profile._id,
    };
    axios.post('/conversation', data).then((res) => {
      dispatch(CHAT(profile));
      navigate(`/chat/${res.data._id}`);
    });
  };

  const editProfile = () => {
    const formData = new FormData();
    formData.append('id', profile._id);
    formData.append('name', editform.username || profile.username);
    formData.append('email', editform.email || profile.email);
    formData.append('cover', coverphoto);
    formData.append('profile', selectedFile);
    axios.post('/edit-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.access_Token}`,
      },
    }).then((res) => {
      navigate(`/profile/${res.data.username}`);
      dispatch(EditProfile(res?.data));
      handleModalClose();
      toast.success(res.data.msg);
    }).catch((err) => {
      toast.error(err.response?.data.msg);
    });
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  function isUser() {
    if (user.id === profile._id) {
      return true;
    }
    return false;
  }
  const setProfilImage = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const setCover = (e) => {
    setCoverphoto(e.target.files[0]);
  };
  const handleInput = (e) => {
    seteditform({ ...editform, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Box>
        <Box borderBottom="1px solid #ccc" padding="8px 20px">
          <Grid container alignItems="center">
            <Grid item sx={{ mr: '10px' }}>
              <RouteLink to="/">
                <IconButton>
                  <ArrowBackIcon />
                </IconButton>
              </RouteLink>
            </Grid>

            {!loading && (
            <Grid item>
              <Typography variant="h6">
                {profile.username}
              </Typography>
              <Typography sx={{ fontSize: '12px', color: '#555' }}>
                {posts && posts.length}
                {' '}
                posts
              </Typography>
              {' '}
            </Grid>
            )}
          </Grid>
        </Box>
        <Box textAlign="center">
          {loading && (
          <Box marginTop="1rem">
            <CircularProgress size={20} color="primary" />
          </Box>
          )}
        </Box>
        {!loading && (
        <Box height="90vh" sx={{ overflowY: 'scroll' }}>
          <Box position="relative">
            <img
              width="100%"
              height="200px"
              src={profile.cover ? profile.cover : 'https://images.pexels.com/photos/129539/pexels-photo-129539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
              alt="background"
            />
            <Box
              sx={{
                position: 'absolute',
                top: 120,
                left: 15,
                background: '#eee',
                borderRadius: '50%',
              }}
            >
              {
                profile.profile
                  ? <PictureAvatar user={profile.username || ''} image={profile.profile} width="140px" height="140px" />
                  : <BackgroundLetterAvatars width="140px" height="140px" user={profile.username} />
              }
            </Box>
          </Box>
          <Box textAlign="right" padding="10px 20px">

            {isUser() ? (
              <IconButton>
                <ManageAccountsIcon onClick={() => handleModalOpen()} />
              </IconButton>
            ) : (
              <>
                {following && (
                <IconButton>
                  <MailOutlineIcon onClick={() => handleMessage()} />
                </IconButton>
                )}
                {following
                  ? (
                    <Button
                      onClick={handleFollow}
                      size="small"
                      sx={{
                        borderRadius: theme.shape.borderRadius,
                        textTransform: 'capitalize',
                        padding: '6px 20px',
                        background: 'black',
                        '&:hover': {
                          background: '#333',
                        },
                      }}
                      variant="contained"
                    >
                      Unfollow
                    </Button>

                  ) : (
                    <Button
                      onClick={handleFollow}
                      size="small"
                      sx={{
                        borderRadius: theme.shape.borderRadius,
                        textTransform: 'capitalize',
                        padding: '6px 20px',
                        background: 'black',
                        '&:hover': {
                          background: '#333',
                        },
                      }}
                      variant="contained"
                    >
                      Follow
                    </Button>
                  )}
              </>
            )}

          </Box>

          <Box padding="10px 20px">
            <Typography variant="h6" sx={{ fontWeight: '500' }}>
              {profile.username}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              padding="6px 0"
              flexWrap="wrap"
            >
              <Box display="flex" marginLeft="1rem">
                <DateRangeIcon htmlColor="#555" />
                <Typography sx={{ ml: '6px', color: '#555' }}>
                  <TimeAgo date={profile?.date} />
                </Typography>
              </Box>
            </Box>
            <Box display="flex">
              <Typography color="#555" marginRight="1rem">
                <strong style={{ color: 'black' }}>
                  {profile.following?.length}
                </strong>
                Following
              </Typography>
              <Typography color="#555" marginRight="1rem">
                <strong style={{ color: 'black' }} />
                {profile.followers?.length}
                Followers
              </Typography>
            </Box>
          </Box>
          <Box borderBottom="1px solid #ccc">
            <Typography
              display="inline-block"
              variant="caption"
              fontSize="16px"
              marginX="1rem"
              padding="6px 0"
              fontWeight="500"
              borderBottom={`4px solid ${theme.palette.primary.main}`}
            >
              Posts
            </Typography>
          </Box>
          {posts.map((post) => (
            <Post data={post} key={post._id} callback={() => setrefresh(!refresh)} />
          ))}
        </Box>
        )}
      </Box>
      {openModal && (
      <Editprofile
        open={openModal}
        handleClose={handleModalClose}
        saveText="Edit"
        handleSave={editProfile}
      >
        <Box>
          <Grid container alignItems="center">
            <Grid width="100%" py={4} textAlign="center">
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={(
                  <IconButton color="primary" aria-label="upload picture" component="label">
                    <input
                      required
                      hidden
                      accept="image/*"
                      type="file"
                      name="img"
                      onChange={(e) => {
                        setProfilImage(e);
                        // handleCropperlOpen();
                      }}
                    />
                    <PhotoCamera />
                  </IconButton>
              )}
              >
                {preview
                  ? <PictureAvatar user={profile.username || ''} image={preview} width="140px" height="140px" />
                  : <BackgroundLetterAvatars user={profile.username || ''} width="140px" height="140px" />}
              </Badge>
            </Grid>
            <Grid width="50%" p={2}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="username"
                size="small"
                name="username"
                onChange={handleInput}
                defaultValue={profile.username}
                type="text"
              />
            </Grid>
            <Grid width="50%" p={2}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="text"
                label="email"
                size="small"
                onChange={handleInput}
                name="email"
                defaultValue={profile.email}
              />
            </Grid>
            <Grid width="100%" textAlign="center">
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="file"
                size="small"
                focused
                label="cover photo"
                inputProps={{
                  multiple: false,
                }}
                onChange={(e) => {
                  setCover(e);
                  // handleCropperlOpen();
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Editprofile>
      )}
      {/* {openCrop && (
      <EditImage
        open={openCrop}
        handleClose={handleCropperClose}
        saveText="Edit"
        handleSave={alert('hi')}
      >
        <Cropper handleClose={handleCropperClose} image={preview} />
      </EditImage>
      )} */}
    </>
  );
}
