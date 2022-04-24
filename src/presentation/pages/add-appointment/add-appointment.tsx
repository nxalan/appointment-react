/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Styles from './add-appointment-styles.scss'
import { Footer, Header, Input, Button, FormStatus } from '@/presentation/components'
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
  const [formStatus, setFormStatus] = useState({
    error: undefined,
    message: undefined
  })
  const [refresh, setRefresh] = useState(0)
  let inputRef = useRef(null)

  useEffect(() => {
    loadRestrictedDates.loadDates().then((dates) => {
      setRestrictedDates(dates)
    })
  }, [refresh])

  function disabledDays(date) {
    let disabledDay = false
    restrictedDates.restrictedDays.forEach((actualDate) => {
      disabledDay = isSameDay(new Date(date), new Date(actualDate))
    })
    return disabledDay;
  }

  function disabledHours(date) {
    let disabledHour = false
    if (inputRef.current && inputRef.current.value) {
      const formatedDay = inputRef.current.value.substr(3, 2)+"/"+inputRef.current.value.substr(0, 2)+"/"+inputRef.current.value.substr(6, 4)
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
      await addAppointment.add({
        name: values.name,
        birthday: new Date(values.birthday).toISOString(),
        appointment_date: new Date(values.appointment_date).toISOString(),
      })
      setFormStatus({ error: false, message: `Agendamento de ${values.name} criado com sucesso!` })
      actions.setSubmitting(false)
      actions.resetForm()
      setRefresh((prevValues) => prevValues + 1)
    } catch (error) {
      actions.setSubmitting(false)
      setFormStatus({ error: true, message: `${error}` })
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
                type='text'
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
                type='date'
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
                inputRef={inputRef}
                type='dateTime'
                name="appointment_date"
                value={props.values.appointment_date}
                onChange={(value) => { props.setFieldValue('appointment_date', value); }}
                label="Data de Agendamento"
                onBlur={props.handleBlur}
                shouldDisableDate={disabledDays}
                shouldDisableTime={disabledHours}
                minTime={new Date(0, 0, 0, 0, 0)}
                maxTime={new Date(0, 0, 0, 23, 0)}
                inputFormat='dd/MM/yyyy HH:00'
                views={['year', 'month', 'day', 'hours']}
                error={props.touched.appointment_date && props.errors.appointment_date}
                helperText={props.touched.appointment_date && props.errors.appointment_date}
                required
              />
              <Button
                disabled={!props.isValid}
                text="Cadastrar"
                type="submit"
              />
              <FormStatus
                isLoading={props.isSubmitting}
                hasError={formStatus.error}
                message={formStatus.message}
              />
              <Link data-testid="login-link" to="/" className={Styles.link}>Voltar Para Agendamentos</Link>
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
