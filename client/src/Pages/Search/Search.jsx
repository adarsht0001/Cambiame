/* eslint-disable react/jsx-props-no-spreading */
import {
  Autocomplete,
  Box, Grid, InputAdornment, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GrClose, GrSearch } from 'react-icons/gr';
import axios from '../../Axios/axios';

function Search() {
  const [value, setValue] = useState('');
  const [users, setUser] = useState([]);
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
    alert(value);
  };
  return (
    <Grid container alignItems="center" direction="column">
      <Box
        fullWidth
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
      <Typography>
        Showing Result for:
        {value}
      </Typography>
      <Box />
    </Grid>
  );
}

export default Search;
