// import * as React from 'react';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import HomeIcon from '@mui/icons-material/Home';
// import {
//   Button,
//   Grid,
//   Hidden,
//   IconButton,
//   Input,
//   useTheme,
// } from '@mui/material';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import LogoutIcon from '@mui/icons-material/Logout';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import { Link, NavLink } from 'react-router-dom';
// import cambie from '../../Assets/svg/CAMBIAME.svg';

// export default function LeftSidebar() {
//   const theme = useTheme();

//   const [openModal, setOpenModal] = React.useState(false);

//   const handleModalOpen = () => {
//     setOpenModal(true);
//   };

//   const [postText, setPostText] = React.useState('');

//   return (
//     <>
//       <Box sx={{ height: '100vh', maxWidth: '100%' }}>
//         <Box textAlign="center" marginY={7}>
//           <Link
//             to="/"
//             style={{
//               textDecoration: 'none',
//               color: 'inherit',
//               backgroundColor: 'inherit',
//             }}
//           >
//             <img src={cambie} alt="logo" />
//           </Link>
//         </Box>
//         <List>
//           <NavLink
//             to="/"
//             style={{
//               textDecoration: 'none',
//               color: 'inherit',
//               backgroundColor: 'inherit',
//             }}
//           >
//             <ListItem
//               button
//               sx={{
//                 borderRadius: '28px',
//                 margin: '.5rem 0',
//               }}
//             >
//               <ListItemIcon>
//                 <HomeIcon fontSize="medium" color="action" />
//               </ListItemIcon>
//               <Hidden lgDown>
//                 <ListItemText
//                   primaryTypographyProps={{
//                     fontSize: '18px',
//                     color: theme.palette.action.active,
//                   }}
//                   primary="Home h"
//                 />
//               </Hidden>
//             </ListItem>
//           </NavLink>
//           <ListItem
//             button
//             sx={{
//               borderRadius: '28px',
//               margin: '.5rem 0',
//             }}
//           >
//             <ListItemIcon>
//               <BookmarkIcon fontSize="medium" color="action" />
//             </ListItemIcon>
//             <Hidden lgDown>
//               <ListItemText
//                 primaryTypographyProps={{
//                   fontSize: '18px',
//                   color: theme.palette.action.active,
//                 }}
//                 primary="Bookmarks"
//               />
//             </Hidden>
//           </ListItem>
//           <ListItem
//             button
//             sx={{
//               borderRadius: '28px',
//               margin: '.5rem 0',
//             }}
//           >
//             <ListItemIcon>
//               <FavoriteIcon fontSize="medium" color="action" />
//             </ListItemIcon>
//             <Hidden lgDown>
//               <ListItemText
//                 primaryTypographyProps={{
//                   fontSize: '18px',
//                   color: theme.palette.action.active,
//                 }}
//                 primary="Likes"
//               />
//             </Hidden>
//           </ListItem>
//           <NavLink
//             style={{
//               textDecoration: 'none',
//               color: 'inherit',
//               backgroundColor: 'inherit',
//             }}
//           >
//             <ListItem
//               button
//               sx={{
//                 borderRadius: '28px',
//                 margin: '.5rem 0',
//               }}
//             >
//               <ListItemIcon>
//                 <PersonOutlineIcon fontSize="medium" color="action" />
//               </ListItemIcon>
//               <Hidden lgDown>
//                 <ListItemText
//                   primaryTypographyProps={{
//                     fontSize: '18px',
//                     color: theme.palette.action.active,
//                   }}
//                   primary="Profile"
//                 />
//               </Hidden>
//             </ListItem>
//           </NavLink>
//           <ListItem
//             id="basic-button"
//             button
//             sx={{
//               borderRadius: '28px',
//               margin: '.5rem 0',
//             }}
//           >
//             <ListItemIcon>
//               <LogoutIcon fontSize="medium" color="action" />
//             </ListItemIcon>
//             <Hidden lgDown>
//               <ListItemText
//                 primaryTypographyProps={{
//                   fontSize: '18px',
//                   color: theme.palette.action.active,
//                 }}
//                 primary="Logout"
//               />
//             </Hidden>
//           </ListItem>
//         </List>
//         <Hidden lgDown>
//           <Button
//             onClick={handleModalOpen}
//             variant="contained"
//             color="primary"
//             fullWidth
//             style={{
//               borderRadius: '28px',
//               padding: '10px',
//               textTransform: 'capitalize',
//             }}
//           >
//             Post
//           </Button>
//         </Hidden>
//         <Hidden lgUp>
//           <IconButton
//             onClick={handleModalOpen}
//             variant="contained"
//             color="primary"
//             style={{
//               borderRadius: '28px',
//               padding: '0 15px',
//               textTransform: 'capitalize',
//               textAlign: 'center',
//             }}
//           >
//             <AddCircleOutlineIcon />
//           </IconButton>
//         </Hidden>
//       </Box>
//       {openModal && (
//       // <Modal
//       //   open={openModal}
//       //   handleClose={handleModalClose}
//       //   saveText="Post"
//       //   len={postText.trimStart().length}
//       // >
//       <Box>
//         <Grid container>
//           <Grid item>
//             <img src="/logo.png" alt="logo" width="60px" />
//           </Grid>
//           <Grid item flexGrow="1">
//             <Box padding=".5rem 0">
//               <Input
//                 value={postText}
//                 onChange={(e) => setPostText(e.target.value)}
//                 multiline
//                 rows="2"
//                 disableUnderline
//                 type="text"
//                 placeholder="What's happening?"
//                 sx={{ width: '100%' }}
//               />
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//       // </Modal>
//       )}
//     </>
//   );
// }
