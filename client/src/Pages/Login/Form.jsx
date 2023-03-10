import { Typography, Grid } from '@mui/material';
import { useState } from 'react';
import Inputfield from '../../Components/input/Inputfield';
import Buttons from '../../Components/button/Button';
import axios from '../../Axios/axios';

function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    axios.post('/login', data).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
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
        <Inputfield variant="outlined" label="Email" type="email" value={email} callback={(e) => setEmail(e.target.value)} />
        <Inputfield variant="outlined" label="Password" type="password" value={password} callback={(e) => setPassword(e.target.value)} />
        <Buttons size="large" variant="contained" color="primary" type="submit" Text="Login" />
      </Grid>
    </form>
  );
}

export default Form;
