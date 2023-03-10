import { Typography, Grid } from '@mui/material';
import { useState } from 'react';
import Inputfield from '../../Components/input/Inputfield';
import Buttons from '../../Components/button/Button';
import axios from '../../Axios/axios';

function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
    };
    axios.post('/signup', data).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
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
        <Inputfield variant="outlined" label="Username" type="text" value={name} size="small" callback={(e) => setName(e.target.value)} />
        <Inputfield variant="outlined" label="Email" type="email" value={email} size="small" callback={(e) => setEmail(e.target.value)} />
        <Inputfield variant="outlined" label="Password" type="password" value={password} size="small" callback={(e) => setPassword(e.target.value)} />
        <Inputfield variant="outlined" label="Re-Password" type="password" value={repassword} size="small" callback={(e) => setRepassword(e.target.value)} />
        <Buttons size="large" variant="contained" color="primary" type="submit" Text="Signup" />
      </Grid>
    </form>
  );
}

export default Form;
