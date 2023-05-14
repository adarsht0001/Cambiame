// /* eslint-disable import/no-extraneous-dependencies */
// import React from 'react';
// import {
//   Box, Typography, Stack,
// } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import BackgroundLetterAvatars from '../Components/avatar/StringAvatar';
// // import ReactTimeAgo from 'react-time-ago';

// const useStyles = makeStyles({
//   chatroot1: {
//     width: '100%',
//     alignItems: 'end',
//     justifyContent: 'end',
//     m: 1,
//     height: 80,
//   },
//   chatroot2: {
//     width: '100%',
//     alignItems: 'start',
//     justifyContent: 'start',
//     m: 1,
//     height: 80,
//   },
//   chat1: {
//     wordBreak: 'break-all',
//     color: 'white',
//     backgroundColor: '#3b71ca',
//     maxWidth: 400,
//   },
//   chat2: {
//     wordBreak: 'break-all',
//     color: 'black',
//     backgroundColor: 'white',
//     maxWidth: 400,
//   },
// });

// function Message() {
//   const {
//     chat1, chat2, chatroot1, chatroot2,
//   } = useStyles();
//   const own = true;

//   return (
//     <Stack
//       direction={own ? 'row' : 'row-reverse'}
//       component="div"
//       spacing={1}
//       className={own ? chatroot1 : chatroot2}
//     >
//       <Box>
//         <Typography
//           className={own ? chat1 : chat2}
//           p={1}
//           borderRadius={2}
//           variant="body2"
//         >
//           sdjlkasdfa saf
//         </Typography>
//         <Typography
//           sx={{ float: own ? 'right' : 'left' }}
//           variant="caption"
//         >
//           {/* <ReactTimeAgo date={data.createdAt} locale="en-US" />
//            */}
//           {' '}
//           22:34
//         </Typography>
//       </Box>
//       {/* <Avatar sx={{ bgcolor: own ? 'blue' : 'green' }}>
//         {own
//           ? stringAvatar('hello')
//           : stringAvatar('test')}
//       </Avatar> */}
//       <BackgroundLetterAvatars user="hjsksd" />
//     </Stack>
//   );
// }

// export default Message;
