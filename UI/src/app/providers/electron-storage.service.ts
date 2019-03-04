import { PreloadBridge } from './preload.bridge';
import { StorageService } from './storage.service';

export class ElectronStorageService implements StorageService {

  constructor(private preloadBridge: PreloadBridge) { }

  save(key: string, data: any) {
    // TODO write settings to storage
    // storage.set(outputLogPathStorageKey, this.outputLogPath);
    console.log('Electron: Stored data for key', key, data);
  }
}
