import { Typography, Grid } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Inputfield from '../../Components/input/Inputfield';
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
        <Inputfield variant="outlined" label="Username" type="text" value={name} size="small" callback={(e) => setName(e.target.value)} err={!!error.name} helper={error.name ? error.msg : null} />
        <Inputfield variant="outlined" label="Email" type="email" value={email} size="small" callback={(e) => setEmail(e.target.value)} err={!!error.email} helper={error.email ? error.msg : null} />
        <Inputfield variant="outlined" label="Password" type="password" value={password} size="small" callback={(e) => setPassword(e.target.value)} err={!!error.password} helper={error.password ? error.msg : null} />
        <Inputfield variant="outlined" label="Re-Password" type="password" value={repassword} size="small" callback={(e) => setRepassword(e.target.value)} err={!!error.respassword} helper={error.respassword ? error.msg : null} />
        <Buttons size="large" variant="contained" color="primary" type="submit" Text="Signup" />
      </Grid>
    </form>
  );
}

export default Form;
