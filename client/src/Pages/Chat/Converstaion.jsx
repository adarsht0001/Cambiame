/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import {
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouteLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../Axios/axios';
import Conversations from '../../Components/Chat/Conversations';

function Conversation() {
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios.get(`/conversation/${user.id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.access_Token}`,
      },
    }).then((res) => {
      const result = res?.data;
      result.sort((a, b) => {
        const createdAtA = a.message ? new Date(a.message.createdAt).getTime() : 0;
        const createdAtB = b.message ? new Date(b.message.createdAt).getTime() : 0;
        return createdAtB - createdAtA;
      });
      setConversation(result);
      setLoading(false);
    });
  }, []);

  return (
    <Box sx={{
      height: '100vh',
      overflow: 'scroll',
      overflowX: 'hidden',
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
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
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
        padding="8px 20px"
        sx={{
          overflowX: 'hidden',
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
        {loading ? (
          <Box marginTop="1rem" textAlign="center">
            <CircularProgress size={20} color="primary" />
          </Box>
        ) : (
          conversation?.map((c, i) => (
            <Conversations key={i} conversation={c} userId={user.id} />
          )))}
      </Box>
    </Box>
  );
}

export default Conversation;
