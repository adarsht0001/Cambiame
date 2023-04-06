import React from 'react';
// import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import Postshare from './Postshare';
import Posts from './Posts';

function Main() {
  return (
    <Grid container alignItems="center" direction="column">
      <Postshare />
      <Posts />
      {/* // <Postshare />
// <Postshare /> */}

    </Grid>
  );
}

export default Main;
