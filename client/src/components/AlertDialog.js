import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ dialogOpen, toggleDialog, deleteTodo }) {

  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={() => toggleDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This note will be deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleDialog(false)}>Cancel</Button>
          <Button variant='contained' color='error' onClick={() => deleteTodo()} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}