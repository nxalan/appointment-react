import { DeleteAppointmentModel } from '@/domain/models'
import faker from '@faker-js/faker'

export const mockAddAppointmentModel = (): DeleteAppointmentModel => ({
  id: faker.datatype.uuid()
})