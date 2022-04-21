import { LoadRestrictedDatesModel } from "@/domain/models";
import faker from '@faker-js/faker'

export const mockLoadRestrictedDatesModel = (): LoadRestrictedDatesModel => ({
  restrictedDays: [faker.date.future().toISOString(), faker.date.future().toISOString()],
  restrictedHours: [faker.date.future().toISOString(), faker.date.future().toISOString()]
})
