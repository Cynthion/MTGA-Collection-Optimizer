import { Action } from '@ngrx/store';

import { ApiErrorState } from './api-error.state';

export enum ApiErrorActionTypes {
  Show = '[Api Error] Show',
}

export class ShowApiErrorAction implements Action {
  readonly type = ApiErrorActionTypes.Show;

  constructor(
    public apiErrorState: ApiErrorState,
  ) { }
}

export type ApiErrorActions =
  | ShowApiErrorAction
  ;
