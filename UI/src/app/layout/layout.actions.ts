import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  LoadData = '[Layout] Load Data',
}

export class LoadDataAction implements Action {
  readonly type = LayoutActionTypes.LoadData;
}

export type LayoutActions =
  | LoadDataAction
  ;
