/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import {
  // Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
// import io from 'socket.io-client';
import BackgroundLetterAvatars from '../../Components/avatar/StringAvatar';
import axios from '../../Axios/axios';
import { ENDCHAT } from '../../Redux';
import Message from '../../Components/Chat/Message';
import PictureAvatar from '../../Components/avatar/PictureAvatar';

function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // const socket = useRef();
  useEffect(() => {
    axios.get(`/message/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.access_Token}`,
      },
    }).then((res) => {
      setMessages(res.data);
    });
  }, []);

  const socket = useOutletContext();
  useEffect(() => {
    // socket.current = io('https://cambiame.site', { path: '/api/socket.io/' });
    // socket.current?.emit('adduser', user.id);
    socket.current?.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket.current]);

  useEffect(() => {
    setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: id,
    };
    socket.current.emit('sendMessage', {
      senderid: user.id,
      receiverid: chat.id,
      text: newMessage,
      user: user.name,
    });

    axios.post('/message', message, {
      headers: {
        Authorization: `Bearer ${user.access_Token}`,
      },
    }).then((res) => {
      setMessages([...messages, res.data]);
      setNewMessage('');
    });
  };
  const HandleBack = () => {
    dispatch(ENDCHAT());
    navigate('/chat');
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px" mt="5px">
        <Grid container alignItems="center">
          <Grid item sx={{ mr: '10px' }}>
            <div onClick={HandleBack}>
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </div>
          </Grid>
          <Grid item>
            <Grid container flexWrap="nowrap">
              <Grid item sx={{ paddingRight: '1rem' }}>
                {
                  chat.profile
                    ? <PictureAvatar name={chat?.name || ''} image={chat.profile} />
                    : <BackgroundLetterAvatars user={chat.name || ''} />
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
                          {chat.name}
                        </Typography>
                      </Box>
                      {/* <Box>
                        <Typography sx={{ fontSize: '15px', color: '#555' }}>
                          22 min ago
                        </Typography>
                      </Box> */}
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
            // height: '7vh',
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
          {messages?.map((item, index) => (
            <div ref={scrollRef} key={index}>
              <Message key={index} message={item} own={item?.sender === user.id} />
            </div>
          ))}
        </Box>
        {/* <Stack direction="row"> */}
        <TextField
          variant="outlined"
          id="outlined-multiline-flexible"
          multiline
          value={newMessage}
          maxRows={2}
          fullWidth
          size="small"
          placeholder="Sent a message"
          onChange={(e) => setNewMessage(e.target.value)}
          color="warning"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">

                <SendIcon
                  onClick={handleSubmit}
                  // eslint-disable-next-line no-return-assign
                  onMouseOver={(e) => e.target.style.cursor = 'pointer'}
                />
              </InputAdornment>
            ),
            style: {
              borderRadius: '40px',
            },
          }}
        />
        {/* </Stack> */}
      </>
    </Box>
  );
}

export default Chat;
