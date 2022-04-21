import { AppointmentModel } from '@/domain/models'

export interface LoadAppointments {
  load: () => Promise<AppointmentModel>
}
