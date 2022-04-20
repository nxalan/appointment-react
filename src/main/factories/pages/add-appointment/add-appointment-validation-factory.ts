import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-builder'

export const makeAddAppointmentValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('name').required().min(5).build(),
    ...Builder.field('birthday').required().build(),
    ...Builder.field('appointment_date').required().build(),
  ])
}
