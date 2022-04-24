import { RemoteDeleteAppointment } from './remote-delete-appointment'
import { HttpPostClientSpy } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import faker from '@faker-js/faker'
import { HttpStatusCode } from '@/data/protocols/http'
import { AppointmentModel } from '@/domain/models'
import { DeleteAppointmentParams } from '@/domain/usecases'
import { mockAppointmentModel } from '@/domain/test'

type SutTypes = {
  sut: RemoteDeleteAppointment
  httpPostClientSpy: HttpPostClientSpy<DeleteAppointmentParams, AppointmentModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<DeleteAppointmentParams, AppointmentModel>()
  const sut = new RemoteDeleteAppointment(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpGetClient with correct URL and value', async () => {
    const url = faker.internet.url()
    const id = faker.datatype.uuid()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.delete({ id })
    expect(httpPostClientSpy.url).toBe(url)
    expect(httpPostClientSpy.body).toEqual({ id: id })
  })

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.delete({ id: faker.datatype.uuid() })
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.delete({ id: faker.datatype.uuid() })
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an AppointmentModel if HttpGetClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockAppointmentModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const appointment = await sut.delete({ id: faker.datatype.uuid() })
    expect(appointment).toEqual(httpResult)
  })
})
