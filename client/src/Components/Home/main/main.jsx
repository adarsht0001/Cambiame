/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Postshare from './Postshare';
import Posts from './Posts';
import axios from '../../../Axios/axios';

function Main() {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    axios.get('/get-post').then((response) => {
      setPosts(response.data);
    });
  }, [refresh]);

  return (
    <Grid container alignItems="center" direction="column">
      <Postshare callback={() => {
        setRefresh(!refresh);
      }}
      />
      {posts.map((post) => (
        <Posts data={post} key={post._id} />
      ))}
      {/* // <Postshare />
// <Postshare /> */}

    </Grid>
  );
}

export default Main;
