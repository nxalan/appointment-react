import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { LoadRestrictedDates } from '@/domain/usecases'
import { RemoteLoadRestrictedDates } from '@/data/usecases/load-restricted-dates/remote-load-restricted-dates'

export const makeRemoteLoadRestrictedDates = (): LoadRestrictedDates => {
  return new RemoteLoadRestrictedDates(makeApiUrl('/appointments/restricted-dates'), makeAxiosHttpClient())
}
