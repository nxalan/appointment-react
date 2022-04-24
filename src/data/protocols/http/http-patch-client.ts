import { HttpResponse } from '.'

export type HttpPatchParams = {
  url: string
  body?: any
}

export interface HttpPatchClient<R = any> {
  patch: (params: HttpPatchParams) => Promise<HttpResponse<R>>
}
