import React from 'react'
import Button from '@mui/material/Button'
import { Dialog } from '@mui/material'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Input } from '../.'

type Props = {
  message: string
  open: boolean
  closeDialog: React.Dispatch<React.SetStateAction<boolean>>
  handleConfirm?: () => Promise<void>
  title: string
  type: string
}

export default function AlertDialog(props: Props) {
  const handleClose = () => {
    props.closeDialog(false)
  }

  return (
    <>
      {props.type === "dialogConfirmation" && (
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
            <Button onClick={handleClose} variant="contained" color="error" >FECHAR</Button>
            <Button onClick={props.handleConfirm} variant="contained" color="success" autoFocus>CONFIRMAR</Button>
          </DialogActions>
        </Dialog>
      )}

      {props.type === "dialogInformation" && (
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
          <Input
            name="status_comment"
            type="multiline"
            label="Conclusão do atendimento"
            value={props.message}
            rows={4}
            disabled={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error" >FECHAR</Button>
        </DialogActions>
      </Dialog>
      )}
    </>
  )
}
