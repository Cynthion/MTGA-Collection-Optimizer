import { Injectable } from '@angular/core';

export interface IMtgaCollectionOptimizerBridge {
  minimizeWindow(): void;
  maximizeWindow(): void;
  restoreWindow(): void;
  closeWindow(): void;
}

@Injectable()
export class PreloadBridge implements IMtgaCollectionOptimizerBridge {
  private bridge: any = (window as any).MtgaCollectionOptimizerBridge;

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
}