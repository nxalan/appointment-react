/* eslint-disable no-unused-vars */
import React from 'react'
import { Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

type Props = {
  open: boolean
  onClose: (event: React.SyntheticEvent<Element, Event>) => void
  message: string
  severity: string
}

export default function CustomizedSnackbars (props: Props) {
  return (
    <>
      {props.severity === 'success' && (
        <Snackbar open={props.open} autoHideDuration={1500} onClose={props.onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={props.onClose} severity="success" sx={{ width: '100%' }}>
            {props.message}
          </Alert>
        </Snackbar>
      )}
      {props.severity === 'error' && (
        <Snackbar open={props.open} autoHideDuration={1500} onClose={props.onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={props.onClose} severity="error" sx={{ width: '100%' }}>
            {props.message}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}
