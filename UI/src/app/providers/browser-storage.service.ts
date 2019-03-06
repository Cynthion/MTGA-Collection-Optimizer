import { StorageService } from './storage.service';

export class BrowserStorageService implements StorageService {

  private memoryStorage: { [key: string]: any };

  store(key: string, data: any) {
    this.memoryStorage[key] = data;
    console.log('Browser: Stored data for key', key, data);
  }

  load<TResult>(key: string): TResult {
    const data = this.memoryStorage[key];
    console.log('Browser: Loaded data for key', key, data);
    return data;
  }
}
