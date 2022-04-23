import React from 'react'
import { useParams } from 'react-router-dom'
import { EditAppointment } from '@/presentation/pages'
import { makeRemoteLoadRestrictedDates } from '@/main/factories/usecases/load-restricted-dates/remote-load-restricted-dates-factory'
import { makeRemoteLoadAppointment } from '@/main/factories/usecases/load-appointment/remote-add-appointment-factory'
import { makeRemoteEditAppointment } from '@/main/factories/usecases/edit-appointment/remote-edit-appointment-factory'
import { makeRemoteDeleteAppointment } from '@/main/factories/usecases/delete-appointment/remote-delete-appointment-factory'

export const makeEditAppointment: React.FC = () => {
  type Props = {
    id: string
  }
  const { id } = useParams<Props>()
  console.log(id)
  return (
    <EditAppointment
      loadAppointment={makeRemoteLoadAppointment(id)}
      editAppointment={makeRemoteEditAppointment(id)}
      deleteAppointment={makeRemoteDeleteAppointment(id)}
      loadRestrictedDates={makeRemoteLoadRestrictedDates()}
    />
  )
}
