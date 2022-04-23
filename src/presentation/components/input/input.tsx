import React from 'react'
import Styles from './input-styles.scss'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { registerLocale } from "react-datepicker";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import pt from "date-fns/locale/pt"

type Props = { [key: string]: any }

const InputText: React.FC<Props> = (props: Props & { inputType: string }) => {
  registerLocale("pt", pt);
  return (
    <>
      {props.type === 'text' && (
        <div className={Styles.textField}>
          <TextField
            variant="outlined"
            fullWidth
            type={props.type}
            name={props.name}
            {...props}
          />
        </div>
      )}

      {props.type === 'date' && (
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

      {props.type === 'dateTime' && (
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

      {props.type === 'radio' && (
        <div className={Styles.radioButton}>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">{props.title}</FormLabel>
            <RadioGroup
              row
              aria-labelledby="controlled-radio-buttons-group"
              name="controlled-radio-button"
              value={props.value}
              onChange={props.onChange}
            >
              {props.radioLabels.map((el) => (
                <FormControlLabel
                  value={el.value}
                  control={<Radio />}
                  label={el.label}
                  disabled={props.disabled} />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      )}

      {props.type === 'multiline' && (
        <div className={Styles.multilineField}>
          <TextField
            id="outlined-multiline-static"
            label={props.label}
            multiline
            fullWidth
            rows={props.rows}
            defaultValue=""
          />
        </div>
      )}
    </>
  )
}

export default (InputText)
