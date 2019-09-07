import { AboutState, initialAboutState } from './about';
import { ApiErrorState, initialApiErrorState } from './api-error';
import { SettingsState, initialSettingsState } from './settings';

// this is the root state for state that is shared among all components
export interface RootState {
  app: AppState;
}

export interface AppState {
  loadingSemaphore: number;
  isLoading: boolean;
  about: AboutState;
  apiError: ApiErrorState;
  settings: SettingsState;
}

export const initialAppState: AppState = {
  loadingSemaphore: 0,
  isLoading: false,
  about: initialAboutState,
  apiError: initialApiErrorState,
  settings: initialSettingsState,
 };
