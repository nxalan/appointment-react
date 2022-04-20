import { CreateAppointmentResponseModel } from "../models";
import faker from '@faker-js/faker'

export const mockAddAppointmentModel = (): CreateAppointmentResponseModel => ({
  id: faker.datatype.uuid()
})
