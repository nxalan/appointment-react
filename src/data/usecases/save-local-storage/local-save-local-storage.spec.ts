import { SetStorageMock } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import faker from '@faker-js/faker'
import { LocalSaveLocalStorage } from './local-save-local-storage'

type SutTypes = {
  sut: LocalSaveLocalStorage
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveLocalStorage(setStorageMock)
  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveLocalStorage', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut()
    const id = faker.datatype.uuid()
    await sut.save(id)
    expect(setStorageMock.key).toBe('id')
    expect(setStorageMock.value).toBe(id)
  })

  test('Should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut()
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())
    const promise = sut.save(faker.datatype.uuid())
    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should throw if id is falsy', async () => {
    const { sut } = makeSut()
    const promise = sut.save(undefined)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
