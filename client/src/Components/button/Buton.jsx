import React from 'react';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';

function Buton() {
  return (
    <Container>
      <Button />
      <Button variant="outlined" disableElevation>
        Disable elevation
      </Button>
    </Container>
  );
}

export default Buton;
