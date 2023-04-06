import React from 'react';
import './main.css';
import { Grid, Box, Typography } from '@mui/material';
import { CiMenuKebab } from 'react-icons/ci';
import { FcLike, FcComments } from 'react-icons/fc';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BackgroundLetterAvatars from '../../avatar/StringAvatar';

function Posts() {
  return (
    <Grid sx={{ width: '50%', backgroundColor: 'red', padding: '10px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BackgroundLetterAvatars user="adarsh" />
          <Typography variant="body2" sx={{ marginLeft: '8px' }}>Adarsh</Typography>
        </Box>
        <Box>
          <CiMenuKebab />
        </Box>
      </Box>
      <Box sx={{
        display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '10px',
      }}
      >
        <Box>
          <Typography variant="h6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum eaque error saepe unde quidem, exercitationem necessitatibus sunt. Enim numquam inventore autem beatae aliquid. Vero, numquam incidunt aliquam consequatur alias repellat!</Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png" width="80%" height="80%" alt="" srcSet="" />
        </Box>
      </Box>
      <Box sx={{ width: '100%' }}>
        <BottomNavigation
          showLabels
          style={{ fontSize: '24px', height: '64px' }}
        >
          <BottomNavigationAction
            label="Like"
            icon={<FcLike sx={{ fontSize: '30%' }} />}
            sx={{ fontSize: '20px', padding: '16px' }}
          />
          <BottomNavigationAction
            label="Comments"
            icon={<FcComments sx={{ fontSize: '30%' }} />}
            sx={{ fontSize: '20px', padding: '16px' }}
          />
        </BottomNavigation>
      </Box>
    </Grid>
  );
}

export default Posts;

// <Grid container direction="coloumn" justifyContent="center">
//   <Grid item bgcolor="red">
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'start',
//         justifyContent: 'flex-end',
//       }}
//     >
//       <>
//         <BackgroundLetterAvatars user="adarsh" />
//         Adarsh
//       </>
//     </Box>
//     <Box
//       sx={{
//         display: 'flex', flexDirection: 'row-reverse', alignItems: ' ', justifyContent: 'center',
//       }}
//     >
//       <CiMenuKebab />
//     </Box>
//   </Grid>
//   <Grid item sx={{ display: 'flex' }}>
//     kla;dsfds
//   </Grid>
// </Grid>
