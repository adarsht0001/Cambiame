import InputAdornment from '@mui/material/InputAdornment';
import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-hot-toast';
import axios from '../../Axios/axios';
import Inputfield from '../input/Inputfield';

function AddPost({ callback }) {
  const [text, setText] = useState('');
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
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
      setImg();
      setText('');
      setLoading(false);
      toast.success(res?.data.msg);
      callback();
    }).catch((err) => {
      toast.error(err.response.data.msg);
    });
  };
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <Inputfield
        variant="outlined"
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
                {loading ? (
                  <CircularProgress
                    color="secondary"
                    size={20}
                    thickness={4}
                    value={100}
                  />
                )
                  : (
                    <SendIcon
                      onClick={handleSubmit}
                      // eslint-disable-next-line no-return-assign
                      onMouseOver={(e) => e.target.style.cursor = 'pointer'}
                    />
                  )}
              </InputAdornment>
            </>
          ),
        }}
      />
    </FormControl>
  );
}

export default AddPost;
