/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Styles from './add-appointment-styles.scss'
import { Footer, Header, Input, SubmitButton, FormStatus } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { AddAppointment, SaveLocalStorage } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAppointment: AddAppointment
  saveLocalStorage: SaveLocalStorage
}

const AddAppointment: React.FC<Props> = ({ validation, addAppointment, saveLocalStorage }: Props) => {
  const history = useHistory()
  const [date, setDate] = useState(null)
  const [dateTime, setDateTime] = useState(null)
  return (
    <div className={Styles.root}>
      <div className={Styles.headerBase}>
        <Header />
      </div>
      <div className={Styles.centerBase}>
        <form data-testid="form" className={Styles.form}>
          <h2>Criar Novo Agendamento</h2>
          <Input
            inputType='text'
            type="text"
            fullWidth
            name="name"
            label="Nome"
            required
            placeholder="Digite seu nome"
          />
          <Input
            inputType='date'
            value={date}
            onChange={(value) => setDate(value)}
            label="Data de Nascimento"
            placeholder="ex: DD/MM/AAAA"
            required
          />
          <Input
            inputType='dateTime'
            value={dateTime}
            onChange={(value) => setDateTime(value)}
            label="Data de Agendamento"
            placeholder="ex: DD/MM/AAAA"
            required
          />
          <SubmitButton
            disabled={false}
            text="Cadastrar"
          />
          <FormStatus
            isLoading={false}
            mainError={undefined}
          />
          <Link data-testid="login-link" replace to="/login" className={Styles.link}>Voltar Para Agendamentos</Link>
        </form>
      </div>
      <div className={Styles.footerBase}>
        <Footer />
      </div>
    </div>
  )
}

export default AddAppointment
