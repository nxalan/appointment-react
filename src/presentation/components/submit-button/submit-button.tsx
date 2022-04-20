import React from 'react'
import { Button } from '@mui/material';
import Styles from './submit-button-styles.scss'

type Props = {
  disabled?: boolean
  text: string
}

const SubmitButton: React.FC<Props> = (props: Props) => {

  return (
    <div className={Styles.button}>
      <Button
        data-testid="submit"
        disabled={props.disabled}
        variant="contained"
        type="submit"
      >
        {props.text}
      </Button>
    </div>
  )
}

export default SubmitButton
