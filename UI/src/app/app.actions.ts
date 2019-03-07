import { Action } from '@ngrx/store';

export enum AppActionTypes {
  Initialized = '[App] Initialized',
  LoadingIncrement = '[App] Loading Increment',
  LoadingDecrement = '[App] Loading Decrement',
}

export class AppInitializedAction implements Action {
  readonly type = AppActionTypes.Initialized;
}

export class IncrementAppLoadingSemaphoreAction implements Action {
  readonly type = AppActionTypes.LoadingIncrement;
}

export class DecrementAppLoadingSemaphoreAction implements Action {
  readonly type = AppActionTypes.LoadingDecrement;
}

export type AppActions =
  | AppInitializedAction
  | IncrementAppLoadingSemaphoreAction
  | DecrementAppLoadingSemaphoreAction
  ;
