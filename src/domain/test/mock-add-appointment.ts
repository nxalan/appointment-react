import { AddAppointmentModel } from '../models'
import { AddAppointmentParams } from '@/domain/usecases'
import faker from '@faker-js/faker'

export const mockAddAppointmentModel = (): AddAppointmentModel => ({
  id: faker.datatype.uuid()
})

export const mockAddAppointmentParams = (): AddAppointmentParams => {
  return {
    name: faker.name.findName(),
    birthday: faker.date.past().toISOString(),
    appointment_date: faker.date.future().toISOString()
  }
}
