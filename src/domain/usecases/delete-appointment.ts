import { AppointmentModel } from '@/domain/models'

export type DeleteAppointmentParams = {
  id: string
}

export interface DeleteAppointment {
  delete: (params: DeleteAppointmentParams) => Promise<AppointmentModel>
}
