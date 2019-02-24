export interface WindowService {
  isWindowMaximized(): boolean;
  minimizeWindow(): void;
  maximizeWindow(): void;
  restoreWindow(): void;
  closeWindow(): void;
}
