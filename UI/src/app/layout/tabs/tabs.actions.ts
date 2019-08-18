import { Action } from '@ngrx/store';

export enum TabsActionTypes {
  Initialize = '[Tabs] Initialize',
}

export class InitializeTabsAction implements Action {
  readonly type = TabsActionTypes.Initialize;
}

export type TabsActions =
  | InitializeTabsAction
  ;
