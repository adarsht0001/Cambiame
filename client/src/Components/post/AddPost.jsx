import InputAdornment from '@mui/material/InputAdornment';
import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import { CircularProgress, TextField } from '@mui/material';
import { toast } from 'react-hot-toast';
import axios from '../../Axios/axios';

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
    data.append('userId', user.id);
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
      <TextField
        variant="outlined"
        label="Whats on Your Mind"
        id="outlined-multiline-flexible"
        multiline
        maxRows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ marginLeft: '3px' }}
        style={{ marginBlock: '1rem' }}
        color="warning"
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
          style: {
            borderRadius: '40px',
          },
        }}
      />
    </FormControl>
  );
}

export default AddPost;
