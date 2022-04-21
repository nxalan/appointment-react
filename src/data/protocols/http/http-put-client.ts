import { HttpResponse } from '.'

export type HttpPutParams = {
  url: string
  body?: any
}

export interface HttpPutClient<R = any> {
  put: (params: HttpPutParams) => Promise<HttpResponse<R>>
}