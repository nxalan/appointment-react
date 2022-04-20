import { SaveLocalStorage } from '@/domain/usecases/save-local-storage'

export class SaveLocalStorageMock implements SaveLocalStorage {
  id: string

  async save (id: string): Promise<void> {
    this.id = id
  }
}
