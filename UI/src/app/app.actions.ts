import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

export enum AppActionTypes {
  Initialized = '[App] Initialized',
  ApiError = '[App] API Error',
  LoadingIncrement = '[App] Loading Increment',
  LoadingDecrement = '[App] Loading Decrement',
}

export class AppInitializedAction implements Action {
  readonly type = AppActionTypes.Initialized;
}

export class ApiErrorAction implements Action {
  readonly type = AppActionTypes.ApiError;

  constructor(
    public response: HttpErrorResponse,
  ) { }
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
  | IncrementAppLoadingSemaphoreAction
  | DecrementAppLoadingSemaphoreAction
  ;
