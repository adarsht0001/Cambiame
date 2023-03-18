/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Logout } from '../../Redux';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div>Home</div>
      <button
        type="button"
        onClick={() => {
          dispatch(Logout());
          localStorage.removeItem('user');
          localStorage.removeItem('access_token');
          navigate('/login');
        }}
      >
        LogOut
      </button>

    </>
  );
}

export default Home;
