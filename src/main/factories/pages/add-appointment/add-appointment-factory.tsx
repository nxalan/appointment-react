import React from 'react'
import { AddAppointmentPage } from '@/presentation/pages'
import { makeRemoteAddAppointment } from '@/main/factories/usecases/add-appointment/remote-add-appointment-factory'
import { makeRemoteLoadRestrictedDates } from '@/main/factories/usecases/load-restricted-dates/remote-load-restricted-dates-factory'

export const makeAddAppointmentPage: React.FC = () => {
  return (
    <AddAppointmentPage
      addAppointment={makeRemoteAddAppointment()}
      loadRestrictedDates={makeRemoteLoadRestrictedDates()}
    />
  )
}
