import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div>Home</div>
      <button
        type="button"
        onClick={() => {
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
