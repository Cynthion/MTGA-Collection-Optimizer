import { State as ParentState } from '../tabs.state';
import { CollectionCardState } from '../../layout.state';

export const HISTORY_TAB_MODULE_FEATURE_NAME: keyof State = 'historyTab';

export interface CardRecord {
  id: number;
  count: number;
}

export interface HistoryDelta {
  mtgaId: number;
  timeStamp: string;
}

export interface State extends ParentState {
  historyTab: HistoryTabState;
}

export interface HistoryCardState extends CollectionCardState {
  timeStamp: string;
  requiringDeckNames: string[];
}

export interface HistoryTabState {
  existingPlayerCardIds: number[];
  historyDeltas: HistoryDelta[];
  historyCards: HistoryCardState[];
}

export const initialHistoryTabState: HistoryTabState = {
  existingPlayerCardIds: [],
  historyDeltas: [],
  historyCards: [],
};
