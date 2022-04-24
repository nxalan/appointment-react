import { AxiosHttpClient } from './axios-http-client'
import { mockAxiosPost, mockAxiosGet, mockAxiosPatch, mockHttpResponse } from '@/infra/test'
import { mockGetRequest, mockPostRequest, mockPatchRequest } from '@/data/test'
import axios from 'axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxiosPost: jest.Mocked<typeof axios>
  mockedAxiosGet: jest.Mocked<typeof axios>
  mockedAxiosPatch: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxiosPost = mockAxiosPost()
  const mockedAxiosGet = mockAxiosGet()
  const mockedAxiosPatch = mockAxiosPatch()
  return {
    sut,
    mockedAxiosPost,
    mockedAxiosGet,
    mockedAxiosPatch
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
  describe('AxiosPatchClient', () => {
    test('Should call axios with correct values', async () => {
      const request = mockPatchRequest()
      const { sut, mockedAxiosPatch } = makeSut()
      await sut.patch(request)
      expect(mockedAxiosPatch.patch).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return the correct statusCode and body', () => {
      const { sut, mockedAxiosPatch } = makeSut()
      const promise = sut.patch(mockPatchRequest())
      expect(promise).toEqual(mockedAxiosPatch.patch.mock.results[0].value)
    })

    test('Should return the correct statusCode and body on failure', () => {
      const { sut, mockedAxiosPatch } = makeSut()
      mockedAxiosPatch.patch.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const promise = sut.patch(mockPatchRequest())
      expect(promise).toEqual(mockedAxiosPatch.patch.mock.results[0].value)
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
})
