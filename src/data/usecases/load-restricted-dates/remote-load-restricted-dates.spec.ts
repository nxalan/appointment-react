import { RemoteLoadRestrictedDates } from './remote-load-restricted-dates'
import { HttpGetClientSpy } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import faker from '@faker-js/faker'
import { HttpStatusCode } from '@/data/protocols/http'
import { LoadRestrictedDatesModel } from '@/domain/models'
import { mockLoadRestrictedDatesModel } from '@/domain/test'

type SutTypes = {
  sut: RemoteLoadRestrictedDates
  httpGetClientSpy: HttpGetClientSpy<LoadRestrictedDatesModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<LoadRestrictedDatesModel>()
  const sut = new RemoteLoadRestrictedDates(url, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.loadDates()
    expect(httpGetClientSpy.url).toBe(url)
  })

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.loadDates()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.loadDates()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return restrictedDates if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResult = mockLoadRestrictedDatesModel()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const restrictedDates = await sut.loadDates()
    expect(restrictedDates).toEqual(httpResult)
  })
})
