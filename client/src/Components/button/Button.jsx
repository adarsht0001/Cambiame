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
        borderRadius: '28px',
      }}
    >
      {Text}
    </Button>
  );
}

export default Buttons;
