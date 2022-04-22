import { LoadAppointmentsModel } from '@/domain/models'

export interface LoadAppointments {
  loadAll: () => Promise<LoadAppointmentsModel>
}
