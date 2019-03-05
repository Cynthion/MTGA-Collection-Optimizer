import { SettingsDialogState, initialSettingsDialogState } from './settings';

export interface ApiErrorDetailsDto {
  statusCode: number;
  message: string;
  apiErrorCode: number;
}

/// this is the root state for state that is shared among all components
export interface RootState {
  app: AppState;
}

export interface AppState {
  loadingSemaphore: number;
  isLoading: boolean;
  settingsDialog: SettingsDialogState;
}

export const initialAppState: AppState = {
  loadingSemaphore: 0,
  isLoading: false,
  settingsDialog: initialSettingsDialogState,
 };
