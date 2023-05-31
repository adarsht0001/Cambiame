import { CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import TimeAgo from 'react-timeago';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../Axios/axios';
import BackgroundLetterAvatars from '../avatar/StringAvatar';
import PictureAvatar from '../avatar/PictureAvatar';

export default function Comment({ postid, refresh }) {
  const [comments, setComments] = useState([]);
  const [Loading, setLoading] = useState(true);
  const naigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios.get(`/post/get-comments/${postid}`, {
      headers: {
        Authorization: `Bearer ${user.access_Token}`,
      },
    }).then((response) => {
      setComments(response.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }, [refresh]);
  return (
    <>
      <Box textAlign="center" marginTop="1rem">
        {Loading && (
        <CircularProgress size={20} color="primary" />
        )}
      </Box>
      {!Loading && comments.map((comment, i) => (
        <Box
        // eslint-disable-next-line react/no-array-index-key
          key={i}
          padding="1rem"
          sx={{
            '&:hover': {
              backgroundColor: '#eee',
            },
          }}
        >
          <Grid container flexWrap="nowrap">
            <Grid item sx={{ paddingRight: '1rem' }} onClick={() => naigate(`/profile/${comment.name}`)}>
              {
                comment.userProfile
                  ? <PictureAvatar name={comment.name || ''} image={comment.userProfile} />
                  : <BackgroundLetterAvatars user={comment?.name || ''} />
              }
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
                      <Typography
                        sx={{ fontSize: '16px', fontWeight: 500, mr: '6px' }}
                      >
                        {comment.name}
                      </Typography>
                      <Typography
                        sx={{ fontSize: '15px', mr: '6px', color: '#555' }}
                      >
                        .
                      </Typography>
                      <Typography
                        sx={{ fontSize: '15px', mr: '6px', color: '#555' }}
                      >
                        <TimeAgo date={comment?.date} />
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '15px', color: '#555' }}>
                        {comment.comment}
                      </Typography>
                    </Box>
                  </Grid>
                  {/* <Grid item>
                  <IconButton>
                    <MoreHorizIcon />
                  </IconButton>
                </Grid> */}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </>
  );
}
