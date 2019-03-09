import { Action } from '@ngrx/store';

import { SettingsDto } from './settings.state';

export enum SettingsActionTypes {
  Open = '[Settings] Open',
  Close = '[Settings] Close',
  Load = '[Settings] Load',
  Store = '[Settings] Store',
  Initialized = '[Settings] Initialized',
  Apply = '[Settings] Apply',
}

export class OpenSettingsDialogAction implements Action {
  readonly type = SettingsActionTypes.Open;
}

export class CloseSettingsDialogAction implements Action {
  readonly type = SettingsActionTypes.Close;
}

export class LoadSettingsAction implements Action {
  readonly type = SettingsActionTypes.Load;
}

export class StoreSettingsAction implements Action {
  readonly type = SettingsActionTypes.Store;

  constructor(
    public dto: SettingsDto,
  ) { }
}

export class InitializedSettingsAction implements Action {
  readonly type = SettingsActionTypes.Initialized;

  constructor(
    public dto: SettingsDto,
  ) { }
}

export class ApplySettingsAction implements Action {
  readonly type = SettingsActionTypes.Apply;

  constructor(
    public dto: SettingsDto,
  ) { }
}

export type SettingsActions =
  | OpenSettingsDialogAction
  | CloseSettingsDialogAction
  | LoadSettingsAction
  | StoreSettingsAction
  | InitializedSettingsAction
  | ApplySettingsAction
  ;
