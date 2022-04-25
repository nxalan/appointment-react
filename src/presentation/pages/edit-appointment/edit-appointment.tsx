/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import * as Yup from 'yup'
import { EditAppointment, LoadAppointment, LoadRestrictedDates } from '@/domain/usecases'
import { Footer, Header, Input, Button, Snackbar, Spinner } from '@/presentation/components'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import Styles from './edit-appointment-styles.scss'
import { Link } from 'react-router-dom'
import { Divider } from '@mui/material'
import { getHours, isEqual, isSameDay, startOfHour } from 'date-fns'
import { useHistory } from 'react-router-dom'

const EditAppointmentSchema = Yup.object().shape({
  birthday: Yup.date().typeError('Digite uma data válida').default(null),
  appointment_date: Yup.date().typeError('Digite uma data válida')
})

type Props = {
  loadAppointment: LoadAppointment
  editAppointment: EditAppointment
  loadRestrictedDates: LoadRestrictedDates
}

const EditAppointmentPage: React.FC<Props> = ({ loadAppointment, editAppointment, loadRestrictedDates }: Props) => {
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [restrictedDates, setRestrictedDates] = useState({
    restrictedDays: [],
    restrictedHours: []
  })
  const [deleteSnackbarSuccessOpen, setDeleteSnackbarSuccessOpen] = useState(false)
  const [deleteSnackbarErrorOpen, setDeleteSnackbarErrorOpen] = useState(false)
  const [currentAppointment, setCurrentAppointment] = useState({
    id: '',
    name: '',
    birthday: null,
    appointment_date: null,
    status: '',
    status_comment: ''
  })
  const inputRef = useRef(null)
  const history = useHistory()

  useEffect(() => {
    async function refreshAppointments() {
      setLoading(true)
      try {
      const appointment = await loadAppointment.load()
      let currentRestrictedDates = await loadRestrictedDates.loadDates()
      const filteredDays = currentRestrictedDates.restrictedDays.filter((eachDay) => {!(appointment.appointment_date.substring(0, 10) === eachDay.substring(0, 10))})
      const filteredHours = currentRestrictedDates.restrictedHours.filter((eachHour) => !isEqual(new Date(appointment.appointment_date), new Date(eachHour)))
      currentRestrictedDates = {restrictedDays: filteredDays, restrictedHours: filteredHours}
      setCurrentAppointment(appointment)
      setRestrictedDates(currentRestrictedDates)
    } catch (error) {
      history.push('/agendamento')
    }
    setLoading(false)
    }
    refreshAppointments()
  }, [refresh])


  function disabledDays (date) {
    let disabledDay = false
    restrictedDates.restrictedDays.forEach((actualDate) => {
      if (actualDate.substring(0, 10) === date.toISOString().substring(0, 10)) {
        disabledDay = true
      }
    })
    return disabledDay
  }

  function disabledHours (date) {
    let disabledHour = false
    if (inputRef.current && inputRef.current.value) {
      const formatedDay = inputRef.current.value.substr(3, 2) + '/' + inputRef.current.value.substr(0, 2) + '/' + inputRef.current.value.substr(6, 4)
      const RestrictedDatesInTheSameDay = restrictedDates.restrictedHours.filter((actualDate) => (
        isSameDay(new Date(formatedDay), new Date(actualDate))
      ))
      RestrictedDatesInTheSameDay.forEach((actualDate) => {
        if (getHours(new Date(actualDate)) === date) {
          disabledHour = true
        }
      })
    }
    return disabledHour
  }

  const handleSubmit = async (values: any, actions: FormikHelpers<any>): Promise<void> => {
    try {
      setLoading(true)
      await editAppointment.edit({
        name: values.name,
        birthday: new Date(values.birthday).toISOString(),
        appointment_date: compareDatesAndReturnTheFirstIfDifferent(values.appointment_date, currentAppointment.appointment_date),
        status: values.status,
        status_comment: values.status === 'VACCINED' ? values.status_comment : '',
      })
      setRefresh(refresh + 1)
      setDeleteSnackbarSuccessOpen(true)
    } catch (error) {
      setDeleteSnackbarErrorOpen(true)
    }
    setLoading(false)
    actions.setSubmitting(false)
  }

  const handleSnackbarSuccessClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setDeleteSnackbarSuccessOpen(false)
  }

  const handleSnackbarErrorClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setDeleteSnackbarErrorOpen(false)
  }

  function compareDatesAndReturnTheFirstIfDifferent(date1: string, date2: string) {
    let result = startOfHour(new Date(date1)).toISOString()
    if (isEqual(startOfHour(new Date(date1)), startOfHour(new Date(date2)))) {
      result = undefined
    }
    return result
  }

  return (
    <div className={Styles.root}>
      <div className={Styles.headerBase}>
        <Header />
      </div>
      <div className={Styles.centerBase}>
        <Snackbar
          severity={'success'}
          open={deleteSnackbarSuccessOpen}
          message={'Agendamento editado com sucesso!'}
          onClose={() => handleSnackbarSuccessClose()}
        />
        <Snackbar
          severity={'error'}
          open={deleteSnackbarErrorOpen}
          message={'Erro ao editar agendamento!'}
          onClose={() => handleSnackbarErrorClose()}
        />
        <Formik
          enableReinitialize={true}
          initialValues={currentAppointment}
          validationSchema={EditAppointmentSchema}
          validateOnMount
          onSubmit={(values, actions: FormikHelpers<any>) => {
            handleSubmit(values, actions)
          }}
        >
          {(props: FormikProps<any>) => (
            <form data-testid="form" className={Styles.form} onSubmit={props.handleSubmit}>
              <h2>Editar Agendamento</h2>
              <div className={Styles.divider}>
                <Divider>Dados do Agendamento</Divider>
              </div>
              <Input
                type="text"
                name="name"
                label="Nome"
                placeholder="Digite seu nome"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                error={!!props.touched.name && !!props.errors?.name}
                helperText={props.touched.name && props.errors?.name}
                disabled={props.isSubmitting || loading}
              />
              <Input
                type="date"
                name="birthday"
                value={props.values.birthday}
                onChange={(value) => { props.setFieldValue('birthday', value) }}
                label="Data de Nascimento"
                onBlur={props.handleBlur}
                error={!!props.touched.birthday && !!props.errors.birthday}
                helperText={props.touched.birthday && props.errors.birthday}
                disabled={props.isSubmitting || loading}
              />
              <Input
                inputRef={inputRef}
                type="dateTime"
                name="appointment_date"
                value={props.values.appointment_date}
                onChange={(value) => { props.setFieldValue('appointment_date', value) }}
                label="Data de Agendamento"
                onBlur={props.handleBlur}
                shouldDisableDate={disabledDays}
                shouldDisableTime={disabledHours}
                minTime={new Date(0, 0, 0, 0, 0)}
                maxTime={new Date(0, 0, 0, 23, 0)}
                inputFormat='dd/MM/yyyy HH:00'
                dateViews={['year', 'month', 'day', 'hours']}
                error={!!props.touched.appointment_date && !!props.errors.appointment_date}
                helperText={props.touched.appointment_date && props.errors.appointment_date}
                disabled={props.isSubmitting || loading}
              />
              <div className={Styles.divider}>
                <Divider>Dados do Atendimento</Divider>
              </div>
              <Input
                disabled={props.isSubmitting || loading}
                name="status"
                type="radio"
                value={props.values.status}
                onChange={props.handleChange}
                radioLabels={[{ value: 'VACCINED', label: 'ATENDIDO' }, { value: 'NOT VACCINED', label: 'NÃO ATENDIDO' }]}
              />
              {props.values.status === 'VACCINED' && (
                <Input
                disabled={props.isSubmitting || loading}
                  name="status_comment"
                  type="multiline"
                  required
                  label="Conclusão do atendimento"
                  rows={4}
                  onChange={props.handleChange}
                  value={props.values.status_comment}
                />
              )}
              <Button
                disabled={props.isSubmitting || loading || Object.is(props.values, currentAppointment)}
                buttonLabel="Alterar Dados"
                type="submit"
              />
              <Button
                disabled={props.isSubmitting || loading || Object.is(props.values, currentAppointment)}
                buttonLabel="Resetar Dados"
                type="reset"
                onClick={() => props.setValues(currentAppointment)}
              />
              <Link data-testid="login-link" to="/agendamentos" className={Styles.link}>Voltar Para Agendamentos</Link>
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

export default EditAppointmentPage
