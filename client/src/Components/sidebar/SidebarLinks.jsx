import {
  Grid, Typography, useMediaQuery, useTheme,
} from '@mui/material';
import React from 'react';

function SidebarLinks({ Icon, text, callback }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
<<<<<<< HEAD
  const iconSize = isSmallScreen ? 40 : 30;
=======
  const iconSize = isSmallScreen ? 30 : 20;
>>>>>>> main

  return (
    <Grid
      container
      alignItems="center"
      justifyItems="center"
      spacing={2}
      width="auto"
      borderRadius={2}
      sx={{
        cursor: 'pointer',
        [theme.breakpoints.up('sm')]: {
          margin: '15px',
<<<<<<< HEAD
=======
          '&:hover': {
            bgcolor: 'primary.main',
            padding: '0',
            color: 'wheat',
          },
>>>>>>> main
        },
        '&:hover': {
          bgcolor: 'primary.main',
          padding: '15px',
          color: 'wheat',
        },
      }}
      onClick={callback}
      onKeyDown={callback}
      role="presentation"
    >
      <Grid item>
        <Icon size={iconSize} />
      </Grid>
      <Grid item>
        <Typography
          variant="body1"
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
      </Grid>
    </Grid>
  );
}

export default SidebarLinks;
