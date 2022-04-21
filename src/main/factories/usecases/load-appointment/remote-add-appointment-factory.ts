import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { RemoteLoadAppointment } from '@/data/usecases/load-appointment/remote-load-appointment'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { LoadAppointment } from '@/domain/usecases'

export const makeRemoteLoadAppointment = (id: string): LoadAppointment => {
  return new RemoteLoadAppointment(makeApiUrl(`/appointment/${id}`), makeAxiosHttpClient())
}
