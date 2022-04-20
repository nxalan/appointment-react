import { SetStorage } from '@/data/protocols/cache/set-storage'
import { UnexpectedError } from '@/domain/errors'
import { SaveLocalStorage } from '@/domain/usecases/save-local-storage'

export class LocalSaveLocalStorage implements SaveLocalStorage {
  constructor (private readonly setStorage: SetStorage) {}

  async save (id: string): Promise<void> {
    if (!id) {
      throw new UnexpectedError()
    }
    await this.setStorage.set('id', id)
  }
}
