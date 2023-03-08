import React from 'react';
import './logo.css';
import { FiShare2 } from 'react-icons/fi';

function Logo() {
  const style = { color: 'white', background: 'blue' };
  return (
    <h1>
      <FiShare2 style={style} />
      <span id="logo">ZONE</span>
    </h1>
  );
}

export default Logo;
