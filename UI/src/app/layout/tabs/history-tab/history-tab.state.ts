import { State as ParentState } from '../tabs.state';
import { CollectionCardState } from '../../layout.state';
import { Rarity } from '../../../domain.state';

export const HISTORY_TAB_MODULE_FEATURE_NAME: keyof State = 'historyTab';

export interface CardRecord {
  mtgaId: number;
  count: number;
}

export interface HistoryDelta {
  mtgaId: number;
  timeStamp: Date;
}

export interface DeckRequirement {
  deckName: string;
  requiredCount: number;
  ownedCount: number;
  isComplete: boolean;
}

export interface State extends ParentState {
  historyTab: HistoryTabState;
}

export interface HistoryCardState extends CollectionCardState {
  timeStamp: Date;
  timeStampPrettyPrint: string;
  deckRequirements: DeckRequirement[];
}

export interface HistoryTabState {
  existingCardRecords: CardRecord[];
  historyDeltas: HistoryDelta[];
  historyCards: HistoryCardState[];
}

export const initialHistoryTabState: HistoryTabState = {
  existingCardRecords: [],
  historyDeltas: [],
  historyCards: [],
};
