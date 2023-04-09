import Avatar from '@mui/material/Avatar';

function PictureAvatar(props) {
  const {
    image, name, width, height,
  } = props;
  return (
    <Avatar alt={name} src={image} sx={{ width, height }} />
  );
}

export default PictureAvatar;
