import React, { useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Inputfield from '../../Components/input/Inputfield';
import Buttons from '../../Components/button/Button';
import axios from '../../Axios/axios';

function Form(props) {
  const navigate = useNavigate();
  const { id, token } = props;
  const [pass, setPass] = useState('');
  const [rePass, setrePass] = useState('');
  const [err, setErr] = useState(false);
  const [exp, setExp] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pass === rePass) {
      axios.post(`/reset-password/${id}/${token}`, { pass }).then(() => {
        navigate('/login');
      }).catch((error) => {
        setExp(error.response.data.msg);
      });
    } else {
      setErr(true);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {exp && <h4>{exp}</h4>}
      <Typography variant="h5" color="initial">
        Change Password
      </Typography>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        paddingTop={2}
      >
        <Inputfield variant="outlined" label="Password" type="text" value={pass} callback={(e) => setPass(e.target.value)} />
        <Inputfield variant="outlined" label="Re-Password" type="password" value={rePass} callback={(e) => setrePass(e.target.value)} err={err} helper={err ? 'Re-pass Doesnt Match Password' : ''} />
        <Buttons size="large" variant="contained" color="primary" type="submit" Text="RESET PASSWORD" />
      </Grid>
    </form>
  );
}

export default Form;
