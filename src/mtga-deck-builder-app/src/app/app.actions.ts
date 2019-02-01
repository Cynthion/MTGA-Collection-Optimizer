import { Action } from '@ngrx/store';

export enum AppActionTypes {
  Initialized = '[App] Initialized',
}

export class AppInitializedAction implements Action {
  readonly type = AppActionTypes.Initialized;
}

export type AppActions =
  | AppInitializedAction
  ;
