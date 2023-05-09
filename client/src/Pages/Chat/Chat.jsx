/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Box, Stack } from '@mui/system';
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouteLink } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import BackgroundLetterAvatars from '../../Components/avatar/StringAvatar';
import Message from '../Message';

function Chat() {
  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px" mt="5px">
        <Grid container alignItems="center">
          <Grid item sx={{ mr: '10px' }}>
            <RouteLink to="/conversations">
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </RouteLink>
          </Grid>
          <Grid item>
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
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <>
        <Box
          sx={{
            height: '77vh',
            bgcolor: '#ccd5cc',
            overflowX: 'hidden',
            padding: 5,
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'gray',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'darkgray',
            },
          }}
        >
          {[1, 2, 3, 8, 8, 6, 8, 8, 8, 88, 8, 8, 8, 8, 8, 8, 8, 8, 8,
            8, 8, 8, 8, 8]?.map((item, index) => (
              <div
                id="scroll"
                key={index}
              >
                <Message />
              </div>
          ))}
        </Box>
        <Stack direction="row">
          <TextField
            id="outlined-multiline-flexible"
            multiline
            maxRows={4}
            fullWidth
            size="small"
          />
          <Button
            variant="contained"
            sx={{ bgcolor: '#3b71ca' }}
            endIcon={<SendIcon />}
          />
        </Stack>
      </>
    </Box>
  );
}

export default Chat;
