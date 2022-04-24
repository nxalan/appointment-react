import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { InvalidParamsError } from '@/domain/errors/invalid-params-error'
import { AppointmentModel } from '@/domain/models'
import { DeleteAppointment, DeleteAppointmentParams } from '@/domain/usecases'

export class RemoteDeleteAppointment implements DeleteAppointment {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AppointmentModel>
  ) {}

  async delete (params: DeleteAppointmentParams): Promise<AppointmentModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.badRequest: throw new InvalidParamsError()
      case HttpStatusCode.ok: break
      default: throw new UnexpectedError()
    }
    return httpResponse.body
  }
}
