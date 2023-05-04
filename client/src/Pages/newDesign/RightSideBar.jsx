/* eslint-disable import/no-extraneous-dependencies */
import { Search } from '@mui/icons-material';
import {
  Input, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
// import { Link } from 'react-router-dom';

export default function RightSidebar() {
  const [query, setQuery] = React.useState('');

  return (
    <Box sx={{ height: '100%' }}>
      <Box paddingTop="10px">
        <Box
          width="100%"
          borderRadius="28px"
          border="1px solid #eee"
          position="relative"
          sx={{
            background: '#eee',
          }}
        >
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            inputProps={{
              style: { padding: '10px' },
            }}
            disableUnderline
            fullWidth
            placeholder="Search"
            startAdornment={(
              <Search
                sx={{
                  paddingLeft: '20px',
                  color: '#777',
                }}
              />
            )}
          />
          {query.length !== 0 && (
            <Box
              width="100%"
              sx={{
                backgroundColor: 'white',
                border: '1px solid #eee',
                borderRadius: '28px',
                padding: '1rem 0',
                zIndex: '999',
                maxHeight: '50vh',
                overflowY: 'scroll',
              }}
              position="absolute"
            >
              <Typography sx={{ padding: '0 1rem' }}>
                No users found!
              </Typography>

            </Box>
          )}
        </Box>
        <Box
          sx={{
            background: '#eee',
            borderRadius: '28px',
            padding: '10px 20px',
            margin: '1rem 0',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Who to follow
          </Typography>
          <Box textAlign="center" marginTop="1rem">
            {/* {(userStatus === 'loading' || followingStatus === 'loading') && ( */}
            {/* <CircularProgress size={20} color="primary" /> */}
            {/* )} */}
          </Box>
          {/* {userStatus === 'success' */}
          {/* && showToFollow() */}
          {/* .slice(0, 7) */}
          {/* .map((item) => <WhoToFollow key={item._id} user={item} />)} */}
        </Box>
      </Box>
    </Box>
  );
}
