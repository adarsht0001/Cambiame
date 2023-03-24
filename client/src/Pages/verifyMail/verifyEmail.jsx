import React, { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../Axios/axios';

export default function SimpleBackdrop() {
  const navigate = useNavigate();
  const { id, token } = useParams();

  useEffect(() => {
    axios.post(`/verify-email/${id}/${token}`, { id }).then(() => {
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    }).catch((error) => {
      alert(error);
    });
  }, []);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color="inherit" />
      Verifying Email
    </Backdrop>
  );
}
