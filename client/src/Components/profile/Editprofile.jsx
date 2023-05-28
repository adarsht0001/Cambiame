import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import Draggable from 'react-draggable';

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

export default function Editprofile({
  children,
  open,
  handleClose,
  handleSave,
  saveText,
}) {
  const handleClick = () => {
    handleSave();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        <Box display="flex" justifyContent="space-between" textAlign="right" borderBottom="1px solid #ccc">
          <Box>Edit Profile</Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleClick}
        >
          {saveText}
        </Button>
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={handleClose}
        >
          cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
