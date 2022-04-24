import React, { useState, useEffect } from "react"
import { EditAppointment, LoadAppointment, LoadRestrictedDates } from "@/domain/usecases"
import { Footer, Header, Input, Button, FormStatus, Snackbar, AlertDialog } from '@/presentation/components'
import { Formik, FormikHelpers } from 'formik'
import Styles from './edit-appointment-styles.scss'
import { Link, useHistory } from 'react-router-dom'
import { Divider } from "@mui/material"

type Props = {
  loadAppointment: LoadAppointment
  editAppointment: EditAppointment
  loadRestrictedDates: LoadRestrictedDates
}

const EditAppointment: React.FC<Props> = ({ loadAppointment, editAppointment, loadRestrictedDates }: Props) => {
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)
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

  useEffect(() => {
    setLoading(true)
    loadAppointment.load().then((appointment) => {
      setCurrentAppointment(appointment)
      setLoading(false)
    })
  }, [refresh])

  const handleSubmit = async (values: any, actions: FormikHelpers<any>): Promise<void> => {
    try {
      setLoading(true)
      await editAppointment.edit({
        status: values.status,
        status_comment: values.status === 'VACCINED' ? values.status_comment : '',
      })
      setRefresh(refresh + 1)
      setDeleteSnackbarSuccessOpen(true)
    } catch (error) {
      setDeleteSnackbarErrorOpen(true)
    }
    actions.setSubmitting(false)
  }

  const handleSnackbarSuccessClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setDeleteSnackbarSuccessOpen(false);
  }

  const handleSnackbarErrorClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setDeleteSnackbarErrorOpen(false);
  }

console.log(currentAppointment)

  return (
    <div className={Styles.root}>
      <div className={Styles.headerBase}>
        <Header />
      </div>
      <div className={Styles.centerBase}>
      <Snackbar
          severity={'success'}
          successSnackbarOpen={deleteSnackbarSuccessOpen}
          successMessage={'Agendamento editado com sucesso!'}
          handleSnackbarSuccessClose={() => handleSnackbarSuccessClose()}
        />
        <Snackbar
          severity={'error'}
          errorSnackbarOpen={deleteSnackbarErrorOpen}
          errorMessage={'Erro ao editar agendamento!'}
          handleSnackbarErrorClose={() => handleSnackbarErrorClose()}
        />
        <Formik
          enableReinitialize={true}
          initialValues={currentAppointment}
          //validationSchema={AddAppointmentSchema}
          //validateOnMount
          onSubmit={(values, actions: FormikHelpers<any>) => {
            handleSubmit(values, actions)
          }}
        >
          {props => (
            <form data-testid="form" className={Styles.form} onSubmit={props.handleSubmit}>
              <h2>Editar Agendamento</h2>
              <div className={Styles.divider}>
                <Divider>Dados do Agendamento</Divider>
              </div>
              <Input
                disabled
                type="text"
                fullWidth
                name="name"
                label="Nome"
                placeholder="Digite seu nome"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                error={props.touched.name && props.errors?.name}
                helperText={props.touched.name && props.errors?.name}
              />
              <Input
                disabled
                type="date"
                name="birthday"
                value={props.values.birthday}
                onChange={(value) => { props.setFieldValue('birthday', value) }}
                label="Data de Nascimento"
                onBlur={props.handleBlur}
                error={props.touched.birthday && props.errors.birthday}
                helperText={props.touched.birthday && props.errors.birthday}
              />
              <Input
                disabled
                //inputRef={inputRef}
                type="dateTime"
                name="appointment_date"
                value={props.values.appointment_date}
                onChange={(value) => { props.setFieldValue('appointment_date', value) }}
                label="Data de Agendamento"
                onBlur={props.handleBlur}
                //shouldDisableDate={disabledDays}
                //shouldDisableTime={disabledHours}
                minTime={new Date(0, 0, 0, 0, 0)}
                maxTime={new Date(0, 0, 0, 23, 0)}
                inputFormat='dd/MM/yyyy HH:00'
                views={['year', 'month', 'day', 'hours']}
                error={props.touched.appointment_date && props.errors.appointment_date}
                helperText={props.touched.appointment_date && props.errors.appointment_date}
              />
              <div className={Styles.divider}>
                <Divider>Dados do Atendimento</Divider>
              </div>
              <Input
                name="status"
                type="radio"
                value={props.values.status}
                onChange={props.handleChange}
                radioLabels={[{ value: 'VACCINED', label: 'ATENDIDO' }, { value: 'NOT VACCINED', label: 'NÃO ATENDIDO' }]}
              />
              {props.values.status === 'VACCINED' && (
              <Input
                name="status_comment"
                type="multiline"
                label="Conclusão do atendimento"
                rows={4}
                onChange={props.handleChange}
                value={props.values.status_comment}
              />
              )}
              <Button
                disabled={props.isSubmitting}
                text="Alterar Dados"
                type="submit"
              />
              {/*
              <FormStatus
                isLoading={props.isSubmitting}
                //hasError={formStatus.error}
                //message={formStatus.message}
              />
              */}
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

export default EditAppointment