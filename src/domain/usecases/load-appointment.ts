import { AppointmentModel } from '@/domain/models'

export interface LoadAppointment {
  load: () => Promise<AppointmentModel>
}
