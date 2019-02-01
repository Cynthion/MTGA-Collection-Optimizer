import { Action } from '@ngrx/store';

export enum MissingCardsActionTypes {
  Initialized = '[Missing Cards] Initialized',
}

export class MissingCardsInitializedAction implements Action {
  readonly type = MissingCardsActionTypes.Initialized;
}

export type MissingCardsActions =
  | MissingCardsInitializedAction
  ;
