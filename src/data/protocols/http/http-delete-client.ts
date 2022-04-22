import { HttpResponse } from '.'

export type HttpDeleteParams = {
  url: string
}

export interface HttpDeleteClient<R = any> {
  delete: (params: HttpDeleteParams) => Promise<HttpResponse<R>>
}