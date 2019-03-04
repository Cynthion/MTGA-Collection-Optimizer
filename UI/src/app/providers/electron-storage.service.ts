import { PreloadBridge } from './preload.bridge';
import { StorageService } from './storage.service';

export class ElectronStorageService implements StorageService {

  constructor(private preloadBridge: PreloadBridge) { }

  store(key: string, data: any) {
    this.preloadBridge.storeSetting(key, data);
    console.log('Electron: Stored data for key', key, data);
  }

  load<TResult>(key: string): TResult {
    const data = this.preloadBridge.loadSetting(key) as TResult;
    console.log('Electron: Loaded data for key', key, data);
    return data;
  }
}
