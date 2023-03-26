/* eslint-disable max-len */
/* eslint-disable no-return-assign */
import InputAdornment from '@mui/material/InputAdornment';
import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import axios from '../../../Axios/axios';
import Inputfield from '../../input/Inputfield';

function Postshare() {
  const [text, setText] = useState('');
  const [img, setImg] = useState();

  const user = useSelector((state) => state.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('text', text);
    data.append('file', img);
    data.append('name', user.name);
    axios.post('/post', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.access_Token}`,
      },
    }).then((res) => {
      alert(res.data.msg);
    }).catch((err) => {
      alert(err.response.data.msg);
    });
  };
  return (
    <FormControl fullWidth sx={{ m: 1, width: '40%' }} variant="standard">
      <Inputfield
        variant="standard"
        label="Whats on Your Mind"
        value={text}
        callback={(e) => setText(e.target.value)}
        InputProps={{
          endAdornment: (
            <>
              <InputAdornment position="end">
                <IconButton color="primary" aria-label="upload picture" component="label">
                  <input
                    required
                    hidden
                    accept="image/*"
                    type="file"
                    name="img"
                    onChange={(e) => {
                      setImg(e.target.files[0]);
                    }}
                  />
                  <PhotoCamera />
                </IconButton>
              </InputAdornment>
              <InputAdornment position="start">
                <SendIcon
                  onClick={handleSubmit}
                  onMouseOver={(e) => e.target.style.cursor = 'pointer'}
                />
              </InputAdornment>
            </>
          ),
        }}
      />
    </FormControl>
  );
}

export default Postshare;

// <Button sx={{ marginLeft: '8px' }} onClick={handleSubmit} variant="contained" endIcon={<SendIcon />}>
//   Upload
// </Button>
