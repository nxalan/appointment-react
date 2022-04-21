import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { RemoteEditAppointment } from '@/data/usecases/edit-appointment/remote-edit-appointment'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { EditAppointment } from '@/domain/usecases'

export const makeRemoteEditAppointment = (id: string): EditAppointment => {
  return new RemoteEditAppointment(makeApiUrl(`/appointment/${id}`), makeAxiosHttpClient())
}
