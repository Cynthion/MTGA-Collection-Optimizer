import { Action } from '@ngrx/store';

import { SettingsDto } from './settings.state';

export enum SettingsActionTypes {
  Open = '[Settings] Open',
  Close = '[Settings] Close',
  OpenDialog = '[Settings] Open Dialog',
  CloseDialog = '[Settings] Close Dialog',
  LoadBackendSettings = '[Settings] Load Backend Settings',
  StoreBackendSettings = '[Settings] Store Backend Settings',
  LoadUserSettings = '[Settings] Load User Settings',
  StoreUserSettings = '[Settings] Store User Settings',
  Initialize = '[Settings] Initialize',
}

export class OpenSettingsAction implements Action {
  readonly type = SettingsActionTypes.Open;
}

export class CloseSettingsAction implements Action {
  readonly type = SettingsActionTypes.Close;

  constructor(
    public dto: SettingsDto,
  ) { }
}

export class OpenSettingsDialogAction implements Action {
  readonly type = SettingsActionTypes.OpenDialog;
}

export class CloseSettingsDialogAction implements Action {
  readonly type = SettingsActionTypes.CloseDialog;
}

export class LoadBackendSettingsAction implements Action {
  readonly type = SettingsActionTypes.LoadBackendSettings;
}

export class StoreBackendSettingsAction implements Action {
  readonly type = SettingsActionTypes.StoreBackendSettings;

  constructor(
    public dto: SettingsDto,
  ) { }
}

export class LoadUserSettingsAction implements Action {
  readonly type = SettingsActionTypes.LoadUserSettings;

  constructor(
    public backendDto: SettingsDto,
  ) { }
}

export class StoreUserSettingsAction implements Action {
  readonly type = SettingsActionTypes.StoreUserSettings;

  constructor(
    public dto: SettingsDto,
  ) { }
}

export class InitializeSettingsAction implements Action {
  readonly type = SettingsActionTypes.Initialize;

  constructor(
    public dto: SettingsDto,
  ) { }
}

export type SettingsActions =
  | OpenSettingsAction
  | CloseSettingsAction
  | OpenSettingsDialogAction
  | CloseSettingsDialogAction
  | LoadBackendSettingsAction
  | StoreBackendSettingsAction
  | LoadUserSettingsAction
  | StoreUserSettingsAction
  | InitializeSettingsAction
  ;
