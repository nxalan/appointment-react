import { HttpDeleteClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { AppointmentModel } from '@/domain/models'
import { DeleteAppointment } from '@/domain/usecases'

export class RemoteDeleteAppointment implements DeleteAppointment {
  constructor (
    private readonly url: string,
    private readonly httpDeleteClient: HttpDeleteClient<AppointmentModel>
  ) {}

  async delete (): Promise<AppointmentModel> {
    const httpResponse = await this.httpDeleteClient.delete({
      url: this.url,
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      default: throw new UnexpectedError()
    }
    return httpResponse.body
  }
}
