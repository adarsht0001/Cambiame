import Avatar from '@mui/material/Avatar';

function PictureAvatar(props) {
  const { image, name } = props;
  return (
    <Avatar alt={name} src={image} />
  );
}

export default PictureAvatar;
