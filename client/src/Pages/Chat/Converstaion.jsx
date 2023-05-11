/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import {
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouteLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../Axios/axios';
import Users from './Users';

function Conversation() {
  const [conversation, setConversation] = useState([]);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    axios.get(`/conversation/${user.id}`).then((res) => {
      setConversation(res.data);
    });
  }, []);

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
      {
        conversation?.map((c, i) => (
          <Users key={i} conversation={c} userId={user.id} />
        ))
      }
    </Box>
  );
}

export default Conversation;
