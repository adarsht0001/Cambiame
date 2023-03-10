import TextField from '@mui/material/TextField';

function Inputfield(props) {
  const { variant, label } = props;
  return (
    <TextField variant={variant} label={label} sx={{ marginLeft: '3px' }} />
  );
}

export default Inputfield;
