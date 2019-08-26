import { State as ParentState } from '../tabs.state';

export const HISTORY_TAB_MODULE_FEATURE_NAME: keyof State = 'historyTab';

export interface State extends ParentState {
  historyTab: HistoryTabState;
}

export interface HistoryTabState {
}

export const initialHistoryTabState: HistoryTabState = {
};
