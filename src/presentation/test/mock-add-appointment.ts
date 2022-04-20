import { CreateAppointmentResponseModel } from '@/domain/models'
import { AddAppointment, AddAppointmentParams } from '@/domain/usecases'
import { mockAddAppointmentModel } from '@/domain/test'

export class AddAccountSpy implements AddAppointment {
  account = mockAddAppointmentModel()
  params: AddAppointmentParams
  callsCount = 0

  async add (params: AddAppointmentParams): Promise<CreateAppointmentResponseModel> {
    this.params = params
    this.callsCount++
    return Promise.resolve(this.account)
  }
}
