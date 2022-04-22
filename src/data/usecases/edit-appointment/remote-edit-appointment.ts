import { HttpPutClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, RestrictedDateError } from '@/domain/errors'
import { AppointmentModel, EditAppointmentModel } from '@/domain/models'
import { EditAppointment } from '@/domain/usecases'

export class RemoteEditAppointment implements EditAppointment {
  constructor (
    private readonly url: string,
    private readonly httpPutClient: HttpPutClient<AppointmentModel>
  ) {}

  async edit (params: EditAppointmentModel): Promise<AppointmentModel> {
    const httpResponse = await this.httpPutClient.put({
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
