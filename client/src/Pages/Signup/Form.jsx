import { Typography, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Buttons from '../../Components/button/Button';
import axios from '../../Axios/axios';

function Form() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [error, setErr] = useState({});
  const validatePass = () => {
    if (password.length < 8) {
      setErr({ msg: 'Min length 8', password: true });
      return false;
    }
    if (repassword !== password) {
      setErr({ msg: 'Doesnt Match password', respassword: true });
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      setErr({ msg: 'Invalid Email', email: true });
      return false;
    }
    setErr({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
    };
    if (validatePass() && validateEmail()) {
      axios.post('/signup', data).then(() => {
        toast.success('Account Created');
        navigate('/login');
      }).catch((err) => {
        setErr(err.response.data);
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" color="initial">
        Sign Up
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
          label="Username"
          type="text"
          value={name}
          size="small"
          onChange={(e) => setName(e.target.value)}
          error={!!error.name}
          helperText={error.name ? error.msg : null}
          sx={{ marginLeft: '3px' }}
          style={{ marginBlock: '1rem' }}
          color="warning"
        />
        <TextField
          variant="outlined"
          label="Email"
          type="email"
          value={email}
          size="small"
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
          size="small"
          onChange={(e) => setPassword(e.target.value)}
          error={!!error.password}
          helperText={error.password ? error.msg : null}
          sx={{ marginLeft: '3px' }}
          style={{ marginBlock: '1rem' }}
          color="warning"
        />
        <TextField
          variant="outlined"
          label="Re-Password"
          type="password"
          value={repassword}
          size="small"
          onChange={(e) => setRepassword(e.target.value)}
          error={!!error.respassword}
          helperText={error.respassword ? error.msg : null}
          sx={{ marginLeft: '3px' }}
          style={{ marginBlock: '1rem' }}
          color="warning"
        />
        <Buttons size="large" variant="contained" color="primary" type="submit" Text="Signup" />
      </Grid>
    </form>
  );
}

export default Form;
