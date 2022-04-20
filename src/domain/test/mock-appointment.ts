import { CreateAppointmentResponseModel } from "../models";
import faker from '@faker-js/faker'

export const mockAppointmentModel = (): CreateAppointmentResponseModel => ({
  id: faker.datatype.uuid()
})
