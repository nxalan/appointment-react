import { AddAppointmentParams } from '@/domain/usecases'
import faker from '@faker-js/faker'

export const mockAddAppointmentParams = (): AddAppointmentParams => {
  return {
    name: faker.name.findName(),
    birthday: faker.date.past(),
    appointment_date: faker.date.future()
  }
}
