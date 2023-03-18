import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../Axios/axios';

function VerifyEmail() {
  const navigate = useNavigate();
  const { id, token } = useParams();
  useEffect(() => {
    console.log(id);
    console.log(token);
    axios.post(`/verify-email/${id}/${token}`, { id }).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <div>verifiyiing....</div>
  );
}

export default VerifyEmail;
