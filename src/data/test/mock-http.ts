import { HttpPostClient, HttpPostParams, HttpPatchParams, HttpResponse, HttpStatusCode, HttpPatchClient, HttpGetParams, HttpGetClient } from '@/data/protocols/http'
import faker from '@faker-js/faker'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement({ one: 1, two: 2, three: 3 })
})

export const mockPatchRequest = (): HttpPatchParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement({ one: 1, two: 2, three: 3 })
})

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url()
})

export class HttpPostClientSpy<T, R> implements HttpPostClient<R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams): Promise <HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return this.response
  }
}

export class HttpPatchClientSpy<T, R> implements HttpPatchClient<R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async patch (params: HttpPatchParams): Promise <HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return this.response
  }
}

export class HttpGetClientSpy<R> implements HttpGetClient<R> {
  url?: string
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async get (params: HttpGetParams): Promise <HttpResponse<R>> {
    this.url = params.url
    return this.response
  }
}
