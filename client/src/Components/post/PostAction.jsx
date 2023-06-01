import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import {
  CircularProgress, Grid, TextField,
} from '@mui/material';
import { toast } from 'react-hot-toast';
import axios from '../../Axios/axios';
import EditPost from './EditPost';

export default function PostActions({
  postid, isUser, callback, post,
}) {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [caption, setCaption] = React.useState(post?.caption);
  const open = Boolean(anchorEl);
  const user = useSelector((state) => state.user);
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleReport = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.put(`/post/report/${user.id}/${postid}`, {}, {
      headers: {
        authorization: `Bearer ${user.access_Token}`,
      },
    }).then((response) => {
      toast.success(response.data.msg);
      setLoading(false);
      setAnchorEl(null);
    }).catch((err) => {
      toast.error(err.response.data.msg);
      setLoading(false);
    });
  };

  const handleEdit = () => {
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('file', image);
    axios.put(`/post/edit-post/${postid}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.access_Token}`,
      },
    }).then((res) => {
      toast.success(res.data.msg);
      callback();
      setAnchorEl(null);
    });
  };
  const handleClose = (e) => {
    e.preventDefault();
    setAnchorEl(null);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`/post/delete-post/${postid}`, {
      headers: {
        authorization: `Bearer ${user.access_Token}`,
      },
    }).then(() => {
      toast.success('post deleted');
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
            <>
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
              <MenuItem onClick={(e) => {
                e.preventDefault();
                setEdit(true);
              }}
              >
                {loading ? (
                  <CircularProgress
                    color="secondary"
                    size={20}
                    thickness={4}
                    value={100}
                  />
                ) : 'Edit'}
              </MenuItem>
            </>
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
      {edit && (
      <EditPost
        open={edit}
        handleClose={(e) => {
          e.preventDefault();
          setEdit(false);
        }}
        handleSave={handleEdit}
        saveText="Edit Post"
      >
        <Grid width="100%" textAlign="center" p={2}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            label="Caption"
            size="small"
            fullWidth
            onChange={(e) => setCaption(e.target.value)}
            name="email"
            defaultValue={caption}
          />
        </Grid>
        <Grid width="100%" textAlign="center" p={2}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="file"
            size="small"
            focused
            fullWidth
            label="image"
            inputProps={{
              multiple: false,
            }}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </Grid>

      </EditPost>
      )}
    </>
  );
}
