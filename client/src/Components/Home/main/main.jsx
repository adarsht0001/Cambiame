/* eslint-disable no-underscore-dangle */
import React, { Suspense, useEffect, useState } from 'react';
import { Grid, Skeleton } from '@mui/material';
import Postshare from './Postshare';
// import Posts from './Posts';
import axios from '../../../Axios/axios';

function Main() {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const Posts = React.lazy(() => import('./Posts'));
  useEffect(() => {
    axios.get('/post').then((response) => {
      setPosts(response.data);
    });
  }, [refresh]);

  return (
    <Grid container alignItems="center" direction="column" xs={12}>
      <Postshare callback={() => {
        setRefresh(!refresh);
      }}
      />
      {posts.map((post) => (
        <Suspense
          key={post._id}
          fallback={(
            <>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
            </>
)}
        >
          <Posts
            data={post}
            callback={() => {
              setRefresh(!refresh);
            }}
          />
        </Suspense>
      ))}
    </Grid>
  );
}

export default Main;
