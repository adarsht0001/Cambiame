import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

function LoadingPost() {
  return (
    [1, 2, 3, 4, 5, 6].map((e) => (
      <Card
        sx={{ padding: '2rem', bgcolor: '#D3D3D3', m: '5px' }}
        key={e}
      >
        <CardHeader
          avatar={
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
      }
          title={(
            <Skeleton
              animation="wave"
              height={10}
              width="50%"
              style={{ marginBottom: 6 }}
            />
        )}
          subheader={
            <Skeleton animation="wave" height={10} width="40%" />
      }
        />
        <CardContent>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        </CardContent>
        {
          e % 2 === 0
          && <Skeleton sx={{ height: 150 }} animation="wave" variant="rectangular" />
        }
      </Card>
    ))

  );
}

export default LoadingPost;
