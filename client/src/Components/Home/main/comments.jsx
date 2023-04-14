import { Avatar, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import React from 'react';

function comments() {
  return (
    <IconButton>
      <Avatar
        src="/images/example.jpg"
        style={{
          margin: '10px',
          width: '150px',
          height: '150px',
        }}
      />
      <PhotoCamera />
    </IconButton>
  );
}

export default comments;
