import { StorageService } from './storage.service';

export class BrowserStorageService implements StorageService {

  store(key: string, data: any) {
    console.log('Browser: Stored data for key', key, data);
  }

  load<TResult>(key: string): TResult {
    console.log('Browser: Loaded data for key', key);
    return null;
  }
}
