import React from 'react'
import Styles from './input-styles.scss'
import { TextField } from '@mui/material';
import { registerLocale } from "react-datepicker";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import pt from "date-fns/locale/pt"

type Props = { [key: string]: any }

const InputText: React.FC<Props> = (props: Props & { inputType: string }) => {
  registerLocale("pt", pt);
  const componentType = props.inputType
  delete props.inputType;
  return (
    <>
      {componentType === 'text' && (
        <div className={Styles.textField}>
          <TextField
            variant="outlined"
            fullWidth
            type={props.type}
            {...props}
          />
        </div>
      )}

      {componentType === 'date' && (
        <div className={Styles.dateField}>
          <LocalizationProvider locale={pt} dateAdapter={AdapterDateFns}>
            <DatePicker
              label={props.label}
              value={props.value}
              onChange={props.onChange}
              {...props}
              renderInput={(params) =>
                <TextField
                  {...params}
                  name={props.name}
                  onBlur={props.onBlur}
                  required={props.required}
                  error={props.error}
                  helperText={props.helperText}
                  fullWidth
                />}
            />
          </LocalizationProvider>
        </div>
      )}

      {componentType === 'dateTime' && (
        <div className={Styles.dateField}>
          <LocalizationProvider locale={pt} dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label={props.label}
              value={props.value}
              onChange={props.onChange}
              {...props}
              renderInput={(params) =>
                <TextField
                {...params}
                name={props.name}
                onBlur={props.onBlur}
                fullWidth
                error={props.error}
                helperText={props.helperText}
                required={props.required}
                />}
            />
          </LocalizationProvider>
        </div>
      )}

    </>
  )
}

export default (InputText)
