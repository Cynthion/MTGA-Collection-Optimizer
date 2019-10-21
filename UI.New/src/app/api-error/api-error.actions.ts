import { Action } from '@ngrx/store';

import { ApiErrorState } from './api-error.state';

export enum ApiErrorActionTypes {
  Open = '[Api Error] Open Snachbar',
  Close = '[Api Error] Close Snackbar'
}

export class OpenApiErrorSnackbarAction implements Action {
  readonly type = ApiErrorActionTypes.Open;

  constructor(
    public apiErrorState: ApiErrorState,
  ) { }
}

export class CloseApiErrorSnackbarAction implements Action {
  readonly type = ApiErrorActionTypes.Close;

  constructor(
    public apiErrorCode: number,
  ) { }
}

export type ApiErrorActions =
  | OpenApiErrorSnackbarAction
  | CloseApiErrorSnackbarAction
  ;
