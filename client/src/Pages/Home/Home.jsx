import * as React from 'react';
import Stack from '@mui/material/Stack';
import Leftsidebar from '../../Components/Home/Leftsidebar/Leftsidebar';
import Main from '../../Components/Home/main/main';
import RightsideBar from '../../Components/Home/rightSideBar/RightsideBar';

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
      <RightsideBar />
    </Stack>
  );
}
