/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../Axios/Axios';
import { Login } from '../../Redux';

function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErr] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    axios.post('/login', data)
      .then((res) => {
        dispatch(Login(res.data.user));
        localStorage.setItem('admin', true);
        navigate('/admin');
      })
      .catch((err) => {
        setErr(err.response.data);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" alignItems="center" justify="center" paddingTop={2}>
        <TextField variant="outlined" label="username" fullWidth style={{ marginBlock: '1rem' }} value={email} onChange={(e) => setEmail(e.target.value)} error={!!error.name} helperText={error.name ? error.msg : null} />
        <TextField variant="outlined" label="Password" fullWidth type="password" style={{ marginBlock: '1rem' }} value={password} onChange={(e) => setPassword(e.target.value)} error={!!error.password} helperText={error.password ? error.msg : null} />
        <Button size="large" variant="contained" color="primary" type="submit">Login</Button>
      </Grid>
    </form>
  );
}

export default Form;
