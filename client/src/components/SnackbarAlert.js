import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SnackbarAlert({ title, type, open, handleSnackbar }) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    handleSnackbar({  open: false, title: "", type: "" })
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {title}
        </Alert>
      </Snackbar>
    </div>
  );
}