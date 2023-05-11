/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import { Search } from '@mui/icons-material';
import {
  Grid,
  Input, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../Axios/axios';
// import SearchResult from './SearchFollow';
import WhoToFollow from './SearchFollow';

export default function RightSidebar() {
  const [query, setQuery] = useState('');
  const [users, setUser] = useState([]);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [notfound, setnotFound] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/search?name=${query}`).then((res) => {
      setUser(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [query]);

  useEffect(() => {}, [results, searched, notfound]);

  const handleSearch = () => {
    const username = query || undefined;
    setSearched(username);
    axios.get(`/search-user/${username}/${user.id}`).then((res) => {
      setResults(res.data);
      setQuery('');
    }).catch((err) => {
      setSearched(false);
      setnotFound(err.response?.data?.msg);
    });
  };

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
                onClick={() => handleSearch()}
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
          {query.length !== 0 && users.length === 0 && (
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
          {users.map((data) => (
            <Box key={user._id} onClick={() => navigate(`/profile/${data}`)}>
              <Link
                // onClick={() => setQuery('')}
                style={{ textDecoration: 'none' }}
                // to={`/profile/${data}`}
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
                  {/* <Grid item sx={{ paddingRight: '12px' }}>
                    <img src="/logo.png" width="50px" alt="logo" />
                  </Grid> */}
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
                        <Box display="flex" alignItems="center">
                          <Typography
                            sx={{
                              fontSize: '14px',
                              mr: '6px',
                              color: '#555',
                            }}
                          >
                            {user.handle}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Link>
            </Box>
          ))}
        </Box>
        {searched && results ? (
          <Box
            sx={{
              background: '#eee',
              borderRadius: '28px',
              padding: '10px 20px',
              margin: '1rem 0',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Search Result For
              {' '}
              {searched}
            </Typography>
            <Box textAlign="center" marginTop="1rem">
              {/* {(userStatus === 'loading' || followingStatus === 'loading') && ( */}
              {/* <CircularProgress size={20} color="primary" /> */}
              {/* )} */}
            </Box>
            {results.map((userData) => (
              <WhoToFollow user={userData} />
            ))}
          </Box>
        ) : notfound ? (
          <Typography variant="h5">{notfound}</Typography>
        ) : ''}

      </Box>
    </Box>
  );
}
