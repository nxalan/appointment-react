import { AddAppointmentModel } from '@/domain/models'

export type AddAppointmentParams = {
  name: string
  birthday: string
  appointment_date: string
}

export interface AddAppointment {
  add: (params: AddAppointmentParams) => Promise<AddAppointmentModel>
}
