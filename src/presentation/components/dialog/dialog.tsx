import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = { [key: string]: any }

export default function AlertDialog(props: Props) {

  const handleClose = () => {
    props.closeDialog(false);
  };

  return (
    <div>
      <Dialog
        open={props.dialogStatus}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="dialog-box">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error" >CANCELAR</Button>
          <Button onClick={props.handleConfirm} variant="contained" color="success" autoFocus>CONFIRMAR</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}