import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { LoadAppointmentsModel } from '@/domain/models'
import { LoadAppointments } from '@/domain/usecases'

export class RemoteLoadAppointments implements LoadAppointments {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<LoadAppointmentsModel>
  ) {}

  async loadAll (): Promise<LoadAppointmentsModel> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      default: throw new UnexpectedError()
    }
    return httpResponse.body
  }
}
