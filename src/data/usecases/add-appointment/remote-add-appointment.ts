import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, RestrictedDateError,  } from '@/domain/errors'
import { AddAppointmentModel } from '@/domain/models'
import { AddAppointment, AddAppointmentParams } from '@/domain/usecases'

export class RemoteAddAppointment implements AddAppointment {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAppointmentModel>
  ) {}

  async add (params: AddAppointmentParams): Promise<AddAppointmentModel> {
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
