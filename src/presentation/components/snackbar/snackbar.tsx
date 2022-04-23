import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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
      <Snackbar open={props.successMessage} autoHideDuration={3000} onClose={props.handleSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={props.handleSuccessClose} severity="success" sx={{ width: '100%' }}>
          Agendamento excluido com sucesso! Redirecionando para a página principal
        </Alert>
      </Snackbar>
      <Snackbar open={props.errorMessage} autoHideDuration={3000} onClose={props.handleErrorClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={props.handleErrorClose} severity="error" sx={{ width: '100%' }}>
          Erro ao excluir agendamento!
        </Alert>
      </Snackbar>
    </>
  );
}