import axios from 'axios'
import faker from '@faker-js/faker'

export const mockHttpResponse = (): any => (
  {
    data: faker.random.objectElement({ one: 1, two: 2, three: 3 }),
    status: faker.datatype.number()
  })

export const mockAxiosPost = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue(mockHttpResponse())
  return mockedAxios
}

export const mockAxiosPut = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.put.mockResolvedValue(mockHttpResponse())
  return mockedAxios
}

export const mockAxiosGet = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.get.mockResolvedValue(mockHttpResponse())
  return mockedAxios
}

export const mockAxiosDelete = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.delete.mockResolvedValue(mockHttpResponse())
  return mockedAxios
}
