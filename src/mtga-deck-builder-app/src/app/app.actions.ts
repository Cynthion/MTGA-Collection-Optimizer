import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

export enum AppActionTypes {
  Initialized = '[App] Initialized',
  ApiError = '[App] API Error'
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

export type AppActions =
  | AppInitializedAction
  | ApiErrorAction
  ;
