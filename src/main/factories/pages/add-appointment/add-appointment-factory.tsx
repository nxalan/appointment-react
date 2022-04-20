import React from 'react'
import { AddAppointment } from '@/presentation/pages'
import { makeRemoteAddAppointment } from '@/main/factories/usecases/add-appointment/remote-add-appointment-factory'
import { makeLocalSaveLocalStorage } from '@/main/factories/usecases/save-local-storage/local-save-local-storage-factory'
import { makeAddAppointmentValidation } from './add-appointment-validation-factory'

export const makeAddAppointment: React.FC = () => {
  return (
    <AddAppointment
      addAppointment={makeRemoteAddAppointment()}
      validation={makeAddAppointmentValidation()}
      saveLocalStorage={makeLocalSaveLocalStorage()}
    />
  )
}
