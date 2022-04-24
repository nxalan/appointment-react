import React from 'react'
import { Button } from '@mui/material'
import Styles from './button-styles.scss'

type Props = {
  disabled?: boolean
  variant?: string
  type?: string
  buttonLabel: string
  color?: string
  onClick?: () => void
}

const SubmitButton: React.FC<Props> = (props: Props) => {
  return (
    <>
      {props.type === 'submit' && (
        <div className={Styles.button}>
          <Button
            disabled={props.disabled}
            variant="contained"
            type="submit"
          >
            {props.buttonLabel}
          </Button>
        </div>
      )}

      {props.color === 'error' && (
        <div className={Styles.button}>
          <Button
            disabled={props.disabled}
            variant="contained"
            color="error"
            onClick={props.onClick}
          >
            {props.buttonLabel}
          </Button>
        </div>
      )}
    </>
  )
}

export default SubmitButton
