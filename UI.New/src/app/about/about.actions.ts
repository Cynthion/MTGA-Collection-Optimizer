import { Action } from '@ngrx/store';

import { AboutDto } from './about.state';

export enum AboutActionTypes {
  Open = '[About] Open',
  Close = '[About] Close',
}

export class OpenAboutDialogAction implements Action {
  readonly type = AboutActionTypes.Open;
}

export class CloseAboutDialogAction implements Action {
  readonly type = AboutActionTypes.Close;
}

export type AboutActions =
  | OpenAboutDialogAction
  | CloseAboutDialogAction
  ;
