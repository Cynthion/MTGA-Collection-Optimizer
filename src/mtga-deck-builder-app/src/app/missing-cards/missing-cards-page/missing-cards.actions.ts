import { Action } from '@ngrx/store';

import { MissingCardsPageDto } from './missing-cards.state';

export enum MissingCardsActionTypes {
  Load = '[Missing Cards] Load',
  Initialized = '[Missing Cards] Initialized',
  LoadError = '[Missing Cards] Load Error',
}

export class LoadMissingCardsPageAction implements Action {
  readonly type = MissingCardsActionTypes.Initialized;
}

export class InitializedMissingCardsPageAction implements Action {
  readonly type = MissingCardsActionTypes.Initialized;

  constructor(
    public dto: MissingCardsPageDto,
  ) { }
}

export class LoadMissingCardsPageErrorAction implements Action {
  readonly type = MissingCardsActionTypes.LoadError;
}

export type MissingCardsActions =
  | LoadMissingCardsPageAction
  | InitializedMissingCardsPageAction
  | LoadMissingCardsPageErrorAction
  ;
