import { SettingsState, initialSettingsState } from './settings';

/// this is the root state for state that is shared among all components
export interface RootState {
  app: AppState;
}

export interface AppState {
  loadingSemaphore: number;
  isLoading: boolean;
  settings: SettingsState;
}

export const initialAppState: AppState = {
  loadingSemaphore: 0,
  isLoading: false,
  settings: initialSettingsState,
 };
