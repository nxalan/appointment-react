import React from 'react'
import { Spinner } from '@/presentation/components'
import Styles from './form-status-styles.scss'

type Props = {
  isLoading: boolean, 
  hasError: boolean,
  message: string
}

const FormStatus: React.FC<Props> = (props: Props) => {
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {props.isLoading && (<Spinner className={Styles.spinner} />)}
      {props.hasError && <span data-testid="main-error" className={Styles.error}>{props.message}</span>}
      {!props.hasError && <span data-testid="main-success" className={Styles.success}>{props.message}</span>}
    </div>
  )
}

export default FormStatus
