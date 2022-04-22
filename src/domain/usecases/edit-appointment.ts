import { AppointmentModel } from '@/domain/models'

export type EditAppointmentParams = {
  name?: string
  birthday?: string
  appointment_date?: string
  status?: string
  status_comment?: string
  
}

export interface EditAppointment {
  edit: (params: EditAppointmentParams) => Promise<AppointmentModel>
}
