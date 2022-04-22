import { AppointmentModel } from '@/domain/models'

export interface DeleteAppointment {
  delete: () => Promise<AppointmentModel>
}
