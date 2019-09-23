import { State as ParentState } from '../tabs.state';
import { CollectionCardDto, CollectionCardState } from '../../layout.state';

export const HISTORY_TAB_MODULE_FEATURE_NAME: keyof State = 'historyTab';

export interface State extends ParentState {
  historyTab: HistoryTabState;
}

export interface HistoryCardDto {
  timeStamp: string;
  collectionCard: CollectionCardDto;
}

export interface HistoryCardState extends HistoryCardDto {
  collectionCard: CollectionCardState;
}

export interface HistoryTabState {
  filterValue: string;
}

export const initialHistoryTabState: HistoryTabState = {
  filterValue: '',
};
