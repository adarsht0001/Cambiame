import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import TimeAgo from 'react-timeago';
import axios from '../../Axios/axios';
import BackgroundLetterAvatars from '../avatar/StringAvatar';

export default function Comment({ postid, refresh }) {
  const [comments, setComments] = useState([]);

  //   const [Loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/post/get-comments/${postid}`).then((response) => {
      setComments(response.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [refresh]);
  return (
    //   <Box textAlign="center" marginTop="1rem">
    //           {'loading' === 'loading' && (
    //           <CircularProgress size={20} color="primary" />
    //           )}
    //         </Box>
    comments.map((comment, i) => (
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
          <Grid item sx={{ paddingRight: '1rem' }}>
            <BackgroundLetterAvatars user={comment.name} />
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
    ))
  );
}
