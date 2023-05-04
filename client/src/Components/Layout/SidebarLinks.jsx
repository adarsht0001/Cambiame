import { useTheme } from '@emotion/react';
import {
  Hidden, ListItem, ListItemIcon, ListItemText, useMediaQuery,
} from '@mui/material';
import React from 'react';

function SidebarLinks({ Icon, text, callback }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const iconSize = isSmallScreen ? 30 : 20;

  return (
    <ListItem
      button
      sx={{
        borderRadius: '28px',
        margin: '.5rem 0',
      }}
      onClick={callback}
    >
      <ListItemIcon>
        <Icon size={iconSize} />
      </ListItemIcon>
      <Hidden lgDown>
        <ListItemText
          primaryTypographyProps={{
            fontSize: '18px',
            color: theme.palette.action.active,
          }}
          primary={text}
        />
      </Hidden>
    </ListItem>
  );
}

export default SidebarLinks;
