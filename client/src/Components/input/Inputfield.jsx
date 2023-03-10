import TextField from '@mui/material/TextField';

function Inputfield(props) {
  const {
    variant, label, type, value, callback, size,
  } = props;
  return (
    <TextField variant={variant} label={label} size={size} type={type} sx={{ marginLeft: '3px' }} style={{ marginBlock: '1rem' }} value={value} onChange={callback} color="warning" />
  );
}

export default Inputfield;
