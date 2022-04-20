import { LocalSaveLocalStorage } from '@/data/usecases/save-local-storage/local-save-local-storage'
import { SaveLocalStorage } from '@/domain/usecases'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'

export const makeLocalSaveLocalStorage = (): SaveLocalStorage => {
  return new LocalSaveLocalStorage(makeLocalStorageAdapter())
}
