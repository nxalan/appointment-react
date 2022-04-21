import { RemoteDeleteAppointment } from './remote-delete-appointment'
import { HttpDeleteClientSpy } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import faker from '@faker-js/faker'
import { HttpStatusCode } from '@/data/protocols/http'
import { AppointmentModel } from '@/domain/models'
import { mockAppointmentModel } from '@/domain/test'

type SutTypes = {
  sut: RemoteDeleteAppointment
  httpDeleteClientSpy: HttpDeleteClientSpy<AppointmentModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpDeleteClientSpy = new HttpDeleteClientSpy<AppointmentModel>()
  const sut = new RemoteDeleteAppointment(url, httpDeleteClientSpy)
  return {
    sut,
    httpDeleteClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpDeleteClientSpy } = makeSut(url)
    await sut.delete()
    expect(httpDeleteClientSpy.url).toBe(url)
  })

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpDeleteClientSpy } = makeSut()
    httpDeleteClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.delete()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpDeleteClientSpy } = makeSut()
    httpDeleteClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.delete()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an AppointmentModel if HttpGetClient returns 200', async () => {
    const { sut, httpDeleteClientSpy } = makeSut()
    const httpResult = mockAppointmentModel()
    httpDeleteClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const appointment = await sut.delete()
    expect(appointment).toEqual(httpResult)
  })
})
