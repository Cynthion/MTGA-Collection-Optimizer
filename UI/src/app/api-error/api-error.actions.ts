import { Action } from '@ngrx/store';

import { ApiErrorState } from './api-error.state';

export enum AppActionTypes {
  Show = '[Api Error] Show',
}

export class ShowApiErrorAction implements Action {
  readonly type = AppActionTypes.Show;

  constructor(
    public apiErrorState: ApiErrorState,
  ) { }
}

export type ApiErrorActions =
  | ShowApiErrorAction
  ;
