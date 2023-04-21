/* eslint-disable no-nested-ternary */
import {
  Autocomplete,
  Box, Grid, InputAdornment, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GrClose, GrSearch } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import axios from '../../Axios/axios';
import SearchResults from './SearchResults';

function Search() {
  const [value, setValue] = useState('');
  const [users, setUser] = useState([]);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [notfound, setnotFound] = useState(false);
  const user = useSelector((state) => state.user);

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
    axios.get(`/search-user/${username}/${user.id}`).then((res) => {
      setResults(res.data);
    }).catch((err) => {
      setSearched(false);
      setnotFound(err.response?.data?.msg);
    });
  };

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
                <SearchResults key={userData.username} userData={userData} />
              ))}
            </Box>
          </>
        )
        : notfound ? <Typography variant="h5">{notfound}</Typography> : ''}
      <Box />
    </Grid>
  );
}

export default Search;
