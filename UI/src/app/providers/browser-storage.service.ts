import { StorageService } from './storage.service';

export class BrowserStorageService implements StorageService {

  save(key: string, data: any) {
    console.log('Browser: Stored data for key', key, data);
  }
}
