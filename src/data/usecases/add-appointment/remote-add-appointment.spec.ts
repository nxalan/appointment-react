import { RemoteAddAppointment } from './remote-add-appointment'
import { HttpPostClientSpy } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import faker from '@faker-js/faker'
import { HttpStatusCode } from '@/data/protocols/http'
import { AddAppointmentParams } from '@/domain/usecases'
import { CreateAppointmentResponseModel } from '@/domain/models'
import { mockAppointmentModel, mockAddAppointmentParams } from '@/domain/test'

type SutTypes = {
  sut: RemoteAddAppointment
  httpPostClientSpy: HttpPostClientSpy<AddAppointmentParams, CreateAppointmentResponseModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAppointmentParams, CreateAppointmentResponseModel>()
  const sut = new RemoteAddAppointment(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.add(mockAddAppointmentParams())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const addAppointmentParams = mockAddAppointmentParams()
    await sut.add(addAppointmentParams)
    expect(httpPostClientSpy.body).toEqual(addAppointmentParams)
  })

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.add(mockAddAppointmentParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.add(mockAddAppointmentParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.add(mockAddAppointmentParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an AppointmentModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockAppointmentModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.add(mockAddAppointmentParams())
    expect(account).toEqual(httpResult)
  })
})
