import { State as ParentState } from '../layout.state';
import { HistoryTabState, initialHistoryTabState, HistoryTabDto } from './history-tab/history-tab.state';

export interface State extends ParentState {
  tabs: TabsState;
}

export interface TabsDto {
  historyTab: HistoryTabDto;
}

export interface TabsState {
  historyTab: HistoryTabState;
}

export const initialTabsState: TabsState = {
  historyTab: initialHistoryTabState,
};

export interface NavLink {
  label: string;
  path: string;
}
