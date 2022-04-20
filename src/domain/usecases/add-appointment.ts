import { CreateAppointmentResponseModel } from '@/domain/models'

export type AddAppointmentParams = {
  name: string
  birthday: Date
  appointment_date: Date
}

export interface AddAppointment {
  add: (params: AddAppointmentParams) => Promise<CreateAppointmentResponseModel>
}
