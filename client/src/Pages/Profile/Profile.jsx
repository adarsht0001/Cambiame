import React from 'react';
import Stack from '@mui/material/Stack';
import Leftsidebar from '../../Components/Home/Leftsidebar/Leftsidebar';
import UserProfile from '../../Components/profile/profile';

function Profile() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="stretch"
      spacing={1}
      padding={10}
    >
      <Leftsidebar />
      <UserProfile />
    </Stack>
  );
}

export default Profile;
