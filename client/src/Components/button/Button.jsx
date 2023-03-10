import Button from '@mui/material/Button';

function Buttons(props) {
  const { variant, type } = props;
  return (
    <Button
      variant={variant}
      type={type}
      sx={{
        bgcolor: 'primary.main',
        // borderRadius: '28px',
        // background: '#00000',
        // boxShadow: ' -1px -1px 100px #4e4e4e,1px 1px 100px #121212',
      }}
    >
      Text

    </Button>
  );
}

export default Buttons;
