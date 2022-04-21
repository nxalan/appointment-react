import { HttpPostClient, HttpPostParams, HttpPutParams, HttpResponse, HttpStatusCode, HttpPutClient, HttpGetParams, HttpGetClient, HttpDeleteParams, HttpDeleteClient } from '@/data/protocols/http'
import faker from '@faker-js/faker'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement({ one: 1, two: 2, three: 3 })
})

export const mockPutRequest = (): HttpPutParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement({ one: 1, two: 2, three: 3 })
})

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url()
})

export const mockDeleteRequest = (): HttpDeleteParams => ({
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

export class HttpPutClientSpy<T, R> implements HttpPutClient<R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async put (params: HttpPutParams): Promise <HttpResponse<R>> {
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

export class HttpDeleteClientSpy<R> implements HttpDeleteClient<R> {
  url?: string
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async delete (params: HttpGetParams): Promise <HttpResponse<R>> {
    this.url = params.url
    return this.response
  }
}
