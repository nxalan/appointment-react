import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { RemoteAddAppointment } from '@/data/usecases/add-appointment/remote-add-appointment'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { AddAppointment } from '@/domain/usecases'

export const makeRemoteAddAppointment = (): AddAppointment => {
  return new RemoteAddAppointment(makeApiUrl('/appointment'), makeAxiosHttpClient())
}
