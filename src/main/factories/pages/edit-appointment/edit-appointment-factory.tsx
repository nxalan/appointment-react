import React from 'react'
import { useParams } from 'react-router-dom'
import { EditAppointment } from '@/presentation/pages'
import { makeRemoteLoadRestrictedDates } from '@/main/factories/usecases/load-restricted-dates/remote-load-restricted-dates-factory'
import { makeRemoteLoadAppointment } from '@/main/factories/usecases/load-appointment/remote-add-appointment-factory'
import { makeRemoteEditAppointment } from '@/main/factories/usecases/edit-appointment/remote-edit-appointment-factory'

export const makeEditAppointment: React.FC = () => {
  type Props = {
    id: string
  }
  const { id } = useParams<Props>()
  return (
    <EditAppointment
      loadAppointment={makeRemoteLoadAppointment(id)}
      editAppointment={makeRemoteEditAppointment(id)}
      loadRestrictedDates={makeRemoteLoadRestrictedDates()}
    />
  )
}
