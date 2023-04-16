/* eslint-disable react/jsx-props-no-spreading */
import {
  Autocomplete,
  Box, Grid, InputAdornment, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GrClose, GrSearch } from 'react-icons/gr';
import axios from '../../Axios/axios';
import BackgroundLetterAvatars from '../../Components/avatar/StringAvatar';
import Buttons from '../../Components/button/Button';

function Search() {
  const [value, setValue] = useState('');
  const [users, setUser] = useState([]);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  useEffect(() => {
    axios.get(`/search?name=${value}`).then((res) => {
      setUser(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [value]);

  const handleInputChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearch = () => {
    const username = value || undefined;
    setSearched(username);
    axios.get(`/search-user/${username}`).then((res) => {
      setResults(res.data);
    }).catch((err) => {
      setSearched(false);

      console.log('catch');
      console.log(err.response.data.msg);
    });
  };
  useEffect(() => {
    console.log(results);
  }, [results]);
  return (
    <Grid container alignItems="center" direction="column">
      <Box
        fullwidth="true"
        sx={{
          m: 1, width: '40%', padding: '30px', marginX: 'auto', marginTop: '4%',
        }}
        variant="standard"
      >

        <Autocomplete
          options={users}
          inputValue={value}
          onInputChange={handleInputChange}
          noOptionsText="No user Found"
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Search"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    <InputAdornment position="end">
                      <GrClose
                        style={{ marginRight: '5px', cursor: 'pointer' }}
                        onClick={() => setValue('')}
                      />
                    </InputAdornment>
                    <InputAdornment position="start">
                      <GrSearch style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={handleSearch} />
                    </InputAdornment>
                  </>
                ),
              }}
            />
          )}
        />
      </Box>
      {searched
        ? (
          <>
            <Typography>
              Showing Result for:
              {searched}
            </Typography>
            <Box width="50%" alignSelf="center">
              {results.map((userData) => (
                <Box width="100%" key={userData.username} m={2} sx={{ bgcolor: 'red' }} display="flex" flexDirection="row" justifyContent="space-between" p={5}>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <BackgroundLetterAvatars user={userData.username || 'user'} />
                    <Box marginLeft={4}>
                      <Typography variant="h6">{userData.username}</Typography>
                      <Typography variant="caption">
                        {userData.email}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Buttons size="medium" variant="contained" color="primary" Text="Message" />
                    <Buttons size="medium" variant="contained" color="primary" Text="Follow" />
                  </Box>
                </Box>
              ))}
            </Box>
          </>
        )
        : ''}
      <Box />
    </Grid>
  );
}

export default Search;
