import TextField from '@mui/material/TextField';

function Inputfield(props) {
  const {
    variant, label, type, value, callback, size, err, helper, InputProps, disabled,
    focused, defaultValue, fullWidth, placeholder,
  } = props;
  return (
    <TextField variant={variant} placeholder={placeholder} fullWidth={fullWidth} disabled={disabled} focused={focused} defaultValue={defaultValue} InputProps={InputProps} label={label} error={err} size={size} type={type} sx={{ marginLeft: '3px' }} style={{ marginBlock: '1rem' }} value={value} onChange={callback} color="warning" helperText={helper} />
  );
}

export default Inputfield;
