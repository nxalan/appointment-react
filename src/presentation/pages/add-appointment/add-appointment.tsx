/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Context from '@/presentation/contexts/form/form-context'
import Styles from './add-appointment-styles.scss'
import { Footer, Input, FormStatus, Header, SubmitButton } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { AddAppointment, SaveLocalStorage } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAppointment: AddAppointment
  saveLocalStorage: SaveLocalStorage
}

const AddAppointment: React.FC<Props> = ({ validation, addAppointment, saveLocalStorage }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    birthday: '',
    appointment_date: '',
    nameError: '',
    birthdayError: '',
    appointment_dateError: '',
    mainError: ''
  })

  useEffect(() => {
    const { name, birthday, appointment_date } = state
    const formData = { name, birthday, appointment_date }
    const nameError = validation.validate('name', formData)
    const birthdayError = validation.validate('birthday', formData)
    const appointment_dateError = validation.validate('appointment_date', formData)

    setState((prevState) => ({
      ...prevState,
      nameError,
      birthdayError,
      appointment_dateError,
      isFormInvalid: !!nameError || !!birthdayError || !!appointment_dateError
    }))
  }, [state.name, state.birthday, state.appointment_date])

  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState((prevState) => ({
        ...prevState,
        isLoading: true
      }))
      const appointment = await addAppointment.add({
        name: state.name,
        birthday: state.birthday as unknown as Date,
        appointment_date: state.appointment_date as unknown as Date,
      })
      await saveLocalStorage.save(appointment.id)
      history.replace('/')
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <div className={Styles.addAppointment}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="text" name="birthday" placeholder="Digite sua data de nascimento" />
          <Input type="text" name="appointment_date" placeholder="Digite seu horário de agendamento" />
          <SubmitButton text="Cadastrar" />
          <Link data-testid="appointments-link" replace to="/appointments" className={Styles.link}>Voltar Para Agendamentos</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default AddAppointment
