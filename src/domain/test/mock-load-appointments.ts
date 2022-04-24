import { LoadAppointmentsModel } from '@/domain/models'
import faker from '@faker-js/faker'

export const mockLoadAppointmentsModel = (): LoadAppointmentsModel => ([
  {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    birthday: faker.date.past().toISOString(),
    appointment_date: faker.date.future().toISOString(),
    status: faker.random.word(),
    status_comment: faker.random.word()
  }, {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    birthday: faker.date.past().toISOString(),
    appointment_date: faker.date.future().toISOString(),
    status: faker.random.word(),
    status_comment: faker.random.word()
  }, {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    birthday: faker.date.past().toISOString(),
    appointment_date: faker.date.future().toISOString(),
    status: faker.random.word(),
    status_comment: faker.random.word()
  }
])
