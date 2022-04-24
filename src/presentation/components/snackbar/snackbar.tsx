import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {
  return (
    <>
      {props.severity === 'success' && (
      <Snackbar open={props.successSnackbarOpen} autoHideDuration={1500} onClose={props.handleSnackbarSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={props.handleSnackbarSuccessClose} severity="success" sx={{ width: '100%' }}>
          {props.successMessage}
        </Alert>
      </Snackbar>
      )}
      {props.severity === 'error' && (
      <Snackbar open={props.errorSnackbarOpen} autoHideDuration={1500} onClose={props.handleSnackbarErrorClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={props.handleSnackbarErrorClose} severity="error" sx={{ width: '100%' }}>
        {props.errorMessage}
        </Alert>
      </Snackbar>
      )}
    </>
  );
}