import {
  Grid, IconButton, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import AssistantIcon from '@mui/icons-material/Assistant';
import AddPost from './post/AddPost';

export default function Test() {
  return (
    <Box m={2}>
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">Home</Typography>
          </Grid>
          <Grid item>
            <IconButton>
              <AssistantIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box height="92vh" sx={{ overflowY: 'hidden', px: 4 }}>
        <AddPost />
      </Box>
    </Box>
  );
}
