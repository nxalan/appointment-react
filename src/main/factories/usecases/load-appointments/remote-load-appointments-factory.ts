import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { LoadAppointments } from '@/domain/usecases'
import { RemoteLoadAppointments } from '@/data/usecases/load-appointments/remote-load-appointments'

export const makeRemoteLoadAppointments = (): LoadAppointments => {
  return new RemoteLoadAppointments(makeApiUrl('/appointments'), makeAxiosHttpClient())
}
