import React from 'react';
import './sidebar.css';
import { Typography } from '@mui/material';

function Sidebarlink({ text, Icon, callback }) {
  return (
    <div className="link" onClick={callback} onKeyDown={callback} role="presentation">
      <Icon style={{ marginRight: '7px' }} />
      <Typography
        variant="body2"
        sx={{
          display: {
            xs: 'none',
            sm: 'none',
            md: 'block',
          },
        }}
      >
        {text}
      </Typography>
    </div>
  );
}
export default Sidebarlink;
