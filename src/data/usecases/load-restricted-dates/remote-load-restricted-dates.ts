import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { AppointmentModel, LoadRestrictedDatesModel } from '@/domain/models'
import { LoadRestrictedDates } from '@/domain/usecases'

export class RemoteLoadRestrictedDates implements LoadRestrictedDates {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<LoadRestrictedDatesModel>
  ) {}

  async loadDates (): Promise<LoadRestrictedDatesModel> {
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
