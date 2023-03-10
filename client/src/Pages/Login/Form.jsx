/* eslint-disable import/no-extraneous-dependencies */
import { Typography, Grid } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Inputfield from '../../Components/input/Inputfield';
import Buttons from '../../Components/button/Button';
import axios from '../../Axios/axios';

function Form() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErr] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    axios.post('/login', data).then((res) => {
      localStorage.setItem('access_token', res.data.user.accesToken);
      navigate('/');
    }).catch((err) => {
      setErr(err.response.data);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" color="initial">
        Login
      </Typography>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        paddingTop={2}
      >
        <Inputfield variant="outlined" label="Email" type="email" value={email} callback={(e) => setEmail(e.target.value)} err={!!error.email} helper={error.email ? error.msg : null} />
        <Inputfield variant="outlined" label="Password" type="password" value={password} callback={(e) => setPassword(e.target.value)} err={!!error.password} helper={error.password ? error.msg : null} />
        <Buttons size="large" variant="contained" color="primary" type="submit" Text="Login" />
      </Grid>
    </form>
  );
}

export default Form;
