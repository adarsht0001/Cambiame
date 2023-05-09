/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Box } from '@mui/system';
import {
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouteLink } from 'react-router-dom';
import BackgroundLetterAvatars from '../../Components/avatar/StringAvatar';

function Conversation() {
  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px" mt="5px">
        <Grid container alignItems="center">
          <Grid item sx={{ mr: '10px' }}>
            <RouteLink to="/">
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </RouteLink>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: '20px', color: '#555' }}>
              Conversations
            </Typography>
          </Grid>
        </Grid>
      </Box>
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
            {/* <img src="/logo.png" alt="lgoog" width="50px" /> */}
            <BackgroundLetterAvatars user="yse" />
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
                      adjh
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '15px', color: '#555' }}>
                      dhsajs
                      {' '}

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
          <Typography
            sx={{
              fontSize: '15px', ml: 'auto', color: '#555',
            }}
          >
            2:34
            {/* {formatDistanceToNow(new Date(comment.createdAt))} */}
            {' '}
          </Typography>
        </Grid>
      </Box>
    </Box>
  );
}

export default Conversation;
