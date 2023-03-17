import React, { useState } from 'react';
// import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import Buttons from '../button/Button';
import Inputfield from '../input/Inputfield';
import axios from '../../Axios/axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  textAlign: 'center',
  p: 4,
};

function Modals() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setErr] = useState({});
  const [msg, setMsg] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/forgot-password', { email }).then((res) => {
      setMsg(res.data.msg);
    }).catch((err) => {
      setErr(err.response.data);
    });
  };
  return (
    <>
      <Buttons
        size="sm"
        variant="contained"
        color="secondary"
        callback={() => setOpen(true)}
        Text={<>Forgotten Password</>}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit}>
          <Grid
            sx={style}
            container
            direction="column"
            alignItems="center"
            justify="center"
            paddingTop={2}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Forgotten Password
            </Typography>
            {msg && <h4>{msg}</h4>}
            <Inputfield variant="outlined" label="email" type="email" value={email} callback={(e) => setEmail(e.target.value)} err={!!error.email} helper={error.email ? error.msg : null} />
            <Buttons size="large" variant="contained" color="primary" type="submit" Text="Login" />
          </Grid>
        </form>
      </Modal>
    </>
  );
}

export default Modals;
