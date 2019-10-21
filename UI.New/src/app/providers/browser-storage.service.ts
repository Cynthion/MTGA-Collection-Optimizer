import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BrowserStorageService implements StorageService {

  private memoryStorage: { [key: string]: any } = [];

  store(key: string, data: any) {
    this.memoryStorage[key] = data;
    console.log('Browser: Stored data for key', key, this.memoryStorage[key]);
  }

  load<TResult>(key: string): TResult {
    const data = this.memoryStorage[key] || null;
    console.log('Browser: Loaded data for key', key, data);
    return data;
  }
}
