/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Styles from './add-appointment-styles.scss'
import { Footer, Header, Input, SubmitButton, FormStatus } from '@/presentation/components'
import { AddAppointment, LoadRestrictedDates } from '@/domain/usecases'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup';
import { getHours, isSameDay } from 'date-fns'

const AddAppointmentSchema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  birthday: Yup.date().required("Campo obrigatório").typeError('Digite uma data válida').default(null),
  appointment_date: Yup.date().required("Campo obrigatório").typeError('Digite uma data válida')
})

type Props = {
  addAppointment: AddAppointment
  loadRestrictedDates: LoadRestrictedDates
}

const AddAppointment: React.FC<Props> = ({ addAppointment, loadRestrictedDates }: Props) => {
  const [restrictedDates, setRestrictedDates] = useState({
    restrictedDays: [],
    restrictedHours: []
  })

  let selectedDay = useRef(null)

  useEffect(() => {
    loadRestrictedDates.loadDates().then((dates) => {
      setRestrictedDates(dates)
    })
  }, [])

  function disabledDays(date) {
    let disabledDay = false
    restrictedDates.restrictedDays.forEach((actualDate) => {
      disabledDay = isSameDay(new Date(date), new Date(actualDate))
    })
    return disabledDay;
  }

  function disabledHours(date) {
    let disabledHour = false
    if (selectedDay.current && selectedDay.current.value) {
      const formatedDay = selectedDay.current.value.substr(3, 2)+"/"+selectedDay.current.value.substr(0, 2)+"/"+selectedDay.current.value.substr(6, 4)
      const RestrictedDatesInTheSameDay = restrictedDates.restrictedHours.filter((actualDate) => (
        isSameDay(new Date(formatedDay), new Date(actualDate))
      ))
      RestrictedDatesInTheSameDay.forEach((actualDate) => {
        if (getHours(new Date(actualDate)) === date){
          disabledHour = true
        }
      })
    }
    return disabledHour;
  }

  const handleSubmit = async (values: any, actions: FormikHelpers<any>): Promise<void> => {
    try {
      const appointment = await addAppointment.add({
        name: values.name,
        birthday: new Date(values.birthday).toISOString(),
        appointment_date: new Date(values.appointment_date).toISOString(),
      })
      actions.setStatus({ success: true, message: "Agendamento criado com sucesso!" })
      actions.setSubmitting(false)
      actions.resetForm()

    } catch (error) {
      actions.setSubmitting(false)
      actions.setStatus({ success: false, message: `Erro: ${error}` })
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

          onSubmit={(values, actions: FormikHelpers<any>) => {
            handleSubmit(values, actions)
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
                inputRef={selectedDay}
                inputType='dateTime'
                name="appointment_date"
                value={props.values.appointment_date}
                onChange={(value) => { props.setFieldValue('appointment_date', value); }}
                label="Data de Agendamento"
                onBlur={props.handleBlur}
                shouldDisableDate={disabledDays}
                shouldDisableTime={disabledHours}
                minTime={new Date(0, 0, 0, 0, 0)}
                maxTime={new Date(0, 0, 0, 23, 0)}
                inputFormat='dd/MM/yyyy hh:00'
                views={['year', 'month', 'day', 'hours']}
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
