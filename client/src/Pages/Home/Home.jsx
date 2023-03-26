import * as React from 'react';
import Stack from '@mui/material/Stack';
import Leftsidebar from '../../Components/Home/Leftsidebar/Leftsidebar';
import Main from '../../Components/Home/main/main';

export default function Home() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="stretch"
      spacing={1}
      padding={10}
    >
      <Leftsidebar />
      <Main />
      <h1>Item 3</h1>
    </Stack>
  );
}
