import { Action } from '@ngrx/store';

import { MissingCardsPageDto } from './missing-cards.state';

export enum MissingCardsActionTypes {
  Load = '[Missing Cards] Load',
  Initialized = '[Missing Cards] Initialized',
}

export class LoadMissingCardsPageAction implements Action {
  readonly type = MissingCardsActionTypes.Load;
}

export class InitializedMissingCardsPageAction implements Action {
  readonly type = MissingCardsActionTypes.Initialized;

  constructor(
    public dto: MissingCardsPageDto,
  ) { }
}

export type MissingCardsActions =
  | LoadMissingCardsPageAction
  | InitializedMissingCardsPageAction
  ;
