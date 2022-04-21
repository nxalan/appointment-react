import { AxiosHttpClient } from './axios-http-client'
import { mockAxiosPost, mockAxiosGet, mockAxiosPut, mockAxiosDelete, mockHttpResponse } from '@/infra/test'
import { mockDeleteRequest, mockGetRequest, mockPostRequest, mockPutRequest } from '@/data/test'
import axios from 'axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxiosPost: jest.Mocked<typeof axios>
  mockedAxiosGet: jest.Mocked<typeof axios>
  mockedAxiosPut: jest.Mocked<typeof axios>
  mockedAxiosDelete: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxiosPost = mockAxiosPost()
  const mockedAxiosGet = mockAxiosGet()
  const mockedAxiosPut = mockAxiosPut()
  const mockedAxiosDelete = mockAxiosDelete()
  return {
    sut,
    mockedAxiosPost,
    mockedAxiosGet,
    mockedAxiosPut,
    mockedAxiosDelete
  }
}

describe('AxiosHttpClient', () => {
  describe('AxiosPostClient', () => {
    test('Should call axios with correct values', async () => {
      const request = mockPostRequest()
      const { sut, mockedAxiosPost } = makeSut()
      await sut.post(request)
      expect(mockedAxiosPost.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return the correct statusCode and body', () => {
      const { sut, mockedAxiosPost } = makeSut()
      const promise = sut.post(mockPostRequest())
      expect(promise).toEqual(mockedAxiosPost.post.mock.results[0].value)
    })

    test('Should return the correct statusCode and body on failure', () => {
      const { sut, mockedAxiosPost } = makeSut()
      mockedAxiosPost.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const promise = sut.post(mockPostRequest())
      expect(promise).toEqual(mockedAxiosPost.post.mock.results[0].value)
    })
  })
  describe('AxiosPutClient', () => {
    test('Should call axios with correct values', async () => {
      const request = mockPutRequest()
      const { sut, mockedAxiosPut } = makeSut()
      await sut.put(request)
      expect(mockedAxiosPut.put).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return the correct statusCode and body', () => {
      const { sut, mockedAxiosPut } = makeSut()
      const promise = sut.put(mockPutRequest())
      expect(promise).toEqual(mockedAxiosPut.put.mock.results[0].value)
    })

    test('Should return the correct statusCode and body on failure', () => {
      const { sut, mockedAxiosPut } = makeSut()
      mockedAxiosPut.put.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const promise = sut.put(mockPutRequest())
      expect(promise).toEqual(mockedAxiosPut.put.mock.results[0].value)
    })
  })
  describe('AxiosGetClient', () => {
    test('Should call axios with correct values', async () => {
      const request = mockGetRequest()
      const { sut, mockedAxiosGet } = makeSut()
      await sut.get(request)
      expect(mockedAxiosGet.get).toHaveBeenCalledWith(request.url)
    })

    test('Should return the correct statusCode and body', () => {
      const { sut, mockedAxiosGet } = makeSut()
      const promise = sut.get(mockGetRequest())
      expect(promise).toEqual(mockedAxiosGet.get.mock.results[0].value)
    })

    test('Should return the correct statusCode and body on failure', () => {
      const { sut, mockedAxiosGet } = makeSut()
      mockedAxiosGet.get.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const promise = sut.get(mockGetRequest())
      expect(promise).toEqual(mockedAxiosGet.get.mock.results[0].value)
    })
  })
  describe('AxiosDeleteClient', () => {
    test('Should call axios with correct values', async () => {
      const request = mockDeleteRequest()
      const { sut, mockedAxiosDelete } = makeSut()
      await sut.delete(request)
      expect(mockedAxiosDelete.delete).toHaveBeenCalledWith(request.url)
    })

    test('Should return the correct statusCode and body', () => {
      const { sut, mockedAxiosDelete } = makeSut()
      const promise = sut.delete(mockDeleteRequest())
      expect(promise).toEqual(mockedAxiosDelete.delete.mock.results[0].value)
    })

    test('Should return the correct statusCode and body on failure', () => {
      const { sut, mockedAxiosDelete } = makeSut()
      mockedAxiosDelete.delete.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const promise = sut.delete(mockDeleteRequest())
      expect(promise).toEqual(mockedAxiosDelete.delete.mock.results[0].value)
    })
  })
})
