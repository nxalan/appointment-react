import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { AppointmentModel } from '@/domain/models'
import { LoadAppointment } from '@/domain/usecases'

export class RemoteLoadAppointment implements LoadAppointment {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<AppointmentModel>
  ) {}

  async load (): Promise<AppointmentModel> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url,
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      default: throw new UnexpectedError()
    }
    return httpResponse.body
  }
}
