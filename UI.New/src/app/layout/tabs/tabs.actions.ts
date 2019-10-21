import { Action } from '@ngrx/store';
import { TabsDto } from './tabs.state';

export enum TabsActionTypes {
  Initialize = '[Tabs] Initialize',
}

export class InitializeTabsAction implements Action {
  readonly type = TabsActionTypes.Initialize;

  constructor (
    public dto: TabsDto,
  ) { }
}

export type TabsActions =
  | InitializeTabsAction
  ;
