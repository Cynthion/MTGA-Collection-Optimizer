import { Action } from '@ngrx/store';
import { LayoutDto } from './layout.state';

export enum LayoutActionTypes {
  LoadData = '[Layout] Load Data',
  Initialize = '[Layout] Initialize',
}

export class LoadDataAction implements Action {
  readonly type = LayoutActionTypes.LoadData;
}

export class InitializeLayoutAction implements Action {
  readonly type = LayoutActionTypes.Initialize;

  constructor (
    public dto: LayoutDto
  ) { }
}

export type LayoutActions =
  | LoadDataAction
  | InitializeLayoutAction
  ;
