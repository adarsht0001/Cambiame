import React from 'react'
import Button from '@mui/material/Button';

const Buton = ({value}) => {
  return (
    <Button variant="outlined" { value ?alert():alert('j')} disableElevation>
      Disable elevation
    </Button>
  );
}

export default Buton
