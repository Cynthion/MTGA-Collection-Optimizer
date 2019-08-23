import { State as ParentState } from '../layout.state';

export const TABS_FEATURE_NAME: keyof State = 'tabs';

export interface State extends ParentState {
  tabs: TabsState;
}

export interface TabsState {

}

export const initialTabsState: TabsState = {

};

export interface NavLink {
  label: string;
  path: string;
}
