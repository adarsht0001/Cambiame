import Button from '@mui/material/Button';

function Buttons(props) {
  const {
    variant, type, Text, size, callback, color = 'primary.main',
  } = props;

  return (
    <Button
      size={size}
      variant={variant}
      type={type}
      onClick={callback}
      sx={{
        bgcolor: color,
        // borderRadius: '28px',
        // background: '#00000',
        // boxShadow: ' -1px -1px 100px #4e4e4e,1px 1px 100px #121212',
      }}
    >
      {Text}
    </Button>
  );
}

export default Buttons;
