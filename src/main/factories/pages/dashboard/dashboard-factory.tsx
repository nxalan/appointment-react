import React from 'react'
import { useParams } from 'react-router-dom'
import { Dashboard } from '@/presentation/pages'
import { makeRemoteLoadAppointments } from '@/main/factories/usecases/load-appointments/remote-load-appointments-factory'
import { makeRemoteDeleteAppointment } from '@/main/factories/usecases/delete-appointment/remote-delete-appointment-factory'

export const makeDashboard: React.FC = () => {
  type Props = {
    id: string
  }
  const { id } = useParams<Props>()
  return (
    <Dashboard
      loadAppointments={makeRemoteLoadAppointments()}
      deleteAppointment={makeRemoteDeleteAppointment(id)}
    />
  )
}
