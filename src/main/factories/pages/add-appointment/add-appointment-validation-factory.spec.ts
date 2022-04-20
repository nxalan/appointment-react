import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-builder'
import { makeAddAppointmentValidation } from './add-appointment-validation-factory'

describe('AddAppointmentValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeAddAppointmentValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...Builder.field('name').required().min(5).build(),
      ...Builder.field('birthday').required().build(),
      ...Builder.field('appointment_date').required().build(),
    ]))
  })
})
