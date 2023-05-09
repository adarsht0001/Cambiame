/* eslint-disable react/no-array-index-key */
import {
  Box, Button, TextField,
} from '@mui/material';
import React from 'react';
import { Stack } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';

function Test() {
  return (
    <>
      <Box
        sx={{
          height: '80vh',
          bgcolor: '#ccd5cc',
          overflowX: 'hidden',
          padding: 5,
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'gray',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'darkgray',
          },
        }}
      >
        {[1, 2, 3, 8, 8, 6, 8, 8, 8, 88, 8, 8, 8, 8, 8, 8, 8, 8, 8,
          8, 8, 8, 8, 8]?.map((item, index) => (
            <div
              id="scroll"
              key={index}
            >
              <Message />
            </div>
        ))}
      </Box>
      <Stack direction="row">
        <TextField
          id="outlined-multiline-flexible"
          multiline
          maxRows={4}
          fullWidth
          size="small"
        />
        <Button
          variant="contained"
          sx={{ bgcolor: '#3b71ca' }}
          endIcon={<SendIcon />}
        />
      </Stack>
    </>
  );
}

export default Test;

// <Box
//   height="60vh"
//   textAlign="center"
//   pt="30vh"
//   width="100%"
// >
//   <Typography variant="h4" color="#D3D3D3">
//     start a chat now
//   </Typography>
// </Box>
