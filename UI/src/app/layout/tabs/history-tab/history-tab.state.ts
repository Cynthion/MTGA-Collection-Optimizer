import { State as ParentState } from '../tabs.state';
import { CollectionCardDto, CollectionCardState } from '../../layout.state';

export const HISTORY_TAB_MODULE_FEATURE_NAME: keyof State = 'historyTab';

// TODO fix this, as it's not working anymore
export interface State extends ParentState {
  historyTab: HistoryTabState;
}

export interface HistoryCardDto {
  collectionCard: CollectionCardDto;
  timeStamp: number;
}

export interface HistoryCardState extends HistoryCardDto {
  collectionCard: CollectionCardState;
  timeAgo: string;
}

export interface HistoryTabDto {
  historyCards: HistoryCardDto[];
  newBadgeCount: number;
}

export interface HistoryTabState extends HistoryTabDto {
  historyCards: HistoryCardState[];
  filterValue: string;
  isBadgeVisible: boolean;
  badgeCount: number;
}

export const initialHistoryTabState: HistoryTabState = {
  historyCards: [],
  filterValue: '',
  isBadgeVisible: true,
  badgeCount: 0,
  newBadgeCount: 0,
};

export const initialHistoryCardState: HistoryCardState = {
  collectionCard: undefined,
  timeStamp: 0,
  timeAgo: '',
};

