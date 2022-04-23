import React, { useState, useEffect } from "react"
import { EditAppointment, LoadAppointment, LoadRestrictedDates, DeleteAppointment } from "@/domain/usecases"
import { Footer, Header, Input, Button, FormStatus, Snackbar, AlertDialog } from '@/presentation/components'
import { Formik, FormikHelpers } from 'formik'
import Styles from './edit-appointment-styles.scss'
import { Link, useHistory } from 'react-router-dom'
import { Divider } from "@mui/material"

type Props = {
  loadAppointment: LoadAppointment
  editAppointment: EditAppointment
  loadRestrictedDates: LoadRestrictedDates
  deleteAppointment: DeleteAppointment
}


const EditAppointment: React.FC<Props> = ({ loadAppointment, editAppointment, loadRestrictedDates, deleteAppointment }: Props) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteDialogSuccessMessage, setDeleteDialogSuccessMessage] = useState(false)
  const [deleteDialogErrorMessage, setDeleteDialogErrorMessage] = useState(false)
  const [currentAppointment, setCurrentAppointment] = useState({
    id: '',
    name: '',
    birthday: null,
    appointment_date: null,
    status: '',
    status_comment: ''
  })
  const history = useHistory()

  useEffect(() => {
    loadAppointment.load().then((appointment) => {
      setCurrentAppointment(appointment)
    })
  }, [])

    const handleDeleteAppointmentSubmit = async (): Promise<void> => {
      console.log('rodei')
    try {
      const result = await deleteAppointment.delete()
      if (result) {
        setDeleteDialogOpen(false)
        setDeleteDialogSuccessMessage(true)
        setTimeout(() => {
          history.push('/')
        }, 2000);
      }
      else {
        setDeleteDialogOpen(false)
        setDeleteDialogErrorMessage(true);
      }
    } catch (error) {
      setDeleteDialogOpen(false)
      setDeleteDialogErrorMessage(true);
    }
  }

  const handleDialogSuccessClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setDeleteDialogErrorMessage(false);
  }

  const handleDialogErrorClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setDeleteDialogErrorMessage(false);
  }

  return (
    <div className={Styles.root}>
      <div className={Styles.headerBase}>
        <Header />
      </div>
      <div className={Styles.centerBase}>
        
        <Snackbar 
        successMessage={deleteDialogSuccessMessage}
        setSuccessMessage={setDeleteDialogSuccessMessage}
        errorMessage={deleteDialogErrorMessage}
        setErrorMessage={setDeleteDialogErrorMessage}
        handleErrorClose={handleDialogSuccessClose}
        handleSuccessClose={handleDialogErrorClose}
        />
     
        <AlertDialog
          dialogStatus={deleteDialogOpen}
          closeDialog={setDeleteDialogOpen}
          handleConfirm={() => handleDeleteAppointmentSubmit()}
          title={'Deseja realmente excluir o agendamento?'}
          message={`O agendamento de ${currentAppointment.name} será permanentemente excluido do sistema`}
        />

        <Formik
          enableReinitialize={true}
          initialValues={currentAppointment}
          //validationSchema={AddAppointmentSchema}
          //validateOnMount
          onSubmit={(values, actions: FormikHelpers<any>) => {
            console.log(values)
            //handleSubmit(values, actions)
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
                onChange={(value) => { props.setFieldValue('birthday', value); }}
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
                onChange={(value) => { props.setFieldValue('appointment_date', value); }}
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
                type="radio"
                value={props.values.status}
                onChange={props.handleChange}
                radioLabels={[{ value: 'NOT VACCINED', label: 'NÃO ATENDIDO' }, { value: 'VACCINED', label: 'ATENDIDO' }]}
                disabled={true}
              />
              <Input
                type="multiline"
                label="Conclusão do atendimento"
                rows={4}
                onChange={props.handleChange}
                value={props.values.name}
              />
              <Button
                disabled={!props.isValid}
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
              <div className={Styles.divider}>
                <Divider>Excluir Dados</Divider>
              </div>
              <Button
                disabled={!props.isValid}
                text="Excluir Agendamento"
                type="error"
                onClick={() => setDeleteDialogOpen(true)}
              />
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