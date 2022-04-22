import React from 'react'
import { AddAppointment } from '@/presentation/pages'
import { makeRemoteAddAppointment } from '@/main/factories/usecases/add-appointment/remote-add-appointment-factory'
import { makeRemoteLoadRestrictedDates } from '@/main/factories/usecases/load-restricted-dates/remote-load-restricted-dates-factory'

export const makeAddAppointment: React.FC = () => {
  return (
    <AddAppointment
      addAppointment={makeRemoteAddAppointment()}
      loadRestrictedDates={makeRemoteLoadRestrictedDates()}
    />
  )
}
