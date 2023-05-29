import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import Draggable from 'react-draggable';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Logout } from '../../../Redux';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function Blocked({
  children,
  open,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(Logout());
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    navigate('/login');
  };
  return (
    <Dialog
      open={open}
      onClose={handleClick}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        <Box display="flex" justifyContent="space-between" textAlign="right" borderBottom="1px solid #ccc">
          <Box>Alert!!</Box>
        </Box>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={handleClick}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
