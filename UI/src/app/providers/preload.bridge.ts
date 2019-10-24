import { Injectable } from '@angular/core';

export interface IMtgaCollectionOptimizerBridge {
  isWindowMaximized(): boolean;
  minimizeWindow(): void;
  maximizeWindow(): void;
  restoreWindow(): void;
  closeWindow(): void;
  storeSetting(key: string, data: any): void;
  loadSetting(key: string): any;
}

@Injectable()
export class PreloadBridge implements IMtgaCollectionOptimizerBridge {
  // access the object defined in preload.js on window
  private bridge: any = (window as any).MtgaCollectionOptimizerBridge;

  isWindowMaximized() {
    return this.bridge.isWindowMaximized();
  }

  minimizeWindow(): void {
    this.bridge.minimizeWindow();
  }

  maximizeWindow(): void {
    this.bridge.maximizeWindow();
  }

  restoreWindow(): void {
    this.bridge.restoreWindow();
  }

  closeWindow(): void {
    this.bridge.closeWindow();
  }

  storeSetting(key: string, data: any): void {
    this.bridge.storeSetting(key, data);
  }

  loadSetting(key: string): any {
    return this.bridge.loadSetting(key);
  }
}
