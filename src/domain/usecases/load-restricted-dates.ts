import { LoadRestrictedDatesModel } from '@/domain/models'

export interface LoadRestrictedDates {
  loadDates: () => Promise<LoadRestrictedDatesModel>
}
