import React from 'react'
import Button from '@mui/material/Button'
import { Dialog } from '@mui/material'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

type Props = {
  message: string
  open: boolean
  closeDialog: React.Dispatch<React.SetStateAction<boolean>>
  handleConfirm: () => Promise<void>
  title: string
}

export default function AlertDialog (props: Props) {
  const handleClose = () => {
    props.closeDialog(false)
  }

  return (
    <div>
      <Dialog
        open={props.open}
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
  )
}
