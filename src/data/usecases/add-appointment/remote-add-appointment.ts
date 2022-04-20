import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, RestrictedDateError } from '@/domain/errors'
import { CreateAppointmentResponseModel } from '@/domain/models'
import { AddAppointment, AddAppointmentParams } from '@/domain/usecases'

export class RemoteAddAppointment implements AddAppointment {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<CreateAppointmentResponseModel>
  ) {}

  async add (params: AddAppointmentParams): Promise<CreateAppointmentResponseModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbidden: throw new RestrictedDateError()
      case HttpStatusCode.ok: break
      default: throw new UnexpectedError()
    }
    return httpResponse.body
  }
}
