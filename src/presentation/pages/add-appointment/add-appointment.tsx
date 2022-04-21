/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Styles from './add-appointment-styles.scss'
import { Footer, Header, Input, SubmitButton, FormStatus } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { AddAppointment, SaveLocalStorage } from '@/domain/usecases'
import { Formik } from 'formik'
import * as Yup from 'yup';

type Props = {
  validation: Validation
  addAppointment: AddAppointment
  saveLocalStorage: SaveLocalStorage
}

const AddAppointmentSchema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  birthday: Yup.date().required("Campo obrigatório").typeError('Digite uma data válida').default(null),
  appointment_date: Yup.date().required("Campo obrigatório").typeError('Digite uma data válida')
})

const AddAppointment: React.FC<Props> = ({ validation, addAppointment, saveLocalStorage }: Props) => {
  const history = useHistory()

  const handleSubmit = async (values: any, setStatus: Function, setIsSubmitting: Function): Promise<void> => {
    try {
      const appointment = await addAppointment.add({
        name: values.name,
        birthday: new Date(values.birthday),
        appointment_date: new Date(values.appointment_date)
      })
      await saveLocalStorage.save(appointment.id)
      setStatus({ success: true , message: "Agendamento criado com sucesso! Redirecionando para a tela de edição" })
      setTimeout(() => {
        setIsSubmitting(false)
        history.push(`/${appointment.id}`)
      }, 3000);
    } catch (error) {
      console.log(error)
      setIsSubmitting(false)
      setStatus({ success: false , message: `Erro: ${error}` })
    }
  }

  
  return (
    <div className={Styles.root}>
      <div className={Styles.headerBase}>
        <Header />
      </div>
      <div className={Styles.centerBase}>
        <Formik
          initialValues={{ name: '', birthday: null, appointment_date: null }}
          validationSchema={AddAppointmentSchema}
          validateOnMount
          
          onSubmit={(values, actions) => {
            handleSubmit(values, actions.setStatus, actions.setSubmitting)
          }}
        >
          {props => (
            <form data-testid="form" className={Styles.form} onSubmit={props.handleSubmit}>
              <h2>Criar Novo Agendamento</h2>
              <Input
                disabled={props.isSubmitting}
                inputType='text'
                type="text"
                fullWidth
                name="name"
                label="Nome"
                required
                placeholder="Digite seu nome"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                error={props.touched.name && props.errors?.name}
                helperText={props.touched.name && props.errors?.name}
              />
              <Input
                disabled={props.isSubmitting}
                inputType='date'
                name="birthday"
                value={props.values.birthday}
                onChange={(value) => { props.setFieldValue('birthday', value); }}
                label="Data de Nascimento"
                onBlur={props.handleBlur}
                error={props.touched.birthday && props.errors.birthday}
                helperText={props.touched.birthday && props.errors.birthday}
                required
              />
              <Input
                disabled={props.isSubmitting}
                inputType='dateTime'
                name="appointment_date"
                value={props.values.appointment_date}
                onChange={(value) => { props.setFieldValue('appointment_date', value); }}
                label="Data de Agendamento"
                onBlur={props.handleBlur}
                error={props.touched.appointment_date && props.errors.appointment_date}
                helperText={props.touched.appointment_date && props.errors.appointment_date}
                required
              />
              <SubmitButton
                disabled={!props.isValid}
                text="Cadastrar"
              />
              <FormStatus
                isLoading={props.isSubmitting}
                hasError={!props.status?.success}
                message={props.status?.message}
              />
              <Link data-testid="login-link" to="/login" className={Styles.link}>Voltar Para Agendamentos</Link>
            </form>
          )}
        </Formik>
      </div>
      <div className={Styles.footerBase}>
        <Footer />
      </div>
    </div>
  )
}

export default AddAppointment
