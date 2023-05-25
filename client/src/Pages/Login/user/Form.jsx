import { Typography, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import Buttons from '../../../Components/button/Button';
import axios from '../../../Axios/axios';
import { Login } from '../../../Redux';

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
    axios.post('/login', data).then((res) => {
      dispatch(Login(res.data.user));
      localStorage.setItem('user', res.data.user.email);
      localStorage.setItem('access_token', res.data.user.accesToken);
      toast.success(`Hello ${res.data.user.username}`, {
        icon: '👏',
      });
      navigate('/');
    }).catch((err) => {
      console.log(err);
      setErr(err.response?.data);
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
        <TextField
          variant="outlined"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error.email}
          helperText={error.email ? error.msg : null}
          sx={{ marginLeft: '3px' }}
          style={{ marginBlock: '1rem' }}
          color="warning"
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error.password}
          helperText={error.password ? error.msg : null}
          sx={{ marginLeft: '3px' }}
          style={{ marginBlock: '1rem' }}
          color="warning"
        />
        <Buttons size="large" variant="contained" color="primary" type="submit" Text="Login" />
      </Grid>
    </form>
  );
}

export default Form;
