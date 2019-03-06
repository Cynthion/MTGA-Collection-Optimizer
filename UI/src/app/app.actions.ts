import { Action } from '@ngrx/store';

import { ApiErrorDetailsDto } from './api-error';

export enum AppActionTypes {
  Initialized = '[App] Initialized',
  ApiError = '[App] API Error',
  OpenSettings = '[App] Open Settings',
  LoadingIncrement = '[App] Loading Increment',
  LoadingDecrement = '[App] Loading Decrement',
}

export class AppInitializedAction implements Action {
  readonly type = AppActionTypes.Initialized;
}

export class ApiErrorAction implements Action {
  readonly type = AppActionTypes.ApiError;

  constructor(
    public apiErrorDetails: ApiErrorDetailsDto,
  ) { }
}

export class OpenSettingsAction implements Action {
  readonly type = AppActionTypes.OpenSettings;
}

export class IncrementAppLoadingSemaphoreAction implements Action {
  readonly type = AppActionTypes.LoadingIncrement;
}

export class DecrementAppLoadingSemaphoreAction implements Action {
  readonly type = AppActionTypes.LoadingDecrement;
}

export type AppActions =
  | AppInitializedAction
  | ApiErrorAction
  | OpenSettingsAction
  | IncrementAppLoadingSemaphoreAction
  | DecrementAppLoadingSemaphoreAction
  ;
