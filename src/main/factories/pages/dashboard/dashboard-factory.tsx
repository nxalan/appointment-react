import React from 'react'
import { DashboardPage } from '@/presentation/pages'
import { makeRemoteLoadAppointments } from '@/main/factories/usecases/load-appointments/remote-load-appointments-factory'
import { makeRemoteDeleteAppointment } from '@/main/factories/usecases/delete-appointment/remote-delete-appointment-factory'

export const makeDashboardPage: React.FC = () => {
  return (
    <DashboardPage
      loadAppointments={makeRemoteLoadAppointments()}
      deleteAppointment={makeRemoteDeleteAppointment()}
    />
  )
}
