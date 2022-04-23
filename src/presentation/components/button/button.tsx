import React from 'react'
import { Button } from '@mui/material';
import Styles from './button-styles.scss'

type Props = { [key: string]: any }

const SubmitButton: React.FC<Props> = (props: Props) => {

  return (
    <>
    {props.type === "submit" && (
    <div className={Styles.button}>
      <Button
        disabled={props.disabled}
        variant="contained"
        type={"submit"}
      >
        {props.text}
      </Button>
    </div>
    )}

  {props.type === "error" && (
    <div className={Styles.button}>
      <Button
        disabled={props.disabled}
        variant="contained"
        color="error"
        onClick={props.onClick}
      >
        {props.text}
      </Button>
    </div>
    )}
    </>
  )
}

export default SubmitButton
