/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import { useHistory } from 'react-router-dom'
import Styles from './add-appointment-styles.scss'
import { Footer, Header } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { AddAppointment, SaveLocalStorage } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAppointment: AddAppointment
  saveLocalStorage: SaveLocalStorage
}

const AddAppointment: React.FC<Props> = ({ validation, addAppointment, saveLocalStorage }: Props) => {
  const history = useHistory()

  return (
    <div className={Styles.root}>
      <div className={Styles.headerBase}>
        <Header />
      </div>
      <div className={Styles.centerBase}>
      </div>
      <div className={Styles.footerBase}>
        <Footer />
      </div>
    </div>
  )
}

export default AddAppointment
