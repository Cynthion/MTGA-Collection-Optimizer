import { WindowService } from './window.service';

export class BrowserWindowService implements WindowService {
  minimizeWindow(): void {
    console.log('Browser: Window minimized.');
  }
  maximizeWindow(): void {
    console.log('Browser: Window maximized.');
  }
  closeWindow(): void {
    console.log('Browser: Window closed.');
  }
}
