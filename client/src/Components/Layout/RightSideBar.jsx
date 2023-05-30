import { Search } from '@mui/icons-material';
import {
  Grid,
  Input, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../Axios/axios';

export default function RightSidebar() {
  const [query, setQuery] = useState('');
  const [users, setUser] = useState([]);

  useMemo(() => {
    if (query.length > 0) {
      axios.get(`/search?name=${query}`).then((res) => {
        setUser(res.data);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, [query]);

  return (
    <Box sx={{ height: '100%' }}>
      <Box paddingY="10px">
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
            placeholder="Search For Users"
            startAdornment={(
              <Search
                sx={{
                  paddingLeft: '20px',
                  color: '#777',
                  ':hover': {
                    cursor: 'pointer',
                  },
                }}
              />
            )}
          />
          {query?.length !== 0 && query !== null && users?.length === 0 && (
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
          {users?.map((data, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={i}>
              <Link
                onClick={() => {
                  setQuery('');
                  setUser([]);
                }}
                style={{ textDecoration: 'none' }}
                to={`/profile/${data}`}
              >
                <Grid
                  sx={{
                    overflow: 'hidden',
                    padding: '.2rem 1rem',
                    '&:hover': {
                      backgroundColor: '#eee',
                    },
                  }}
                  container
                  alignItems="center"
                >
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: '16px',
                            fontWeight: '500',
                            color: '#000',
                          }}
                        >
                          {data}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
