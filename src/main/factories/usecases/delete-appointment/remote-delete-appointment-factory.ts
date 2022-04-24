import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { DeleteAppointment } from '@/domain/usecases'
import { RemoteDeleteAppointment } from '@/data/usecases/delete-appointment/remote-delete-appointment'

export const makeRemoteDeleteAppointment = (): DeleteAppointment => {
  return new RemoteDeleteAppointment(makeApiUrl('/appointment/delete'), makeAxiosHttpClient())
}
