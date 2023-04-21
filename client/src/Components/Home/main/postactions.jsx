import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import axios from '../../../Axios/axios';

export default function LongMenu({ postid, isUser, callback }) {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const open = Boolean(anchorEl);
  const user = useSelector((state) => state.user);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleReport = () => {
    setLoading(true);
    axios.put(`/report/${user.id}/${postid}`, {}, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${user.access_Token}`,
      },
    }).then((response) => {
      alert(response.data.msg);
      setLoading(false);
      setAnchorEl(null);
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    axios.delete(`/delete-post/${postid}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${user.access_Token}`,
      },
    }).then(() => {
      callback();
      setAnchorEl(null);
    }).catch((err) => console.log(err));
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '20ch',
          },
        }}
      >
        {isUser
          ? (
            <MenuItem onClick={handleDelete}>
              {loading ? (
                <CircularProgress
                  color="secondary"
                  size={20}
                  thickness={4}
                  value={100}
                />
              ) : 'Delete'}
            </MenuItem>
          ) : (
            <MenuItem onClick={handleReport}>
              {loading ? (
                <CircularProgress
                  color="secondary"
                  size={20}
                  thickness={4}
                  value={100}
                />
              ) : 'Report'}
            </MenuItem>
          )}
      </Menu>
    </>
  );
}
