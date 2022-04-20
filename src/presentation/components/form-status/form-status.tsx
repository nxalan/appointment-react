import React from 'react'
import { Spinner } from '@/presentation/components'
import Styles from './form-status-styles.scss'

type Props = {
  isLoading: boolean, 
  mainError: string
}

const FormStatus: React.FC<Props> = (props: Props) => {
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {props.isLoading && (<Spinner className={Styles.spinner} />)}
      {props.mainError && <span data-testid="main-error" className={Styles.error}>{props.mainError}</span>}
    </div>
  )
}

export default FormStatus
