import { RemoteEditAppointment } from './remote-edit-appointment'
import { HttpPatchClientSpy } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import faker from '@faker-js/faker'
import { HttpStatusCode } from '@/data/protocols/http'
import { EditAppointmentParams } from '@/domain/usecases'
import { AppointmentModel } from '@/domain/models'
import { mockAppointmentModel, mockEditAppointmentParams } from '@/domain/test'

type SutTypes = {
  sut: RemoteEditAppointment
  httpPatchClientSpy: HttpPatchClientSpy<EditAppointmentParams, AppointmentModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPatchClientSpy = new HttpPatchClientSpy<EditAppointmentParams, AppointmentModel>()
  const sut = new RemoteEditAppointment(url, httpPatchClientSpy)
  return {
    sut,
    httpPatchClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPutClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPatchClientSpy } = makeSut(url)
    await sut.edit(mockEditAppointmentParams())
    expect(httpPatchClientSpy.url).toBe(url)
  })

  test('Should call HttpPutClient with correct body', async () => {
    const { sut, httpPatchClientSpy } = makeSut()
    const editAppointmentParams = mockEditAppointmentParams()
    await sut.edit(editAppointmentParams)
    expect(httpPatchClientSpy.body).toEqual(editAppointmentParams)
  })

  test('Should throw UnexpectedError if HttpPutClient returns 400', async () => {
    const { sut, httpPatchClientSpy } = makeSut()
    httpPatchClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.edit(mockEditAppointmentParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPatchClientSpy } = makeSut()
    httpPatchClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.edit(mockEditAppointmentParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPatchClientSpy } = makeSut()
    httpPatchClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.edit(mockEditAppointmentParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an AppointmentModel if HttpPostClient returns 200', async () => {
    const { sut, httpPatchClientSpy } = makeSut()
    const httpResult = mockAppointmentModel()
    httpPatchClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const appointment = await sut.edit(mockEditAppointmentParams())
    expect(appointment).toEqual(httpResult)
  })
})
